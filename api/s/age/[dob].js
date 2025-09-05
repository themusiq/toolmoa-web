export const runtime = 'edge';

export default async function handler(req) {
  const { pathname } = new URL(req.url);
  const dob = decodeURIComponent(pathname.split('/').pop());
  // compute derived title/subtitle for OG
  let subtitle = '만나이 결과';
  // No heavy calculation on edge, keep generic subtitle; client will recalc.
  const og = `/api/og?title=%EB%A7%8C%EB%82%98%EC%9D%B4&subtitle=${encodeURIComponent('생일 '+dob)}&emoji=%F0%9F%8E%82`;
  const shareHtml = `<!doctype html><html lang="ko"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>만나이 결과 | 툴모아</title>
<meta property="og:title" content="만나이 결과 | 툴모아">
<meta property="og:description" content="공유된 생일을 바탕으로 결과를 확인하세요.">
<meta property="og:image" content="${og}">
<meta property="og:type" content="website">
<link rel="canonical" href="/tools/age-calculator/?mode=share&dob=${encodeURIComponent(dob)}">
<link rel="stylesheet" href="/assets/css/base.css">
</head><body>
<header class="site-header"><div class="brand"><span class="emoji">🧰</span>툴모아.kr</div></header>
<main class="container">
  <section class="share-hero">
    <div class="h-title">🎂 만나이 결과</div>
    <p class="muted">공유된 생일 <b>${dob}</b>을 바탕으로 계산된 요약 카드입니다.</p>
  </section>
  <section class="card">
    <div id="summary" class="result-highlight"></div>
    <ul id="detail" class="bullet"></ul>
    <div class="cta-row">
      <a class="btn-primary btn-banner" href="/tools/age-calculator/?mode=share&dob=${encodeURIComponent(dob)}">상세 보기</a>
      <a class="btn-primary btn-banner" href="/">홈으로</a>
    </div>
  </section>
  <div class="footer">© 2025 툴모아 | 간단하지만 강력한 생활 도구</div>
</main>
<script>
  const dob = ${JSON.stringify(''+ '${dob}')};
  function diffDays(a,b){ return Math.round((b-a)/(24*60*60*1000)); }
  if(dob){
    const b = new Date(dob+'T00:00:00'); const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let age = today.getFullYear() - b.getFullYear();
    const bdThisYear = new Date(today.getFullYear(), b.getMonth(), b.getDate());
    if (today < bdThisYear) age--;
    const nextBd = today <= bdThisYear ? bdThisYear : new Date(today.getFullYear()+1, b.getMonth(), b.getDate());
    const dday = diffDays(today, nextBd); const lived = diffDays(b, today);
    document.getElementById('summary').innerHTML = '<div class="kicker">공유된 결과</div><div class="big-num">만 '+age+'세</div><div class="note">다음 생일까지 '+dday+'일 · 살아온 일수 '+lived+'일</div>';
    document.getElementById('detail').innerHTML = '<li>생일: <b>'+dob+'</b></li><li>현재 <b>'+age+'세</b>입니다.</li><li>다음 생일까지 <b>'+dday+'일</b> 남았어요.</li><li>지금까지 살아온 일수는 <b>'+lived+'일</b>입니다.</li>';
  }
</script>
</body></html>`;
  return new Response(shareHtml, { headers: { 'content-type': 'text/html; charset=UTF-8' } });
}