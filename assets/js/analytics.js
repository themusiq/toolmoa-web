// Global dataLayer
window.dataLayer = window.dataLayer || [];
export function dl(event, params = {}) {
  try { window.dataLayer.push({ event, ...params, ts: Date.now() }); } catch(e){}
}

// Hook common pageview
export function pageView(page){
  dl('page_view', { page });
}

// Track generic CTA
export function trackCTA(label, meta={}){
  dl('cta_click', { label, ...meta });
}

// Track ad click
export function trackAd(label, meta={}){
  dl('ad_click', { label, ...meta });
}