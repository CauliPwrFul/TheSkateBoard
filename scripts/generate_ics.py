"""Generates events.ics from events.json — a static iCalendar feed that
calendar apps can subscribe to (webcal://theskateboard.co.uk/events.ics).
Re-run whenever events.json changes; see .github/workflows/regenerate-ics.yml.
"""
import json
import os
import re
from datetime import date, datetime, timedelta, timezone

REPO_ROOT = os.path.join(os.path.dirname(__file__), "..")
EVENTS_PATH = os.path.join(REPO_ROOT, "events.json")
ICS_PATH = os.path.join(REPO_ROOT, "events.ics")

MONTH_MAP = {m: i + 1 for i, m in enumerate(
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
)}

CANCELLED_RE = re.compile(r"^\[cancelled\]", re.I)
CLOCK_RE = re.compile(r"(\d{1,2}):(\d{2})\s*(am|pm)", re.I)


def is_cancelled(event):
    return bool(CANCELLED_RE.match(event.get("name", "").strip()))


def parse_clock(text):
    match = CLOCK_RE.search(text or "")
    if not match:
        return None
    hh = int(match.group(1))
    mm = int(match.group(2))
    period = match.group(3).lower()
    if period == "pm" and hh != 12:
        hh += 12
    if period == "am" and hh == 12:
        hh = 0
    return hh, mm


def parse_time_range(time_str):
    if not time_str:
        return None, None
    parts = re.split(r"[–-]", time_str)
    start = parse_clock(parts[0]) if parts else None
    end = parse_clock(parts[1]) if len(parts) > 1 else None
    return start, end


def uk_is_bst(d):
    """UK clocks go forward on the last Sunday in March, back on the last
    Sunday in October, both at 01:00 UTC. d is a naive date."""
    def last_sunday(year, month):
        # last day of month, then walk back to the most recent Sunday
        next_month = date(year, month, 28) + timedelta(days=7)
        last_day = next_month.replace(day=1) - timedelta(days=1)
        return last_day - timedelta(days=(last_day.weekday() + 1) % 7)

    bst_start = last_sunday(d.year, 3)
    bst_end = last_sunday(d.year, 10)
    return bst_start <= d < bst_end


def event_datetime(event, clock):
    year = int(event["year"])
    month = MONTH_MAP[event["month"]]
    day = int(event["day"])
    d = date(year, month, day)

    if clock is None:
        return d, None  # all-day / date-only

    hh, mm = clock
    offset_hours = 1 if uk_is_bst(d) else 0
    naive = datetime(year, month, day, hh, mm)
    utc_dt = naive - timedelta(hours=offset_hours)
    return d, utc_dt.replace(tzinfo=timezone.utc)


def fold(line):
    """RFC 5545: lines longer than 75 octets must be folded with a leading
    space on the continuation."""
    encoded = line.encode("utf-8")
    if len(encoded) <= 75:
        return line
    out = []
    while len(encoded) > 75:
        # don't split mid-multibyte-character
        cut = 75
        while (encoded[cut] & 0xC0) == 0x80:
            cut -= 1
        out.append(encoded[:cut].decode("utf-8"))
        encoded = encoded[cut:]
    out.append(encoded.decode("utf-8"))
    return "\r\n ".join(out)


def escape_text(text):
    if not text:
        return ""
    return (
        text.replace("\\", "\\\\")
        .replace(";", "\\;")
        .replace(",", "\\,")
        .replace("\n", "\\n")
    )


def build_vevent(event):
    start_date, start_dt = event_datetime(event, parse_time_range(event.get("time"))[0])
    _, end_dt = event_datetime(event, parse_time_range(event.get("time"))[1])

    lines = ["BEGIN:VEVENT"]
    lines.append(f"UID:event-{event['id']}@theskateboard.co.uk")
    lines.append(f"DTSTAMP:{datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')}")

    if start_dt:
        lines.append(f"DTSTART:{start_dt.strftime('%Y%m%dT%H%M%SZ')}")
        if end_dt:
            lines.append(f"DTEND:{end_dt.strftime('%Y%m%dT%H%M%SZ')}")
    else:
        # All-day event when no specific time is known
        lines.append(f"DTSTART;VALUE=DATE:{start_date.strftime('%Y%m%d')}")
        lines.append(f"DTEND;VALUE=DATE:{(start_date + timedelta(days=1)).strftime('%Y%m%d')}")

    lines.append(f"SUMMARY:{escape_text(event['name'])}")
    if event.get("desc"):
        lines.append(f"DESCRIPTION:{escape_text(event['desc'])}")
    location = ", ".join(p for p in [event.get("venue"), event.get("location")] if p)
    if location:
        lines.append(f"LOCATION:{escape_text(location)}")
    if event.get("link") and event["link"] != "#" and event["link"].startswith(("http://", "https://")):
        lines.append(f"URL:{event['link']}")
    lines.append("END:VEVENT")
    return [fold(l) for l in lines]


def main():
    events = json.load(open(EVENTS_PATH, encoding="utf-8"))
    today = date.today()

    upcoming = [
        e for e in events
        if not is_cancelled(e)
        and date(int(e["year"]), MONTH_MAP[e["month"]], int(e["day"])) >= today
    ]

    lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//The Skate Board//Leeds Skating Events//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "X-WR-CALNAME:The Skate Board — Leeds Skating Events",
        "X-WR-CALDESC:Roller discos, lessons, outdoor skates, derby bouts and more in Leeds & West Yorkshire.",
    ]
    for event in upcoming:
        lines.extend(build_vevent(event))
    lines.append("END:VCALENDAR")

    with open(ICS_PATH, "w", encoding="utf-8", newline="\r\n") as f:
        f.write("\n".join(lines) + "\n")

    print(f"Wrote {ICS_PATH}: {len(upcoming)} events")


if __name__ == "__main__":
    main()
