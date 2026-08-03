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


def infer_types(name, desc=""):
    haystack = f"{name} {desc}".lower()
    types = []
    for keyword, tag in TYPE_KEYWORDS:
        if keyword in haystack and tag not in types:
            types.append(tag)
    if not types:
        types.append("social")
    return types


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
