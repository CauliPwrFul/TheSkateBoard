import argparse
import json
import os
import subprocess
import sys
from datetime import date

sys.path.insert(0, os.path.dirname(__file__))

from lib.dedupe import load_seen, save_seen
from lib.format import next_event_id
from sources import skate_sanctuary, skate_scholarship

REPO_ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
EVENTS_PATH = os.path.join(REPO_ROOT, "events.json")

SOURCES = [skate_sanctuary, skate_scholarship]


def load_existing_events():
    with open(EVENTS_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def already_in_events(candidate, existing_events):
    for e in existing_events:
        if (
            e["name"].strip().lower() == candidate["name"].strip().lower()
            and e["day"] == candidate["day"]
            and e["month"] == candidate["month"]
            and e["year"] == candidate["year"]
        ):
            return True
    return False


def discover():
    """Fetch all sources, drop anything already-seen or already-listed. Pure — no git/gh side effects."""
    existing_events = load_existing_events()
    seen = load_seen()

    new_events = []
    errors = []
    for source in SOURCES:
        try:
            candidates = source.fetch_events()
        except Exception as exc:  # a broken source shouldn't take the whole run down
            errors.append(f"{source.SOURCE_NAME}: {exc}")
            continue

        for candidate in candidates:
            if candidate["source_key"] in seen:
                continue
            if already_in_events(candidate, existing_events):
                seen.add(candidate["source_key"])  # already manually added — never ask again
                continue
            new_events.append(candidate)

    return new_events, seen, existing_events, errors


def build_event_object(candidate, event_id):
    event = {
        "id": event_id,
        "name": candidate["name"],
        "day": candidate["day"],
        "month": candidate["month"],
        "year": candidate["year"],
        "venue": candidate["venue"],
        "location": candidate["location"],
        "price": candidate["price"],
        "types": candidate["types"],
        "desc": candidate["desc"],
        "link": candidate["link"],
        "free": candidate["free"],
        "region": candidate["region"],
    }
    if candidate.get("time"):
        event["time"] = candidate["time"]
    return event


def run(apply_changes):
    new_events, seen, existing_events, errors = discover()

    for err in errors:
        print(f"[warn] source failed: {err}", file=sys.stderr)

    if not new_events:
        print("No new events found.")
        if apply_changes:
            save_seen(seen)
        return

    print(f"Found {len(new_events)} new event(s):\n")
    next_id = next_event_id(existing_events)

    built = []
    for candidate in new_events:
        event_id = next_id
        next_id += 1
        event = build_event_object(candidate, event_id)
        built.append((candidate, event))

        print(f"- [{event_id}] {event['name']} — {event['day']} {event['month']} {event['year']}")
        for note in candidate.get("_confidence_notes", []):
            print(f"    ⚠ {note}")

    if not apply_changes:
        return

    try:
        open_pr_for_batch(built)
    except subprocess.CalledProcessError as exc:
        # Don't mark anything seen if the PR never actually went up — a
        # failed run should be retried in full next time, not silently
        # lose events.
        print(f"✖ could not open the batch PR: {exc}", file=sys.stderr)
        subprocess.run(["git", "checkout", "-f", "main"], cwd=REPO_ROOT)
        return

    for candidate, _ in built:
        seen.add(candidate["source_key"])
    save_seen(seen)


def open_pr_for_batch(built):
    """One PR per run covering every newly discovered event, instead of one
    PR per event. One-per-event meant any batch of 2+ conflicted with each
    other the moment the first merged, since they all branched from the same
    base and appended at the same spot in events.json — this sidesteps that
    entirely by never having more than one open PR touching events.json from
    a single run."""
    today_str = date.today().isoformat()
    branch = f"event/batch-{today_str}"

    subprocess.run(["git", "checkout", "main"], cwd=REPO_ROOT, check=True)
    subprocess.run(["git", "checkout", "-b", branch], cwd=REPO_ROOT, check=True)

    base_events = load_existing_events()
    all_events = base_events + [event for _, event in built]
    with open(EVENTS_PATH, "w", encoding="utf-8") as f:
        json.dump(all_events, f, indent=2, ensure_ascii=False)
        f.write("\n")

    subprocess.run(["git", "add", "events.json"], cwd=REPO_ROOT, check=True)
    subprocess.run(
        ["git", "commit", "-m", f"Add {len(built)} discovered event(s) ({today_str})"],
        cwd=REPO_ROOT,
        check=True,
    )
    # event/* branches are owned by this bot and fully regenerated each run,
    # so overwrite any leftover branch of the same name (e.g. a manual
    # re-run on the same day) instead of failing.
    subprocess.run(["git", "push", "--force", "-u", "origin", branch], cwd=REPO_ROOT, check=True)

    body = _batch_pr_body(built, today_str)

    subprocess.run(
        [
            "gh", "pr", "create",
            "--base", "main",
            "--head", branch,
            "--title", f"New events: {len(built)} discovered ({today_str})",
            "--body", body,
            "--label", "auto-discovered",
        ],
        cwd=REPO_ROOT,
        check=True,
    )

    subprocess.run(["git", "checkout", "main"], cwd=REPO_ROOT, check=True)


# GitHub PR bodies are capped at 65536 characters. A handful of events with
# full JSON easily fits; fall back to a terser summary if a very large batch
# ever would not — the diff on the PR itself always has the exact values.
MAX_BODY_CHARS = 60000


def _batch_pr_body(built, today_str):
    sections = []
    for candidate, event in built:
        notes = candidate.get("_confidence_notes", [])
        notes_block = "\n".join(f"  - {n}" for n in notes) if notes else "  - Nothing flagged — looked clean."
        sections.append(
            f"### {event['name']} — {event['day']} {event['month']} {event['year']}\n"
            f"Source: {candidate['source_url']}\n\n"
            f"```json\n{json.dumps(event, indent=2, ensure_ascii=False)}\n```\n\n"
            f"{notes_block}"
        )

    footer = (
        "\n\n---\n"
        "Merge to publish all of these as-is. Push a fixup commit to this branch first to publish with "
        "edits. Close to reject all of them — none will be proposed again. To reject just some, edit "
        "events.json on this branch to remove those entries before merging."
    )

    full = f"Auto-discovered, {len(built)} event(s) from this run.\n\n" + "\n\n---\n\n".join(sections) + footer
    if len(full) <= MAX_BODY_CHARS:
        return full

    terse_sections = []
    for candidate, event in built:
        notes = candidate.get("_confidence_notes", [])
        notes_block = "\n".join(f"  - {n}" for n in notes) if notes else "  - Nothing flagged — looked clean."
        terse_sections.append(
            f"### {event['name']} — {event['day']} {event['month']} {event['year']}\n"
            f"Source: {candidate['source_url']}\n\n{notes_block}"
        )
    return (
        f"Auto-discovered, {len(built)} event(s) from this run — too many to list in full here, "
        f"see the diff on this PR's **Files changed** tab for the exact values.\n\n"
        + "\n\n---\n\n".join(terse_sections)
        + footer
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Actually create branches/commits/PRs. Without this flag, just prints what it would do.",
    )
    args = parser.parse_args()
    run(apply_changes=args.apply)
