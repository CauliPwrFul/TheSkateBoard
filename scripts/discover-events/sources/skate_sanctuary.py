import json
import re
from datetime import datetime, timezone

from lib.http import fetch
from lib.format import clean_text, infer_types, infer_free, pad_day, month_abbr, extract_price_from_text, is_cancellation_notice, canonicalize_venue

SOURCE_URL = "https://www.theskatesanctuary.co.uk/"
SOURCE_NAME = "The Skate Sanctuary"

WARMUP_RE = re.compile(r'<script[^>]*id="wix-warmup-data"[^>]*>(.*?)</script>', re.S)


def _find_event_objects(node, found):
    if isinstance(node, dict):
        if (
            isinstance(node.get("title"), str)
            and isinstance(node.get("slug"), str)
            and isinstance(node.get("scheduling"), dict)
        ):
            found.append(node)
        for value in node.values():
            _find_event_objects(value, found)
    elif isinstance(node, list):
        for value in node:
            _find_event_objects(value, found)


def _postcode_area(location):
    postcode = ((location or {}).get("fullAddress") or {}).get("postalCode") or ""
    return postcode.split(" ")[0] if postcode else ""


def _location_string(location):
    full = (location or {}).get("fullAddress") or {}
    city = full.get("city") or "Leeds"
    area = _postcode_area(location)
    return f"{city}, {area}" if area else city


# The Skate Sanctuary's own Wix event data labels the venue "The Skate
# Sanctuary" by default even for sessions they run at a partner venue
# instead of their own studio (confirmed: the same recurring class moves
# between their own address, LS9, and Ramgarhia Sikh Sports Centre, LS7,
# depending on the week) — the postcode is the reliable signal, the label
# isn't. Doesn't apply to genuinely ad-hoc/outdoor sessions, which already
# get their own specific location name from Wix rather than the generic one.
PARTNER_VENUE_BY_POSTCODE_AREA = {
    "LS7": "Ramgarhia Sikh Sports Centre",
}


def fetch_events():
    html = fetch(SOURCE_URL)
    match = WARMUP_RE.search(html)
    if not match:
        return []

    data = json.loads(match.group(1))
    raw_events = []
    _find_event_objects(data, raw_events)

    # Dedupe within this single fetch (the same object can appear more than
    # once in the warmup tree, e.g. list + lookup-by-id caches).
    by_id = {}
    for event in raw_events:
        by_id[event["id"]] = event

    now = datetime.now(timezone.utc)
    results = []
    for event in by_id.values():
        sched = (event.get("scheduling") or {}).get("config") or {}
        start_raw = sched.get("startDate")
        if not start_raw:
            continue
        try:
            start = datetime.fromisoformat(start_raw.replace("Z", "+00:00"))
        except ValueError:
            continue
        if start < now:
            continue

        name = clean_text(event.get("title"))
        if is_cancellation_notice(name):
            continue

        desc = clean_text(event.get("description"))
        raw_location = event.get("location") or {}
        venue = canonicalize_venue(raw_location.get("name")) or SOURCE_NAME
        postcode_area = _postcode_area(raw_location)
        if venue == SOURCE_NAME and postcode_area in PARTNER_VENUE_BY_POSTCODE_AREA:
            # Every self-label variant ("by RGG", "/ Roller Skate Studio",
            # etc.) canonicalizes to their own name regardless of where a
            # given session actually is — the postcode says this one is
            # really at a partner venue, not their own studio.
            venue = PARTNER_VENUE_BY_POSTCODE_AREA[postcode_area]
        location = _location_string(raw_location)
        time_formatted = event.get("scheduling", {}).get("startTimeFormatted")
        end_time_formatted = event.get("scheduling", {}).get("endTimeFormatted")
        time_str = None
        if time_formatted and end_time_formatted:
            time_str = f"{time_formatted.lower()} – {end_time_formatted.lower()}"

        price_from_desc = extract_price_from_text(desc)
        price = price_from_desc or "See listing for price"
        notes = (
            []
            if price_from_desc
            else ["Price not available from source page — please confirm and edit."]
        )

        types, types_matched = infer_types(name, desc)
        if not types_matched:
            notes.append('No keyword match for a type — defaulted to "social", please check.')

        results.append(
            {
                "source_key": f"sanctuary:{event['id']}",
                "source_url": f"{SOURCE_URL}events/{event['slug']}",
                "name": name,
                "day": pad_day(start.astimezone().day),
                "month": month_abbr(start.astimezone().month),
                "year": str(start.astimezone().year),
                "time": time_str,
                "venue": venue,
                "location": location,
                "price": price,
                "desc": desc,
                "types": types,
                "free": infer_free(price, name, desc),
                "link": f"{SOURCE_URL}events/{event['slug']}",
                "region": "West Yorkshire",
                "_confidence_notes": notes,
            }
        )

    return results
