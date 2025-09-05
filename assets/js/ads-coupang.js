// /assets/js/ads-coupang.js
(function () {
  // 1) 전역 싱글톤 가드
  if (window.__COUPANG_ADS_INIT__) return;
  window.__COUPANG_ADS_INIT__ = true;

  const SLOT_ID = 'coupang-slot';
  const SCRIPT_SRC = "https://ads-partners.coupang.com/g.js";
  // 필요시 template/id/trackingCode 조절
  const CAROUSEL_CONFIG = {
    id: 909422,
    template: "carousel",
    trackingCode: "AF3778137",
    width: "100%",
    height: "140",
    tsource: ""
  };

  function inject() {
    const slot = document.getElementById(SLOT_ID);
    if (!slot) return;

    // 2) 슬롯 내부 정리(중복 제거)
    while (slot.firstChild) slot.removeChild(slot.firstChild);

    // 3) 외부 스크립트는 1회만 로드
    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const s = document.createElement('script');
      s.src = SCRIPT_SRC;
      s.async = true;
      s.onload = render;
      document.body.appendChild(s);
    } else {
      render();
    }
  }

  function render() {
    try {
      // 4) coupang 함수가 노출되는 시점에만 호출
      if (typeof PartnersCoupang === 'function' || typeof window.PartnersCoupang === 'function') {
        // eslint-disable-next-line no-new
        new PartnersCoupang.G(CAROUSEL_CONFIG);
      } else {
        setTimeout(render, 150);
      }
    } catch (e) {
      console.error('[Coupang] render error', e);
    }
  }

  // 5) DOM 준비 시 1회 수행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject, { once: true });
  } else {
    inject();
  }
})();
