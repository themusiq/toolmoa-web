import { dl } from '/assets/js/analytics.js';

// Toolmoa Common
export function scrollTop(){ window.scrollTo({ top: 0, behavior: 'smooth' }); }
export function scrollToEl(el){ el?.scrollIntoView({ behavior:'smooth', block:'start' }); }

// Dashboard recommendation: time-of-day + recent tools (localStorage) + random
export function getRecommendations(allTools){
  const recs = [];
  try{
    const hour = new Date().getHours();
    if (hour < 10){ pushUnique(recs, allTools.find(t=>t.id==='horoscope')); }
    else if (hour >= 20){ pushUnique(recs, allTools.find(t=>t.id==='age-calculator')); }
    const recent = JSON.parse(localStorage.getItem('tm-recent')||'[]');
    recent.forEach(id=> pushUnique(recs, allTools.find(t=>t.id===id)));
    allTools.forEach(t=> pushUnique(recs, t));
  }catch(e){ allTools.forEach(t=> pushUnique(recs, t)); }
  return recs.slice(0, 4);
}
function pushUnique(arr, item){ if(!item) return; if(!arr.find(x=>x.id===item.id)) arr.push(item); }
export function markToolUsed(id){
  try{
    const recent = JSON.parse(localStorage.getItem('tm-recent')||'[]');
    const filtered = recent.filter(x=>x!==id);
    filtered.unshift(id);
    localStorage.setItem('tm-recent', JSON.stringify(filtered.slice(0,6)));
  }catch(e){}
}

// Share util
export async function shareUrl({title, text, url}){
  try{
    if (navigator.share){ await navigator.share({ title, text, url }); }
    else { await navigator.clipboard.writeText(url); alert('공유 링크를 복사했어요.'); }
    dl('share_click', { title, url });
  }catch(e){}
}

// Affiliate helpers (client-side insertion)
export async function loadJson(url){
  const res = await fetch(url); return await res.json();
}

// AB test switch
export function abVariant(ns, weightA=0.5){
  const key = 'ab:'+ns;
  let v = localStorage.getItem(key);
  if (!v){
    v = Math.random() < weightA ? 'A' : 'B';
    localStorage.setItem(key, v);
  }
  dl('ab_variant', { ns, variant: v });
  return v;
}