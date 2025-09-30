// 짧은 URL 생성 (예시: 옵션값을 쿼리로 encode)
export function makeShortUrl(base, params) {
  const q = Object.entries(params).map(([k,v])=>`${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
  return `${base}?${q}`;
}

// 복사/공유 피드백
export function showToast(msg) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.style.position = 'fixed';
    el.style.bottom = '32px';
    el.style.left = '50%';
    el.style.transform = 'translateX(-50%)';
    el.style.background = '#222632';
    el.style.color = '#fff';
    el.style.padding = '12px 24px';
    el.style.borderRadius = '8px';
    el.style.fontWeight = '700';
    el.style.zIndex = '9999';
    el.style.boxShadow = '0 2px 8px 0 rgba(0,0,0,0.12)';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(()=>{ el.style.display = 'none'; }, 1200);
}

// SNS 공유 (카카오, 트위터, 페북 등은 각 플랫폼 JS SDK 참고)
export function shareToSNS(url, text) {
  if (navigator.share) {
    navigator.share({ title: document.title, text, url });
  } else {
    showToast('공유 링크가 복사되었습니다!');
    navigator.clipboard.writeText(url);
  }
}