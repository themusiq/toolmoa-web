import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const get = (flag, def='') => {
  const idx = args.indexOf(flag);
  return idx>=0 ? (args[idx+1] || def) : def;
};

const slug = get('--slug');
const name = get('--name','새 도구');
const emoji = get('--emoji','🛠️');

if (!slug){ console.error('Usage: npm run create:tool -- --slug=my-tool --name="멋진 툴" --emoji=🛠️'); process.exit(1); }

const dir = path.resolve('tools', slug);
fs.mkdirSync(dir, { recursive: true });

const html = `<!doctype html><html lang="ko"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${name} | 툴모아</title>
<link rel="stylesheet" href="/assets/css/base.css">
<meta property="og:title" content="${name} | 툴모아">
<meta property="og:description" content="${name} 결과를 확인해 보세요.">
<meta property="og:image" content="/api/og?title=${encodeURIComponent(name)}&subtitle=toolmoa&emoji=${encodeURIComponent(emoji)}">
<meta property="og:type" content="website">
</head><body>
<header class="site-header"><div class="brand"><span class="emoji">🧰</span>툴모아.kr</div></header>
<main class="container">
  <section class="hero"><div class="h-title">${emoji} ${name}</div></section>
  <section class="card" id="inputCard">
    <div class="card-sub">입력</div>
    <div class="row">
      <input id="value" class="input" placeholder="값 입력"/>
      <button id="runBtn" class="btn-primary btn-banner" type="button">실행</button>
      <button id="shareBtn" class="btn btn-banner" type="button">공유하기</button>
    </div>
  </section>
  <section class="card hidden" id="resultCard">
    <div class="card-sub">결과</div>
    <div class="result-highlight" id="result"></div>
    <div class="cta-row">
      <button id="resetBtn" class="btn-primary btn-banner" type="button">다시 하기</button>
      <a class="btn-primary btn-banner" href="/">홈으로</a>
    </div>
  </section>
</main>
<script type="module">
  import { scrollTop, scrollToEl } from '/assets/js/toolmoa-common.js';
  const runBtn=document.getElementById('runBtn');
  const shareBtn=document.getElementById('shareBtn');
  const resetBtn=document.getElementById('resetBtn');
  const inputCard=document.getElementById('inputCard');
  const resultCard=document.getElementById('resultCard');
  const resultEl=document.getElementById('result');
  const vEl=document.getElementById('value');
  let last='';
  function run(){
    last = vEl.value.trim();
    if(!last){ vEl.focus(); return; }
    resultEl.textContent = '결과: '+last;
    resultCard.classList.remove('hidden');
    scrollToEl(resultCard);
  }
  function share(){
    const origin = location.origin || (location.protocol + '//' + location.host);
    const url = origin + '/s/${slug}/' + encodeURIComponent(last||'example');
    navigator.share ? navigator.share({title:'${name}',url}) : navigator.clipboard.writeText(url).then(()=>alert('공유 링크를 복사했어요.'));
  }
  runBtn.addEventListener('click', run);
  shareBtn.addEventListener('click', share);
  resetBtn?.addEventListener('click', ()=>{ vEl.value=''; resultEl.textContent=''; resultCard.classList.add('hidden'); scrollTop(); });
</script>
</body></html>`;

fs.writeFileSync(path.join(dir,'index.html'), html);
console.log('Created tool at', dir);