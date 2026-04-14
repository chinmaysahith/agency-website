// ─────────────────────────────────────────────────────────
// Cookie Consent Manager
// GDPR / ePrivacy / CCPA compliant consent utilities
// ─────────────────────────────────────────────────────────

export interface ConsentPreferences {
  necessary: boolean; // Always true — cannot be disabled
  analytics: boolean;
  marketing: boolean;
  timestamp: string;  // ISO date of when consent was given/updated
}

const CONSENT_KEY = "cookie-consent";

// ── Read / Write ────────────────────────────────────────

export function getConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentPreferences;
  } catch {
    return null;
  }
}

export function setConsent(prefs: Omit<ConsentPreferences, "necessary" | "timestamp">): ConsentPreferences {
  const consent: ConsentPreferences = {
    necessary: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));

  // Trigger script loading based on consent
  if (consent.analytics) loadAnalytics();
  if (consent.marketing) loadMarketing();

  // Dispatch custom event so other parts of the app can react
  window.dispatchEvent(new CustomEvent("consent-updated", { detail: consent }));

  return consent;
}

export function hasConsent(category: keyof ConsentPreferences): boolean {
  const consent = getConsent();
  if (!consent) return false;
  return !!consent[category];
}

export function revokeConsent(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CONSENT_KEY);
  window.dispatchEvent(new CustomEvent("consent-updated", { detail: null }));
}

// ── Consent-Gated Script Loaders ────────────────────────

let analyticsLoaded = false;
let marketingLoaded = false;

/**
 * Loads Google Analytics (gtag.js).
 * Replace 'G-XXXXXXXXXX' with your actual Measurement ID.
 * This function will ONLY execute if analytics consent has been granted.
 */
export function loadAnalytics(): void {
  if (analyticsLoaded) return;
  if (!hasConsent("analytics")) return;

  const GA_ID = "G-XXXXXXXXXX"; // ← Replace with your GA4 Measurement ID

  // Load gtag.js script
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  const inlineScript = document.createElement("script");
  inlineScript.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}', {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });
  `;
  document.head.appendChild(inlineScript);

  analyticsLoaded = true;
}

/**
 * Marketing script loader placeholder.
 * Add Facebook Pixel, LinkedIn Insight Tag, etc. here.
 * This function will ONLY execute if marketing consent has been granted.
 */
export function loadMarketing(): void {
  if (marketingLoaded) return;
  if (!hasConsent("marketing")) return;

  // ── Facebook Pixel example (uncomment and replace ID when ready) ──
  // const FB_PIXEL_ID = "XXXXXXXXXXXXXXXXXX";
  // const script = document.createElement("script");
  // script.textContent = `
  //   !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
  //   n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  //   if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  //   n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
  //   s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(
  //   window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  //   fbq('init', '${FB_PIXEL_ID}');
  //   fbq('track', 'PageView');
  // `;
  // document.head.appendChild(script);

  marketingLoaded = true;
}

/**
 * Call this on app initialization to re-fire loaders
 * if consent was previously given in a prior session.
 */
export function initConsentScripts(): void {
  const consent = getConsent();
  if (!consent) return;
  if (consent.analytics) loadAnalytics();
  if (consent.marketing) loadMarketing();
}
