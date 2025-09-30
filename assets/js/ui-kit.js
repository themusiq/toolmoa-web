// /platform-v2/assets/js/ui-kit.js
export function shareLink({title, text, url}){
  const href = url || location.href
  if(navigator.share) return navigator.share({title, text, url:href})
  navigator.clipboard?.writeText(href)
  alert("링크를 복사했어요!")
}

export function injectAdsense(slot){
  if(!window.__IS_PROD__) return
  const el = document.createElement("ins")
  el.className = "adsbygoogle"
  el.style.display = "block"
  el.dataset.adClient = "ca-pub-XXXXXXXXXXXXXXX"
  el.dataset.adSlot = slot
  el.dataset.adFormat = "auto"
  el.dataset.fullWidthResponsive = "true"
  document.currentScript?.parentElement?.append(el)
  ;(window.adsbygoogle = window.adsbygoogle || []).push({})
}

export function ctaRow({ blogUrl, toolsUrl="/platform-v2/" }){
  const wrap = document.createElement("div")
  wrap.className = "meta-row"
  wrap.innerHTML = `
    <a class="btn secondary" href="${blogUrl}" target="_blank" rel="noopener">블로그 글 보기</a>
    <a class="btn" href="${toolsUrl}">다른 도구</a>`
  document.currentScript?.parentElement?.append(wrap)
}

export async function ctaFromConfig(slug){
  try{
    const r = await fetch("/platform-v2/config/cta-links.json");
    const cfg = await r.json();
    const base = cfg["default"] || {};
    const me   = cfg[slug] || {};
    const url  = (me.blog || base.blog || "").trim();
    const text = (me.text || base.text || "블로그 글 보기");
    const style= me.buttonStyle || base.buttonStyle || "primary";
    if(!url) return; // 링크가 비어있으면 렌더 안함

    const wrap = document.querySelector("#global-cta");
    if(!wrap) return;
    wrap.innerHTML = `
      <a class="btn ${style}" href="${url}" target="_blank" rel="noopener">🔗 ${text}</a>
      <a class="btn secondary" href="/platform-v2/">다른 도구</a>
    `;
  }catch(e){ /* no-op */ }
}
