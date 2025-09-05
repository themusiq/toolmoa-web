export const runtime = 'edge';

export default async function handler(req) {
  const { pathname } = new URL(req.url);
  const dob = decodeURIComponent(pathname.split('/').pop());
  const og = `/api/og?title=%EB%B3%84%EC%9E%90%EB%A6%AC+%EA%B2%B0%EA%B3%BC&subtitle=${encodeURIComponent('생일 '+dob)}&emoji=%F0%9F%94%AE`;
  const html = `<!doctype html><html lang="ko"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>별자리 결과 | 툴모아</title>
<meta property="og:title" content="별자리 결과 | 툴모아">
<meta property="og:description" content="공유된 생일을 바탕으로 별자리와 한줄 운세를 보여드립니다.">
<meta property="og:image" content="${og}">
<meta property="og:type" content="website">
<link rel="canonical" href="/tools/horoscope/?mode=share&dob=${encodeURIComponent(dob)}">
<link rel="stylesheet" href="/assets/css/base.css">
</head><body>
<header class="site-header"><div class="brand"><span class="emoji">🧰</span>툴모아.kr</div></header>
<main class="container">
  <section class="share-hero">
    <div class="h-title">🔮 별자리 결과</div>
    <p class="muted">공유된 생일 <b>${dob}</b>을 바탕으로 별자리 요약을 보여드립니다.</p>
  </section>
  <section class="card">
    <div id="summary" class="result-highlight"></div>
    <div id="fortune" style="margin-top:8px"></div>
    <div class="cta-row">
      <a class="btn-primary btn-banner" href="/tools/horoscope/?mode=share&dob=${encodeURIComponent(dob)}">상세 보기</a>
      <a class="btn-primary btn-banner" href="/">홈으로</a>
    </div>
  </section>
  <div class="footer">© 2025 툴모아 | 간단하지만 강력한 생활 도구</div>
</main>
<script>
  const dob = ${JSON.stringify(''+ '${dob}')};
  const z=[
    {n:'물병자리',s:'01-20',e:'02-18',t:'새 아이디어에 마음이 끌리는 날. 작은 실험을 해보세요.'},
    {n:'물고기자리',s:'02-19',e:'03-20',t:'감수성이 풍부해지는 날. 기록을 남기면 힘이 됩니다.'},
    {n:'양자리',s:'03-21',e:'04-19',t:'주도적으로 움직일수록 기회가 와요.'},
    {n:'황소자리',s:'04-20',e:'05-20',t:'꾸준함이 성과로 이어집니다.'},
    {n:'쌍둥이자리',s:'05-21',e:'06-21',t:'가벼운 대화 속 힌트를 잡아보세요.'},
    {n:'게자리',s:'06-22',e:'07-22',t:'가까운 사람을 챙길수록 운이 따릅니다.'},
    {n:'사자자리',s:'07-23',e:'08-22',t:'자신감을 드러낼수록 주목받는 날.'},
    {n:'처녀자리',s:'08-23',e:'09-23',t:'정리/정돈이 운을 부릅니다.'},
    {n:'천칭자리',s:'09-24',e:'10-22',t:'균형 감각이 강점. 협업에 좋아요.'},
    {n:'전갈자리',s:'10-23',e:'11-22',t:'몰입이 성과를 만듭니다.'},
    {n:'사수자리',s:'11-23',e:'12-24',t:'시야를 넓히면 기회가 보입니다.'},
    {n:'염소자리',s:'12-25',e:'01-19',t:'차분한 실행이 결실을 맺는 날.'}
  ];
  function toMD(d){return d.toISOString().slice(5,10)}
  function inR(md,s,e){return s>e?(md>=s||md<=e):(md>=s&&md<=e)}
  function find(date){const md=toMD(date);return z.find(v=>inR(md,v.s,v.e))||{n:'별자리',t:'편안한 하루 보내세요.'}}
  if(dob){
    const info = find(new Date(dob+'T00:00:00'));
    document.getElementById('summary').innerHTML = '<div class="kicker">오늘의 별자리</div><div class="big-num">'+info.n+'</div><div class="note">한줄 운세 — '+info.t+'</div>';
    document.getElementById('fortune').textContent = '오늘의 한줄 운세 — '+info.t;
  }
</script>
</body></html>`;
  return new Response(html, { headers: { 'content-type': 'text/html; charset=UTF-8' } });
}