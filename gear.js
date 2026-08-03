const products = [
  {
    id: 1,
    name: "Ieron LED Light-Up Skate Wheels (4 Pack)",
    category: "Wheels",
    desc: "Genuinely bright in low light, not just a gimmick — a favourite for roller disco nights.",
    image: "https://m.media-amazon.com/images/I/61EW9uiFJ2L._AC_SL1200_.jpg",
    link: "https://amzn.to/4yNPxwc"
  },
  {
    id: 2,
    name: "Xootz Kids Adjustable Roller Skates",
    category: "Boots",
    desc: "Grows with little feet — the one we recommend to parents asking where to start.",
    image: "https://m.media-amazon.com/images/I/71supZYiRCL._AC_SL1500_.jpg",
    link: "https://amzn.to/4pRhfnP"
  },
  {
    id: 3,
    name: "Tongdejing LED Light-Up Wheels (8 Pack + Bearings)",
    category: "Wheels",
    desc: "Full set of eight plus bearings and a wrench — everything you need in one box.",
    image: "https://m.media-amazon.com/images/I/71+zsyRGpOL._AC_SL1500_.jpg",
    link: "https://amzn.to/4g3AU0m"
  },
  {
    id: 4,
    name: "Lrtzizy Skate Toe Guards (2 Pack)",
    category: "Protection",
    desc: "Saves your boots from toe-stop scuffs — cheap insurance for expensive skates.",
    image: "https://m.media-amazon.com/images/I/71epqHI0nzL._AC_SL1500_.jpg",
    link: "https://amzn.to/4ySmwzw"
  },
  {
    id: 5,
    name: "Mr. Pen Skate Tool (2 Pack)",
    category: "Tools",
    desc: "Every skater should own one. Lives in the bag — tightens trucks, swaps wheels.",
    image: "https://m.media-amazon.com/images/I/61VNXZGD6fL._AC_SL1500_.jpg",
    link: "https://amzn.to/4hIdejp"
  },
  {
    id: 6,
    name: "XJD Adjustable Kids Skate Helmet",
    category: "Safety",
    desc: "Well-ventilated and genuinely adjustable as heads grow — comes in plenty of colours.",
    image: "https://m.media-amazon.com/images/I/619Pgk8RbAL._AC_SL1500_.jpg",
    link: "https://amzn.to/3RDMRAH"
  },
  {
    id: 7,
    name: "Rookie Rosa Quad Roller Skates",
    category: "Boots",
    desc: "The black pair I actually learned on — a solid, forgiving starter boot for finding your feet.",
    image: "https://m.media-amazon.com/images/I/81BVPIUyErL._AC_SL1500_.jpg",
    link: "https://amzn.to/4bs0BFi"
  },
  {
    id: 8,
    name: "ROOKIE Artistic Roller Skates",
    category: "Boots",
    desc: "What I upgraded to once I outgrew my starters — my indoor pair until they were stolen.",
    image: "https://m.media-amazon.com/images/I/61Yf-I0sMoL._AC_SL1000_.jpg",
    link: "https://amzn.to/4wC42BD"
  },
  {
    id: 9,
    name: "Rookie Rosa Roller Skates (White)",
    category: "Boots",
    desc: "Still my go-to pair today — reliable enough that I've never felt the need to replace them.",
    image: "https://m.media-amazon.com/images/I/51nuiaPAgvL._AC_SL1000_.jpg",
    link: "https://amzn.to/4w0JyS5"
  },
  {
    id: 10,
    name: "Closca Foldable Helmet",
    category: "Safety",
    desc: "Folds flat enough to actually fit in a bag — no excuse not to wear it.",
    image: "https://m.media-amazon.com/images/I/51uLMaCcszL._AC_SL1400_.jpg",
    link: "https://amzn.to/4yX1zDt"
  },
  {
    id: 11,
    name: "XIZHI Training Cones (50 Pack + Bag)",
    category: "Training",
    desc: "What I set up for footwork and edge drills — genuinely useful once you're past total beginner.",
    image: "https://m.media-amazon.com/images/I/51EwlZmkGoL._AC_SL1000_.jpg",
    link: "https://amzn.to/4bqqm8Z"
  },
  {
    id: 12,
    name: "Anker Soundcore Bluetooth Speaker",
    category: "Extras",
    desc: "Skating's just better with a soundtrack — clips on, loud enough for a driveway session.",
    image: "https://m.media-amazon.com/images/I/61y+b4M0RZL._AC_SL1200_.jpg",
    link: "https://amzn.to/3TCnqA3"
  }
];

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

function renderGear() {
  const grid = document.getElementById('gear-grid');
  grid.innerHTML = '';

  products.forEach((p, i) => {
    const href = safeHref(p.link);
    const imgSrc = safeHref(p.image);
    if (!href || !imgSrc) return; // don't render a card we can't safely link/image

    const card = document.createElement('a');
    card.className = 'gear-card';
    card.href = href;
    card.target = '_blank';
    card.rel = 'nofollow sponsored noopener';
    card.style.animationDelay = `${i * 0.05}s`;
    card.innerHTML = `
      <div class="gear-photo">
        <span class="gear-cat">${escapeHtml(p.category)}</span>
        <img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(p.name)}" loading="lazy">
      </div>
      <div class="gear-body">
        <div class="gear-name">${escapeHtml(p.name)}</div>
        <div class="gear-desc">${escapeHtml(p.desc)}</div>
        <div class="gear-footer">
          <span class="gear-link">Shop on Amazon →</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

renderGear();

// ── Fillout popup ──────────────────────────────────────────────────────────
function openFillout() {
  const btn = document.querySelector('[data-fillout-id="wkoEmzfZQ4us"] button');
  if (btn) {
    btn.click();
  } else {
    window.open('https://forms.fillout.com/t/wkoEmzfZQ4us', '_blank');
  }
}
