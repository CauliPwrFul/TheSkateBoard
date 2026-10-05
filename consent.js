// ── Cookie consent ─────────────────────────────────────────────────────────
// Analytics (Google Analytics, Microsoft Clarity) only load after a visitor
// clicks Accept. Rejecting, or never answering, loads nothing.
// Fill in the IDs below once the accounts exist; until then nothing loads.
const GA_ID = 'G-58JVDY3B9N';
const CLARITY_ID = '';   // e.g. 'abcd1234ef'

const CONSENT_KEY = 'sb_cookie_consent';
let analyticsLoaded = false;

function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY); // 'accepted' | 'rejected' | null
  } catch {
    return null; // storage blocked: treat as no choice, so the banner shows
  }
}

function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // storage blocked: the choice can't be remembered, nothing else to do
  }
}

function loadAnalytics() {
  if (analyticsLoaded) return;
  analyticsLoaded = true;

  if (GA_ID) {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  if (CLARITY_ID) {
    const clarityScript = document.createElement('script');
    clarityScript.textContent =
      '(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};' +
      't=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;' +
      'y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})' +
      '(window,document,"clarity","script",' + JSON.stringify(CLARITY_ID) + ');';
    document.head.appendChild(clarityScript);
  }
}

// ── Banner ─────────────────────────────────────────────────────────────────
let banner = null;

function buildBanner() {
  banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.hidden = true;
  banner.innerHTML =
    '<p class="cookie-banner-text">We use cookies for analytics, to see how the site is used and what to improve. ' +
    'They only run if you accept. <a href="cookies.html">Cookie policy</a></p>' +
    '<div class="cookie-banner-actions">' +
    '<button type="button" class="cookie-btn cookie-btn-reject">Reject</button>' +
    '<button type="button" class="cookie-btn cookie-btn-accept">Accept</button>' +
    '</div>';
  document.body.appendChild(banner);

  banner.querySelector('.cookie-btn-accept').addEventListener('click', () => {
    setConsent('accepted');
    hideBanner();
    loadAnalytics();
  });

  banner.querySelector('.cookie-btn-reject').addEventListener('click', () => {
    const wasAccepted = getConsent() === 'accepted';
    setConsent('rejected');
    hideBanner();
    // Scripts already running on this page can't be unloaded, so reload to stop them.
    if (wasAccepted && analyticsLoaded) location.reload();
  });
}

function showBanner() {
  if (banner) banner.hidden = false;
}

function hideBanner() {
  if (banner) banner.hidden = true;
}

// Called from the "Cookie settings" link in the footer.
function openCookieSettings() {
  showBanner();
}

window.openCookieSettings = openCookieSettings;

buildBanner();
if (getConsent() === null) {
  showBanner();
} else if (getConsent() === 'accepted') {
  loadAnalytics();
}
