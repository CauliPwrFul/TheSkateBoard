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
  }
];

function renderGear() {
  const grid = document.getElementById('gear-grid');
  grid.innerHTML = '';

  products.forEach((p, i) => {
    const card = document.createElement('a');
    card.className = 'gear-card';
    card.href = p.link;
    card.target = '_blank';
    card.rel = 'nofollow sponsored noopener';
    card.style.animationDelay = `${i * 0.05}s`;
    card.innerHTML = `
      <div class="gear-photo">
        <span class="gear-cat">${p.category}</span>
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="gear-body">
        <div class="gear-name">${p.name}</div>
        <div class="gear-desc">${p.desc}</div>
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
