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

  const now = new Date();
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  // Collect unique month/year combos from events, dropping any that are
  // entirely in the past (selecting one always shows zero events, since
  // renderEvents() hides past events regardless of the month filter).
  const months = [...new Set(events.map(e => `${e.month} ${e.year}`))]
    .filter(m => {
      const [mo, yr] = m.split(' ');
      return new Date(parseInt(yr), monthMap[mo], 1) >= currentMonthStart;
    })
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
// Event data now includes anything auto-discovered by scraping third-party
// sites, so it's untrusted input — never interpolate it into innerHTML raw.
function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value ?? '';
  return div.innerHTML;
}

function safeHref(url) {
  try {
    const parsed = new URL(url, window.location.href);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? parsed.href : null;
  } catch {
    return null;
  }
}

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

    const tagHtml = e.types.map(t => `<span class="tag tag-${escapeHtml(t)}">${escapeHtml(t)}</span>`).join('')
      + (e.free ? '<span class="tag tag-free">free</span>' : '');

    const href = e.link && e.link !== '#' ? safeHref(e.link) : null;

    const card = document.createElement('div');
    card.className = 'event-card';
    card.style.animationDelay = `${(visible - 1) * 0.05}s`;
    card.innerHTML = `
      <div class="card-top">
        <div class="event-date">
          <span class="date-day">${escapeHtml(e.day)}</span>
          <span class="date-month">${escapeHtml(e.month)} '${escapeHtml(e.year.slice(2))}</span>
        </div>
        <div class="event-tags">${tagHtml}</div>
      </div>
      <div class="event-name">${escapeHtml(e.name)}</div>
      <div class="event-meta">
        <div class="meta-row"><span class="meta-icon">📍</span>${escapeHtml(e.venue)}</div>
        <div class="meta-row"><span class="meta-icon">🗺</span>${escapeHtml(e.location)}</div>
        ${e.time ? `<div class="meta-row"><span class="meta-icon">🕐</span>${escapeHtml(e.time)}</div>` : ''}
      </div>
      <div class="event-desc">${escapeHtml(e.desc)}</div>
      <div class="card-footer">
        <span class="event-price">${escapeHtml(e.price)}</span>
        ${href
          ? `<a href="${escapeHtml(href)}" target="_blank" rel="nofollow noopener" class="event-link">More info →</a>`
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
