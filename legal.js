// ── Fillout popup ──────────────────────────────────────────────────────────
function openFillout() {
  const btn = document.querySelector('[data-fillout-id="wkoEmzfZQ4us"] button');
  if (btn) {
    btn.click();
  } else {
    window.open('https://forms.fillout.com/t/wkoEmzfZQ4us', '_blank');
  }
}

// ── Scroll to top ──────────────────────────────────────────────────────────
const scrollTopBtn = document.getElementById('scroll-top-btn');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 600);
});
