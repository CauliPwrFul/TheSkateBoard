import json
from datetime import date, datetime, timedelta

from lib.http import fetch, post_json
from lib.format import pad_day, month_abbr, infer_types, infer_free

# LS-TEN's own site (ls-ten.org) only shows a static weekly timetable — the
# actual bookings, with real per-date availability, go through Acuity
# Scheduling at app.acuityscheduling.com. Found by following the "BOOK"
# button on https://ls-ten.org/quad-and-roller-skate-night through to its
# Acuity appointment-type ID, then reading the network calls the booking
# widget itself makes. These IDs are specific to LS-TEN's Acuity account and
# would need updating if they ever rebuild their booking setup.
SOURCE_NAME = "LS-TEN"
OWNER = "41bbd018"
TIMEZONE = "Europe/London"
BOOKING_URL = "https://ls-ten.org/quad-and-roller-skate-night"

VENUE = "LS-TEN"
LOCATION = "Leeds, LS10"

# Two distinct, real Friday-night sessions, confirmed live (2026-10-21).
# "class"-style appointments return every upcoming date+time in one POST;
# "month"-style ones need a per-month GET, with the known fixed time filled
# in ourselves since the booking widget only ever offers that one slot.
SESSIONS = [
    {
        "key": "family-quad",
        "booking_style": "class",
        "appointment_type_id": 46233894,
        "name": "Family Quad & Inline Night",
        "desc": (
            "A beginner- and under-13-friendly Friday night quad and inline skating "
            "session at LS-TEN's skatepark, with jams and games. Skate hire available."
        ),
        "price": "£8.00",
        "duration_hours": 1,
    },
    {
        "key": "quad-inline",
        "booking_style": "month",
        "appointment_type_id": 16935328,
        "calendar_id": 4465571,
        "fixed_time": "7:00pm",
        "fixed_end_time": "10:00pm",
        "name": "Quad & Inline Night",
        "desc": (
            "Friday night quad and inline skating drop-in session at LS-TEN's "
            "skatepark, open to all abilities. Skate hire available."
        ),
        "price": "£11.50",
    },
]


def _format_time(dt):
    return dt.strftime("%I:%M%p").lstrip("0").lower()


def _fetch_class_datetimes(session):
    url = "https://app.acuityscheduling.com/api/scheduling/v1/availability/class"
    payload = {
        "owner": OWNER,
        "appointmentTypeIds": [session["appointment_type_id"]],
        "timezone": TIMEZONE,
    }
    data = json.loads(post_json(url, payload))
    datetimes = []
    for day_str, slots in data.items():
        if not slots:
            continue
        datetimes.append(datetime.fromisoformat(slots[0]["time"]))
    return datetimes


def _month_starts(count=3):
    today = date.today()
    for offset in range(count):
        month = today.month + offset
        year = today.year + (month - 1) // 12
        month = (month - 1) % 12 + 1
        yield date(year, month, 1)


def _fetch_month_dates(session):
    dates = []
    for month_start in _month_starts():
        url = (
            "https://app.acuityscheduling.com/api/scheduling/v1/availability/month"
            f"?owner={OWNER}&appointmentTypeId={session['appointment_type_id']}"
            f"&calendarId={session['calendar_id']}&timezone=Europe%2FLondon"
            f"&month={month_start.isoformat()}"
        )
        data = json.loads(fetch(url))
        for day_str, available in data.items():
            if available:
                dates.append(date.fromisoformat(day_str))
    return dates


def fetch_events():
    today = date.today()
    results = []

    for session in SESSIONS:
        if session["booking_style"] == "class":
            entries = [
                (dt.date(), f"{_format_time(dt)} – {_format_time(dt + timedelta(hours=session['duration_hours']))}")
                for dt in _fetch_class_datetimes(session)
            ]
        else:
            fixed_time = f"{session['fixed_time']} – {session['fixed_end_time']}"
            entries = [(event_date, fixed_time) for event_date in _fetch_month_dates(session)]

        for event_date, time_str in entries:
            if event_date < today:
                continue

            types, matched = infer_types(session["name"], session["desc"])
            notes = []
            if not matched:
                notes.append('No keyword match for a type — defaulted to "social", please check.')

            results.append(
                {
                    "source_key": f"ls-ten:{session['key']}:{event_date.isoformat()}",
                    "source_url": BOOKING_URL,
                    "name": session["name"],
                    "day": pad_day(event_date.day),
                    "month": month_abbr(event_date.month),
                    "year": str(event_date.year),
                    "time": time_str,
                    "venue": VENUE,
                    "location": LOCATION,
                    "price": session["price"],
                    "desc": session["desc"],
                    "types": types,
                    "free": infer_free(session["price"], session["name"], session["desc"]),
                    "link": BOOKING_URL,
                    "region": "West Yorkshire",
                    "_confidence_notes": notes,
                }
            )

    return results
