<script>
(function(){
  const html = document.documentElement;
  const key = 'toolmoa-theme';
  function apply(t){ html.setAttribute('data-theme', t); localStorage.setItem(key,t); }
  function current(){ return localStorage.getItem(key) || 'dark'; }
  apply(current());

  // 페이지 어디서든 [data-theme-toggle] 버튼이 있으면 작동
  function label(t){ return t==='dark' ? '일반모드' : '다크모드'; }
  function wire(){
    document.querySelectorAll('[data-theme-toggle]').forEach(btn=>{
      btn.textContent = label(current());
      btn.addEventListener('click', ()=>{
        const next = (current()==='dark')?'light':'dark';
        apply(next);
        btn.textContent = label(next);
      }, {once:false});
    });
  }
  document.addEventListener('DOMContentLoaded', wire);
})();
</script>
