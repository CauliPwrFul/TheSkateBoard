// ── Cookie consent ─────────────────────────────────────────────────────────
// Ad, ad-personalisation and analytics cookies are controlled by Google's own
// consent message (configured in AdSense > Privacy & messaging), which also
// drives Google Analytics automatically via Consent Mode — see the
// gtag('consent', 'default', ...) call plus the AdSense and GA tags in each
// page's <head>. This file no longer builds a banner itself.
//
// Microsoft Clarity isn't a Google product, so it can't see that consent
// signal on its own — gated here instead, using the same decision, via the
// googlefc JS API: https://developers.google.com/funding-choices/fc-api-docs

const CLARITY_ID = 'ysx75memmf';

function loadClarity() {
  const script = document.createElement('script');
  script.textContent =
    '(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};' +
    't=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;' +
    'y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})' +
    '(window,document,"clarity","script",' + JSON.stringify(CLARITY_ID) + ');';
  document.head.appendChild(script);
}

window.googlefc = window.googlefc || {};
window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];

// Fires once the visitor's consent mode status is known — either they
// answered Google's message, or consent mode doesn't apply to them (outside
// the UK/EEA/Switzerland), in which case NOT_APPLICABLE counts as fine to load.
window.googlefc.callbackQueue.push({
  CONSENT_MODE_DATA_READY: function () {
    if (!CLARITY_ID || !window.googlefc.getGoogleConsentModeValues) return;
    const status = window.googlefc.getGoogleConsentModeValues();
    const E = window.googlefc.ConsentModePurposeStatusEnum || {};
    const allowed =
      status.analyticsStoragePurposeConsentStatus === E.GRANTED ||
      status.analyticsStoragePurposeConsentStatus === E.NOT_APPLICABLE;
    if (allowed) loadClarity();
  },
});

// Reveal the footer "Cookie settings" link once Google's API has loaded —
// it starts hidden so it can't be clicked before googlefc actually exists.
window.googlefc.callbackQueue.push({
  CONSENT_API_READY: function () {
    document.querySelectorAll('.cookie-settings-link').forEach(function (el) {
      el.style.display = '';
    });
  },
});
