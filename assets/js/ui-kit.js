/* /assets/js/ui-kit.js */

/* 1) 헤더/푸터 주입 (각 페이지에 동일하게) */
(function mountChrome(){
  const head = document.querySelector('.site-header');
  if(!head){
    const h = document.createElement('header');
    h.className = 'site-header';
    h.innerHTML = `
      <div class="container">
        <div class="brand"><i class="logo"></i> Toolmoa.kr</div>
      </div>`;
    document.body.prepend(h);
  }
  const foot = document.querySelector('.site-footer');
  if(!foot){
    const f = document.createElement('footer');
    f.className = 'site-footer';
    f.innerHTML = `
      <div class="container center">
        <div class="brand"><i class="logo"></i> Toolmoa.kr</div>
        <div style="margin-top:6px;color:var(--muted)">© 2025 Toolmoa.kr. All rights reserved.</div>
      </div>`;
    document.body.appendChild(f);
  }
})();

/* 2) 버튼 자동 표준화 */
(function normalizeButtons(){
  const btnMap = [
    {match:/계산|확인|시작|닉네임 생성|생성/i, cls:'btn btn-primary'},
    {match:/공유|복사/i, cls:'btn btn-outline btn-sm'},
    {match:/다시|초기화/i, cls:'btn'},
    {match:/홈|돌아가기/i, cls:'btn btn-ghost'}
  ];
  document.querySelectorAll('button, .button, input[type=button], input[type=submit]')
    .forEach(el=>{
      const txt = (el.innerText || el.value || '').trim();
      if(!txt) return;
      for(const r of btnMap){
        if(r.match.test(txt)){
          el.className = r.cls;
          return;
        }
      }
      // 아무 규칙도 안 걸리면 기본 btn
      el.classList.add('btn');
    });
})();

/* 3) 대시보드 안내/스폰서 자동 채우기 (있으면 덮어쓰지 않음) */
(function fillDashboardHelp(){
  const help = document.querySelector('[data-help]');
  if(help && help.innerHTML.trim()===''){
    help.innerHTML = `
      <div class="card pad">
        <div class="title" style="font-weight:800;margin-bottom:8px">안내 & 스폰서</div>
        <div class="desc" style="color:var(--muted)">
          새로운 도구가 계속 추가됩니다. 모바일 최적 UI입니다. 페이지 하단의 쿠팡 배너는 운영비에 도움이 됩니다.
          광고 클릭 / 구매에 감사드립니다 🙏
        </div>
      </div>`;
  }
})();

/* 4) 쿠팡 배너 중복 방지 가드 */
window.__toolmoa_coupang_once__ = window.__toolmoa_coupang_once__ || false;
(function guardCoupang(){
  const host = document.getElementById('sponsor-slot') || document.querySelector('[data-sponsor]');
  if(!host) return;
  if(window.__toolmoa_coupang_once__) {
    // 혹시 중복으로 삽입된 배너가 있으면 하나만 남기고 제거
    host.querySelectorAll('.coupang-wrap').forEach((n,i)=>{ if(i>0) n.remove(); });
    return;
  }
  window.__toolmoa_coupang_once__ = true;

  // 배너 래퍼
  const wrap = document.createElement('div');
  wrap.className = 'coupang-wrap';
  wrap.style.marginTop = '18px';
  host.appendChild(wrap);

  // (기존 ads-coupang.js의 append 대상만 wrap으로 변경)
  document.addEventListener('coupang:mount', e=>{
    wrap.appendChild(e.detail.node);
  });
})();
