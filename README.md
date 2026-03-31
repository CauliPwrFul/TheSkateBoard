# The Skate Board
**The roller skating notice board for Leeds (and eventually the UK)**
🌐 [theskateboard.co.uk](https://theskateboard.co.uk)

---

## What it is

A community-powered event listing site for rollerskating events in Leeds and West Yorkshire. Roller discos, lessons, outdoor skates, derby bouts — one place to find them all.

Built as a single static HTML file. No framework, no database, no build step. Open the file in a browser and it works.

---

## Tech stack

| Thing | What's used |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Fonts | Bebas Neue, Instrument Serif, DM Sans (Google Fonts) |
| Form submissions | [Fillout](https://fillout.com) (free tier) — form ID: `wkoEmzfZQ4us` |
| Support | [Buy Me a Coffee](https://buymeacoffee.com/theskateboard) |
| Hosting | [Netlify](https://netlify.com) (free tier) |
| Domain | Registered separately, DNS pointed to Netlify |

---

## Deploying

1. Make your changes to `the-skate-board.html`
2. Rename it to `index.html`
3. Drag it onto [app.netlify.com](https://app.netlify.com) — drop it onto your existing site to redeploy
4. Done — live in ~30 seconds

---

## Adding a new event

Find the `const events = [` array in the file and add a new object. Copy this template:

```javascript
{
  id: 9,                        // increment by 1 each time
  name: "Event Name",
  day: "15", month: "Apr", year: "2026",  // day always zero-padded e.g. "04"
  venue: "Venue Name",
  location: "Leeds, LS1",
  price: "£8",                  // or "Free"
  types: ["disco"],             // see types below
  desc: "Two or three sentences about the event.",
  time: "7:00pm – 10:00pm",    // optional — omit this line if no specific time
  link: "https://...",          // or "#" if no link yet
  free: false                   // true if price is Free, otherwise false
},
```

**Available types** (can combine multiple in the array):
`disco` · `lesson` · `outdoor` · `social` · `derby` · `family`

**Past events are hidden automatically** — the site filters out anything before today's date and sorts remaining events by date ascending.

---

## Event submission form

People submit events via the Fillout popup (form ID: `wkoEmzfZQ4us`). Submissions arrive in your Fillout inbox. After reviewing, add approved events manually to the `events` array and redeploy.

**Collect these fields in your form:**
- Event name
- Date (+ end date if multi-day)
- Time (optional)
- Venue name
- Location / postcode
- Event type
- Ticket / booking link
- Price (or free)
- Short description

---

## Customising the design

All colours are CSS variables at the top of the file:

```css
--bg: #0d0d0d;          /* page background */
--accent: #f5e642;      /* yellow — dates, highlights, BOARD logo */
--accent2: #ff6b35;     /* orange — eyebrow text, notice label */
--accent3: #b8f5e6;     /* teal — lesson tags */
--text: #f0ede6;        /* off-white body text */
--muted: #7a7672;       /* grey — secondary text */
--border: #2a2a2a;      /* dark borders and dividers */
```

**Logo size** — adjust these three values together:
```css
.logo-the   { font-size: 0.9rem; }
.logo-skate { font-size: 1.9rem; }
.logo-board { font-size: 1.9rem; }
```

**Notice label** — hidden on mobile (`max-width: 480px`) via media query. Visible on desktop.

---

## Known limitations (MVP)

- Events are hardcoded in the JS array — no CMS or database
- No search, only category filters
- No pagination (fine up to ~100 events)
- Form submissions require manual review and code update to publish
- Poor SEO — JavaScript-rendered, not server-side

## Recommended upgrade path (when ready)

1. **Airtable** as a no-code CMS — add/edit events without touching code
2. **Next.js** — rebuild as a proper app with server-side rendering for SEO
3. **Vercel** — better fit once on Next.js
4. **Eventbrite API** — pull events automatically to supplement community submissions
5. **Enrich event details: recurring events, age restrictions, beginner friendly, organiser contact details. 

---

## Links

- 🌐 Live site: [theskateboard.co.uk](https://theskateboard.co.uk)
- 📋 Submit an event: [forms.fillout.com/t/wkoEmzfZQ4us](https://forms.fillout.com/t/wkoEmzfZQ4us)
- ☕ Support: [buymeacoffee.com/theskateboard](https://buymeacoffee.com/theskateboard)
