let events = [];

// ── Load events ───────────────────────────────────────────────────────────
fetch('events.json')
  .then(res => res.json())
  .then(data => {
    events = data;
    document.getElementById('venue-count').textContent = new Set(events.map(e => e.venue)).size;
    initMonthFilter();
    renderEvents();
  });

let currentFilter = 'all';
let currentMonth = null; // null = all months; "Apr 2026" format when set

// ── Month filter ───────────────────────────────────────────────────────────
function initMonthFilter() {
  const select = document.getElementById('month-filter');
  const monthMap = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 };
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // Collect unique month/year combos from events, sorted chronologically
  const months = [...new Set(events.map(e => `${e.month} ${e.year}`))]
    .sort((a, b) => {
      const [ma, ya] = a.split(' ');
      const [mb, yb] = b.split(' ');
      return new Date(parseInt(ya), monthMap[ma]) - new Date(parseInt(yb), monthMap[mb]);
    });

  months.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    select.appendChild(opt);
  });

  // Use hash if present, otherwise default to current month
  const hash = decodeURIComponent(window.location.hash.slice(1));
  const now = new Date();
  const currentKey = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
  const target = months.includes(hash) ? hash : months.includes(currentKey) ? currentKey : null;

  if (target) {
    select.value = target;
    currentMonth = target;
    select.classList.add('active');
  }
}

function setMonth(value) {
  const select = document.getElementById('month-filter');
  currentMonth = value === 'all' ? null : value;
  select.classList.toggle('active', value !== 'all');
  window.location.hash = value === 'all' ? '' : encodeURIComponent(value);
  renderEvents();
}

// Keep filter in sync with browser back/forward navigation
window.addEventListener('hashchange', () => {
  const select = document.getElementById('month-filter');
  const hash = decodeURIComponent(window.location.hash.slice(1));
  const value = hash || 'all';
  select.value = value;
  currentMonth = value === 'all' ? null : value;
  select.classList.toggle('active', value !== 'all');
  renderEvents();
});

// ── Type filter ────────────────────────────────────────────────────────────
function setFilter(type, btn) {
  currentFilter = type;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderEvents();
}

// ── Render ─────────────────────────────────────────────────────────────────
function renderEvents() {
  const grid = document.getElementById('events-grid');
  const noResults = document.getElementById('no-results');
  let visible = 0;
  grid.innerHTML = '';

  // Build today's date at midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthMap = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 };

  // Filter out past events, apply month filter, and sort ascending
  const upcoming = events
    .filter(e => {
      const eventDate = new Date(parseInt(e.year), monthMap[e.month], parseInt(e.day));
      if (eventDate < today) return false;
      if (currentMonth && `${e.month} ${e.year}` !== currentMonth) return false;
      return true;
    })
    .sort((a, b) => {
      const da = new Date(parseInt(a.year), monthMap[a.month], parseInt(a.day));
      const db = new Date(parseInt(b.year), monthMap[b.month], parseInt(b.day));
      return da - db;
    });

  // Update the upcoming count stat
  document.getElementById('upcoming-count').textContent = upcoming.length;

  upcoming.forEach((e) => {
    const show = currentFilter === 'all'
      || e.types.includes(currentFilter)
      || (currentFilter === 'free' && e.free);
    if (!show) return;
    visible++;

    const tagHtml = e.types.map(t => `<span class="tag tag-${t}">${t}</span>`).join('')
      + (e.free ? '<span class="tag tag-free">free</span>' : '');

    const card = document.createElement('div');
    card.className = 'event-card';
    card.style.animationDelay = `${(visible - 1) * 0.05}s`;
    card.innerHTML = `
      <div class="card-top">
        <div class="event-date">
          <span class="date-day">${e.day}</span>
          <span class="date-month">${e.month} '${e.year.slice(2)}</span>
        </div>
        <div class="event-tags">${tagHtml}</div>
      </div>
      <div class="event-name">${e.name}</div>
      <div class="event-meta">
        <div class="meta-row"><span class="meta-icon">📍</span>${e.venue}</div>
        <div class="meta-row"><span class="meta-icon">🗺</span>${e.location}</div>
        ${e.time ? `<div class="meta-row"><span class="meta-icon">🕐</span>${e.time}</div>` : ''}
      </div>
      <div class="event-desc">${e.desc}</div>
      <div class="card-footer">
        <span class="event-price">${e.price}</span>
        ${e.link && e.link !== '#'
          ? `<a href="${e.link}" target="_blank" rel="nofollow noopener" class="event-link">More info →</a>`
          : `<span style="color:var(--muted);font-size:0.78rem">Details TBC</span>`}
      </div>
    `;
    grid.appendChild(card);
  });

  noResults.classList.toggle('visible', visible === 0);
}

// ── Fillout popup ──────────────────────────────────────────────────────────
// Trigger the Fillout popup programmatically from any element on the page
function openFillout() {
  const btn = document.querySelector('[data-fillout-id="wkoEmzfZQ4us"] button');
  if (btn) {
    btn.click();
  } else {
    // Fallback: open the form directly in a new tab if the embed hasn't loaded
    window.open('https://forms.fillout.com/t/wkoEmzfZQ4us', '_blank');
  }
}
