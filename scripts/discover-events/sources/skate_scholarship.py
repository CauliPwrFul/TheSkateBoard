import html as html_lib
import re
from datetime import date

from lib.http import fetch
from lib.format import clean_text, infer_types, infer_free, pad_day, month_abbr, is_cancellation_notice

# The Skate Scholarship's own site (theskatescholarship.com/skatewithus) embeds
# its listings as a Ticket Tailor widget, injected client-side — nothing useful
# is in that page's own HTML. Ticket Tailor's own box office page for them
# (slug "theskatescholarship") is plain server-rendered HTML, so we read that
# directly instead.
SOURCE_NAME = "The Skate Scholarship"
BASE = "https://www.tickettailor.com"
LISTING_URL = f"{BASE}/all-tickets/theskatescholarship/"

# Recurring classes ("Multiple dates and times") link to a page listing each
# upcoming occurrence; one-off events link straight to checkout with the date
# already on the listing page.
RECURRING_RE = re.compile(
    r'<a href="(?P<href>/events/theskatescholarship/(?P<id>\d+)/select-date[^"]*)">\s*'
    r'<span class="event_date">\s*Multiple dates and times\s*</span>\s*'
    r'<span notranslate class="event_name">(?P<name>[^<]*)</span>',
    re.S,
)
SINGLE_RE = re.compile(
    r'<a href="(?P<href>/checkout/view-event/id/(?P<id>\d+)/chk/[^"]*)">.*?'
    r'<span notranslate class="event_name">(?P<name>[^<]*)</span>',
    re.S,
)

# On a recurring class's "select-date" page, each occurrence is one of these,
# with the ISO date in the id and the time range nearby.
OCCURRENCE_RE = re.compile(
    r'<div class="occurrence date_select" id="occurrence_(?P<date>\d{4}-\d{2}-\d{2})">\s*'
    r'<a href="(?P<href>[^"]+)">.*?'
    r"<span class='time_portion'>\s*<var>(?P<start>[^<]+)</var>\s*-\s*<var>(?P<end>[^<]+)</var>",
    re.S,
)

# A one-off event's checkout page has the full date and time together, unlike
# the listing page (which omits the year).
SINGLE_DATE_TIME_RE = re.compile(
    r'class="date_and_time[^"]*">'
    r'<span isolate>[A-Za-z]+</span>\s*<var>(?P<day>\d{1,2})</var>\s*'
    r'<span isolate>(?P<month>[A-Za-z]+)</span>\s*<var>(?P<year>\d{4})</var>\s*'
    r'<var>(?P<start>[^<]+)</var>\s*-\s*<var>(?P<end>[^<]+)</var>'
)

H1_RE = re.compile(r"<h1[^>]*>([^<]*)</h1>")
VENUE_RE = re.compile(r'class="venue_name">([^<]*)<')

MONTH_LOOKUP = {m.lower(): i + 1 for i, m in enumerate(
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
)}


def _clean(raw):
    return clean_text(html_lib.unescape(raw or ""))


def _venue_and_title(event_html):
    h1 = H1_RE.search(event_html)
    venue = VENUE_RE.search(event_html)
    name = _clean(h1.group(1)) if h1 else None
    venue_name = _clean(venue.group(1)) if venue else SOURCE_NAME
    return name, venue_name


def _build_event(source_key, source_url, name, event_date, start, end, venue_name, link):
    time_str = f"{start.lower()} – {end.lower()}" if start and end else None
    types, matched = infer_types(name)
    notes = ["Price not shown on the listing page — please confirm and edit."]
    if not matched:
        notes.append('No keyword match for a type — defaulted to "social", please check.')
    return {
        "source_key": source_key,
        "source_url": source_url,
        "name": name,
        "day": pad_day(event_date.day),
        "month": month_abbr(event_date.month),
        "year": str(event_date.year),
        "time": time_str,
        "venue": venue_name,
        "location": "Leeds",
        "price": "See listing for price",
        "desc": "",
        "types": types,
        "free": infer_free("", name),
        "link": link,
        "region": "West Yorkshire",
        "_confidence_notes": notes,
    }


def fetch_events():
    listing_html = fetch(LISTING_URL)
    today = date.today()
    results = []

    for m in RECURRING_RE.finditer(listing_html):
        event_id = m.group("id")
        name = _clean(m.group("name"))
        if not name or is_cancellation_notice(name):
            continue

        select_url = BASE + _clean(m.group("href"))
        try:
            event_html = fetch(select_url)
        except Exception:
            continue  # one broken class page shouldn't drop the rest of this source

        _, venue_name = _venue_and_title(event_html)

        for occ in OCCURRENCE_RE.finditer(event_html):
            y, mo, d = occ.group("date").split("-")
            occ_date = date(int(y), int(mo), int(d))
            if occ_date < today:
                continue
            checkout_link = BASE + _clean(occ.group("href"))
            results.append(_build_event(
                source_key=f"scholarship-tt:{event_id}:{occ.group('date')}",
                source_url=select_url,
                name=name,
                event_date=occ_date,
                start=occ.group("start"),
                end=occ.group("end"),
                venue_name=venue_name,
                link=checkout_link,
            ))

    for m in SINGLE_RE.finditer(listing_html):
        event_id = m.group("id")
        checkout_link = BASE + _clean(m.group("href"))
        try:
            event_html = fetch(checkout_link)
        except Exception:
            continue

        name, venue_name = _venue_and_title(event_html)
        if not name or is_cancellation_notice(name):
            continue

        dt_match = SINGLE_DATE_TIME_RE.search(event_html)
        if not dt_match:
            continue  # can't build a usable event without a date — skip, don't half-guess
        month_num = MONTH_LOOKUP.get(dt_match.group("month")[:3].lower())
        if not month_num:
            continue
        event_date = date(int(dt_match.group("year")), month_num, int(dt_match.group("day")))
        if event_date < today:
            continue

        results.append(_build_event(
            source_key=f"scholarship-tt:{event_id}",
            source_url=checkout_link,
            name=name,
            event_date=event_date,
            start=dt_match.group("start"),
            end=dt_match.group("end"),
            venue_name=venue_name,
            link=checkout_link,
        ))

    return results
