import re

MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

# Keyword -> tag, checked against the event's name + description.
# Mirrors the tag vocabulary already styled in styles.css / used in events.json.
TYPE_KEYWORDS = [
    ("disco", "disco"),
    ("derby", "derby"),
    ("workshop", "workshop"),
    ("taster", "taster"),
    ("skill share", "skillshare"),
    ("skillshare", "skillshare"),
    ("lesson", "lesson"),
    ("class", "lesson"),
    ("training", "lesson"),
    ("fundamentals", "lesson"),
    ("learn to", "lesson"),
    ("kids", "family"),
    ("family", "family"),
    ("outdoor", "outdoor"),
    ("park roll", "outdoor"),
    ("indoor", "indoor"),
    ("social", "social"),
    ("drop-in", "social"),
    ("drop in", "social"),
    ("meetup", "social"),
]


def clean_text(text):
    if not text:
        return ""
    return re.sub(r"\s+", " ", text).strip()


# Venues sometimes post a cancellation as its own calendar entry rather than
# removing the slot — e.g. Skate Sanctuary's "No Class this week: Level 1..."
# or "No Roller Dance Focus & Flow This Week". These have real dates/times
# like any other session, so nothing else would catch them — matched here so
# they're skipped at the source instead of proposed as real events.
CANCELLATION_RE = re.compile(r"^no\s+.*\bthis week\b|\bcancell?ed\b", re.I)


def is_cancellation_notice(name):
    return bool(CANCELLATION_RE.search(name or ""))


def infer_types(name, desc=""):
    """Returns (types, matched) — matched is False when nothing in
    TYPE_KEYWORDS hit and we fell back to the "social" default, so callers
    can flag that guess for review rather than presenting it as confident."""
    haystack = f"{name} {desc}".lower()
    types = []
    for keyword, tag in TYPE_KEYWORDS:
        if keyword in haystack and tag not in types:
            types.append(tag)
    matched = bool(types)
    if not types:
        types.append("social")
    return types, matched


def extract_price_from_text(text):
    match = re.search(r"£\s?\d+(?:\.\d{2})?", text or "")
    if not match:
        return None
    return match.group(0).replace(" ", "")


def infer_free(price_text, name="", desc=""):
    haystack = f"{price_text} {name} {desc}".lower()
    if "£0.00" in haystack or re.search(r"\bfree\b", haystack):
        return True
    return False


def pad_day(day):
    return str(int(day)).zfill(2)


def month_abbr(month_number):
    return MONTH_ABBR[month_number - 1]


def next_event_id(existing_events):
    if not existing_events:
        return 1
    return max(e["id"] for e in existing_events) + 1
