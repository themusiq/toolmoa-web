// /platform-v2/assets/js/auto-wire.js
// 라우터/인젝터를 최소하고, 모든 툴 page.js는 "default function init()"을 내보낸다.

const ROOT = '/platform-v2';

/** 부분 HTML 주입 */
async function inject(sel, url) {
  const host = document.querySelector(sel);
  if (!host) return;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`fetch fail: ${url} ${res.status}`);
  host.innerHTML = await res.text();
}

/** 닉네임 등 개별 툴 로드 */
async function loadTool(slug) {
  // 본문 HTML 먼저 주입
  await inject('#site-body', `${ROOT}/tools/${slug}/index.html`);
  // page.js 모듈을 불러와 init() 실행 (캐시 무력화를 위해 ts 파라미터)
  const mod = await import(`${ROOT}/tools/${slug}/page.js?ts=${Date.now()}`);
  if (typeof mod.default === 'function') {
    mod.default(); // init
  } else {
    console.warn(`${slug}/page.js default export function이 없습니다.`);
  }
}

/** 홈(대시보드) */
async function loadHome() {
  // index.html 자체가 대시보드이므로 별도 주입 없이 그대로 둔다.
}

/** #tool=nickname 형태 해시 파싱 */
function parseHash() {
  const m = location.hash.match(/tool=([a-z0-9\-]+)/i);
  return m ? m[1] : null;
}

/** 라우팅 */
async function route() {
  try {
    const slug = parseHash();
    if (slug) await loadTool(slug);
    else await loadHome();
  } catch (err) {
    console.error('route error:', err);
    // 간단한 오류 메시지
    const body = document.querySelector('#site-body');
    if (body) body.innerHTML = `<div class="container"><div class="card"><h2>로드 실패</h2><p class="muted">${String(err)}</p></div></div>`;
  }
}

/** 부팅: 헤더/푸터 주입 후 라우팅 */
window.addEventListener('DOMContentLoaded', async () => {
  await inject('#site-head', `${ROOT}/layout/header.html`);
  await inject('#site-foot', `${ROOT}/layout/footer.html`);
  route();
});
window.addEventListener('hashchange', route);
