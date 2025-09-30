// /platform-v2/tools/nickname/page.js
// 규칙: default export 함수가 init 동작을 수행한다.

import { generate } from './logic.js';

export default function init() {
  const langSel   = document.querySelector('#lang');
  const countSel  = document.querySelector('#count');
  const themeSel  = document.querySelector('#theme');
  const seedInput = document.querySelector('#seed');

  const listWrap   = document.querySelector('#list-wrap');
  const resultMeta = document.querySelector('#result-meta');
  const rankingBox = document.querySelector('#ranking');

  const genBtn   = document.querySelector('#gen');
  const regenBtn = document.querySelector('#regen');
  const shareBtn = document.querySelector('#share');

  // 더미 랭킹
  renderRanking(rankingBox, ["합겔드레곤","픽셀완결","draco농부","라이트농부","버서커스튜디오","nova장인","royalworks"]);

  // 최초 진입 시 LocalStorage 인기 닉네임 표시
  renderRanking(rankingBox, getPopularNicknames());

  function runGenerate() {
    const lang  = (langSel.value || 'ko').toLowerCase();
    const cnt   = Math.max(1, Math.min(10, parseInt(countSel.value,10) || 10));
    const theme = (themeSel.value || 'any');
    const seeds = (seedInput.value || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const names = generate({ lang, count: cnt, theme, seeds });
    renderList(listWrap, names);

    // 새로 생성된 닉네임들을 인기 닉네임에 반영
    names.forEach(saveNicknameToLocal);

    // 인기 닉네임 영역 갱신
    renderRanking(rankingBox, getPopularNicknames());

    resultMeta.textContent = `${cnt}개 표시 · 길이/키워드 필터 · 가중 랜덤`;
    document.body.classList.add('has-result');
  }

  genBtn?.addEventListener('click', runGenerate);
  regenBtn?.addEventListener('click', runGenerate);

  shareBtn?.addEventListener('click', () => {
    const url = new URL(location.href);
    url.searchParams.set('lang',  langSel.value);
    url.searchParams.set('count', countSel.value);
    url.searchParams.set('theme', themeSel.value);
    url.searchParams.set('seed',  seedInput.value);

    const payload = {
      title: '닉네임 생성 결과',
      text : '내 닉네임 후보 리스트',
      url  : url.toString()
    };

    if (navigator.share) {
      navigator.share(payload).catch(()=>{});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(payload.url);
      alert('링크를 클립보드에 복사했어요.');
    }
  });

  // URL 쿼리로 들어왔을 때 옵션 복원 & 자동실행
  restoreFromQuery();
  const auto = (new URL(location.href)).searchParams.get('auto');
  if (auto === '1') runGenerate();

  const form = document.querySelector('#nickname-form');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // ← 이 코드가 반드시 필요!
      // 닉네임 생성 로직 호출
    });
  }
}

/* UI 렌더 */
function renderRanking(host, names){
  const prev = JSON.parse(localStorage.getItem('prevRanking') || '[]');
  localStorage.setItem('prevRanking', JSON.stringify(names));
  host.innerHTML = names.map((n, i) => {
    let arrow = '—', arrowClass = 'same', diff = '';
    const prevIdx = prev.indexOf(n);
    if (prevIdx !== -1) {
      if (prevIdx > i) {
        arrow = '▲'; arrowClass = 'up'; diff = `+${prevIdx - i}`;
      } else if (prevIdx < i) {
        arrow = '▼'; arrowClass = 'down'; diff = `-${i - prevIdx}`;
      }
    }
    return `
      <div class="list-card row" style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <div>
          <span class="ranking-num">${i+1}.</span>
          <span class="ranking-nick">${n}</span>
          <span class="ranking-arrow ${arrowClass}">${arrow}</span>
          ${diff ? `<span class="ranking-diff">${diff}</span>` : ''}
        </div>
        <div class="btn-row">
          <button class="btn" data-copy="${n}">복사</button>
        </div>
      </div>
    `;
  }).join('');
  host.querySelectorAll('[data-copy]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      navigator.clipboard?.writeText(btn.dataset.copy);
      btn.textContent = '복사됨'; setTimeout(()=>btn.textContent='복사', 800);
    });
  });
}

// 중간 닉네임 결과의 특이함 지수 랜덤화 예시
function renderList(host, items) {
  host.innerHTML = items.map(nick => {
    const uniqueness = Math.floor(Math.random() * 41) + 60; // 60~100%
    return `
      <div class="list-card row" style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <div>
          <div class="name">${nick}</div>
          <div class="meta uniqueness" style="margin-top:2px;">특이함 지수: ${uniqueness}%</div>
        </div>
        <div class="btn-row" style="display:flex;gap:8px;">
          <button class="btn" data-copy="${nick}">복사</button>
        </div>
      </div>
    `;
  }).join('');
  host.querySelectorAll('[data-copy]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      navigator.clipboard?.writeText(btn.dataset.copy);
      btn.textContent = '복사됨'; setTimeout(()=>btn.textContent='복사', 800);
    });
  });
}

function restoreFromQuery(){
  const q = (new URL(location.href)).searchParams;
  const set = (id, v) => { const el = document.querySelector(`#${id}`); if (el && v != null) el.value = v; };
  set('lang',  q.get('lang'));
  set('count', q.get('count'));
  set('theme', q.get('theme'));
  set('seed',  q.get('seed'));
}

// 닉네임을 LocalStorage에 누적 저장
function saveNicknameToLocal(nickname) {
  const key = 'popularNicknames';
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  data[nickname] = (data[nickname] || 0) + 1;
  localStorage.setItem(key, JSON.stringify(data));
}

// LocalStorage에서 인기 닉네임 상위 7개 반환
function getPopularNicknames(limit = 7) {
  const data = JSON.parse(localStorage.getItem('popularNicknames') || '{}');
  return Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name]) => name);
}

// CSS 스타일 추가
const style = document.createElement('style');
style.textContent = `
  .ranking-card, .list-card .name {
    font-size: 1.08em;
    font-weight: 700;
  }
  .ranking-nick {
    font-size: 1.08em;
    font-weight: 700;
  }
`;
document.head.append(style);
