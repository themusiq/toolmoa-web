<script>
/* Toolmoa Auto-Wire : 타이틀/버튼/푸터 정렬 + 버튼 톤앤매너 통일 */
document.addEventListener('DOMContentLoaded', ()=>{
  // ① 상단 브랜드 & 테마 버튼
  if(!document.querySelector('.header')){
    const header = document.createElement('div');
    header.className = 'header container';
    header.innerHTML = `
      <div class="brand"><span class="ico"></span> Toolmoa.kr</div>
      <div class="actions">
        <button class="btn btn-sm btn-soft" data-theme-toggle>다크모드</button>
      </div>`;
    document.body.prepend(header);
  }

  // ② 페이지 타이틀 표준화 (첫번째 h1 또는 [data-tool-title])
  let titleText = document.querySelector('[data-tool-title]')?.textContent
               || document.querySelector('h1')?.textContent
               || document.title.replace('|','·').trim();
  if(titleText){
    const wrap = document.createElement('div');
    wrap.className = 'tool-wrap';
    wrap.innerHTML = `
      <div class="tool-header">
        <div class="tool-title"> ${titleText}</div>
      </div>`;
    document.body.insertBefore(wrap, document.body.children[1] || null);
  }

  // ③ “계산하기/확인/생성/분석” => .btn-primary 로, “공유하기/다시 하기/홈으로” => .btn 로
  const primaryKeywords = ['계산','확인','생성','분석','업로드 분석','닉네임 생성'];
  const ghostKeywords   = ['공유','다시','홈'];

  function styleBtn(el, primary){
    el.classList.add('btn'); 
    if(primary) el.classList.add('btn-primary'); else el.classList.add('btn-ghost');
  }
  document.querySelectorAll('button, a').forEach(el=>{
    const t = (el.textContent||'').trim();
    if(!t) return;
    if(primaryKeywords.some(k=>t.includes(k))) styleBtn(el,true);
    if(ghostKeywords.some(k=>t.includes(k))) styleBtn(el,false);
  });

  // ④ 하단 액션 영역(공유/다시하기/홈으로) 가운데 정렬
  const bottom = document.createElement('div');
  bottom.className = 'tool-actions';
  const actions = [...document.querySelectorAll('a,button')].filter(el=>{
    const t=(el.textContent||'').trim();
    return ['공유','다시','홈'].some(k=>t.includes(k));
  });
  if(actions.length){
    actions.forEach(a=> bottom.appendChild(a));
    document.body.appendChild(bottom);
  }

  // ⑤ 푸터 공통
  if(!document.querySelector('.footer')){
    const f = document.createElement('div');
    f.className='footer';
    f.innerHTML = `© 2025 Toolmoa.kr. All rights reserved.`;
    document.body.appendChild(f);
  }
});
</script>
