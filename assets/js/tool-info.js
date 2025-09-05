// 공통 설명 블록 자동 마운트 (모바일 퍼스트)
export async function mountToolInfo(slug, mountSelector = '#tool-info'){
  const url = '/assets/data/tool-info.json';
  let data;
  try{
    const res = await fetch(url, {cache:'no-store'});
    data = await res.json();
  }catch(e){
    console.warn('tool-info.json load failed', e);
    return;
  }
  const info = data[slug];
  if(!info) return;

  const root = document.querySelector(mountSelector);
  if(!root) return;

  root.classList.add('tool-info');
  root.innerHTML = `
    <div class="ti-card">
      <div class="ti-title">📝 이 도구는 무엇인가요?</div>
      <p class="ti-muted">${info.about}</p>
    </div>

    <div class="ti-card">
      <div class="ti-title">🛠️ 사용 방법</div>
      <ol class="ti-list">${info.howto.map(x=>`<li>${x}</li>`).join('')}</ol>
    </div>

    <div class="ti-card ti-acc">
      ${info.faq.map(f=>`
        <div class="ti-acc-item">
          <button class="ti-acc-btn">❓ ${f.q}</button>
          <div class="ti-acc-panel">${f.a}</div>
        </div>
      `).join('')}
    </div>

    <div class="ti-card">
      <div class="ti-title">🔗 더 알아보기</div>
      <div class="ti-links">
        ${info.links.map(l=>`<a class="ti-link" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`).join('')}
      </div>
      <div class="ti-ads">
        <!-- AdSense 배너 자리(승인 후 활성화)
        <ins class="adsbygoogle" style="display:block"
             data-ad-client="ca-pub-XXXXXXXX"
             data-ad-slot="YYYYYYYY"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        -->
      </div>
    </div>
  `;

  // 아코디언
  root.querySelectorAll('.ti-acc-btn').forEach(btn=>{
    btn.addEventListener('click', ()=> btn.parentElement.classList.toggle('open'));
  });
}
