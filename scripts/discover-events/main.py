import argparse
import json
import os
import subprocess
import sys

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

    for candidate in new_events:
        event_id = next_id
        next_id += 1
        event = build_event_object(candidate, event_id)

        print(f"- [{event_id}] {event['name']} — {event['day']} {event['month']} {event['year']}")
        for note in candidate.get("_confidence_notes", []):
            print(f"    ⚠ {note}")

        if apply_changes:
            open_pr_for_event(candidate, event)
            seen.add(candidate["source_key"])

    if apply_changes:
        save_seen(seen)


def open_pr_for_event(candidate, event):
    slug = candidate["source_key"].replace(":", "-").replace(" ", "-").lower()
    branch = f"event/{slug}"

    # Always branch from main's current on-disk state, so each PR's diff is
    # exactly one event — never accumulates with other events proposed in
    # the same run that haven't been merged yet.
    subprocess.run(["git", "checkout", "main"], cwd=REPO_ROOT, check=True)
    subprocess.run(["git", "checkout", "-b", branch], cwd=REPO_ROOT, check=True)

    base_events = load_existing_events()
    with open(EVENTS_PATH, "w", encoding="utf-8") as f:
        json.dump(base_events + [event], f, indent=2, ensure_ascii=False)
        f.write("\n")

    subprocess.run(["git", "add", "events.json"], cwd=REPO_ROOT, check=True)
    subprocess.run(
        ["git", "commit", "-m", f"Add discovered event: {event['name']} ({event['day']} {event['month']} {event['year']})"],
        cwd=REPO_ROOT,
        check=True,
    )
    subprocess.run(["git", "push", "-u", "origin", branch], cwd=REPO_ROOT, check=True)

    notes = candidate.get("_confidence_notes", [])
    notes_block = "\n".join(f"- {n}" for n in notes) if notes else "- Nothing flagged — looked clean."

    body = f"""Auto-discovered from **{candidate['source_url']}**.

## Formatted entry
```json
{json.dumps(event, indent=2, ensure_ascii=False)}
```

## Worth checking before merging
{notes_block}

---
Merge to publish as-is. Push a fixup commit to this branch first to publish with edits. Close to reject — it won't be proposed again.
"""

    subprocess.run(
        [
            "gh", "pr", "create",
            "--base", "main",
            "--head", branch,
            "--title", f"New event: {event['name']} — {event['day']} {event['month']} {event['year']}",
            "--body", body,
            "--label", "auto-discovered",
        ],
        cwd=REPO_ROOT,
        check=True,
    )

    subprocess.run(["git", "checkout", "main"], cwd=REPO_ROOT, check=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Actually create branches/commits/PRs. Without this flag, just prints what it would do.",
    )
    args = parser.parse_args()
    run(apply_changes=args.apply)
