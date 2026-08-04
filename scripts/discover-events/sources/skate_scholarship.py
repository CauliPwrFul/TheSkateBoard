import re
from datetime import date

from lib.http import fetch
from lib.format import clean_text, infer_types, infer_free, pad_day, month_abbr, is_cancellation_notice

SOURCE_URL = "https://www.theskatescholarship.com/shop"
SOURCE_NAME = "The Skate Scholarship"

CARD_ROOT_RE = re.compile(
    r'<div[^>]*data-slug="(?P<slug>[^"]*)"[^>]*aria-label="(?P<aria>[^"]*)"[^>]*data-hook="product-item-root"'
)
LINK_RE = re.compile(r'<a href="(?P<href>https://www\.theskatescholarship\.com/product-page/[^"]*)"')
PRICE_RE = re.compile(r'data-wix-price="(?P<price>[^"]*)"')

# "Starts 16th June 26" / "Starts 20th April" — day, month, optional 2-digit year
DATE_RE = re.compile(
    r"Starts\s+(?P<day>\d{1,2})(?:st|nd|rd|th)?\s+(?P<month>[A-Za-z]+)(?:\s+(?P<year>\d{2,4}))?",
    re.I,
)

MONTH_LOOKUP = {name.lower(): i + 1 for i, name in enumerate(
    ["January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"]
)}


def _parse_card_date(aria_label):
    match = DATE_RE.search(aria_label)
    if not match:
        return None, ["Couldn't find a start date in the listing — please confirm and edit."]

    day = int(match.group("day"))
    month_name = match.group("month").lower()
    month_num = MONTH_LOOKUP.get(month_name)
    if not month_num:
        return None, ["Couldn't parse the month in the listing — please confirm and edit."]

    notes = []
    year_raw = match.group("year")
    if year_raw:
        year = int(year_raw) if len(year_raw) == 4 else 2000 + int(year_raw)
    else:
        # No year on the listing — assume the next upcoming occurrence.
        today = date.today()
        year = today.year
        if (month_num, day) < (today.month, today.day):
            year += 1
        notes.append("Listing had no year — assumed the next upcoming occurrence, please confirm.")

    try:
        parsed = date(year, month_num, day)
    except ValueError:
        return None, ["Listing date didn't parse to a real calendar date — please confirm and edit."]

    return parsed, notes


def fetch_events():
    html = fetch(SOURCE_URL)
    results = []

    for card_match in CARD_ROOT_RE.finditer(html):
        slug = card_match.group("slug")
        aria = card_match.group("aria")

        # aria-label is like "<name> . Starts 16th June 26 gallery" or
        # "<name>. NEW WORKSHOP gallery" — strip the trailing date/badge suffix.
        name = clean_text(
            re.sub(r"\s*\.\s*(?:Starts\s+.+|[A-Z][A-Z \d]+)\s*gallery\s*$", "", aria, flags=re.I)
        ) or clean_text(aria)

        if is_cancellation_notice(name):
            continue

        window = html[card_match.end():card_match.end() + 4000]

        link_match = LINK_RE.search(window)
        link = link_match.group("href") if link_match else f"{SOURCE_URL.rsplit('/', 1)[0]}/product-page/{slug}"

        price_match = PRICE_RE.search(window)
        price = price_match.group("price") if price_match else "See listing for price"

        parsed_date, notes = _parse_card_date(aria)
        if parsed_date is None:
            # Can't build a usable event without a date — skip, don't half-guess.
            continue
        if parsed_date < date.today():
            continue

        types, types_matched = infer_types(name)
        type_notes = notes + [
            "Venue/location defaulted to the org's general Leeds address — the listing page doesn't show the specific venue, please confirm.",
            "No description available from the shop grid — consider adding one.",
        ]
        if not types_matched:
            type_notes.append('No keyword match for a type — defaulted to "social", please check.')

        results.append(
            {
                "source_key": f"scholarship:{slug}",
                "source_url": link,
                "name": name,
                "day": pad_day(parsed_date.day),
                "month": month_abbr(parsed_date.month),
                "year": str(parsed_date.year),
                "time": None,
                "venue": SOURCE_NAME,
                "location": "Leeds",
                "price": price,
                "desc": "",
                "types": types,
                "free": infer_free(price, name),
                "link": link,
                "region": "West Yorkshire",
                "_confidence_notes": type_notes,
            }
        )

    return results
