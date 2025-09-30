
# Toolmoa – 통합 패키지 (대시보드 + 공통 스타일 + 웹툴 + 쿠팡 광고)

- 대시보드: `/index.html`
- 공통 CSS: `/assets/css/base.css`  (다크/라이트 변수 + 버튼/카드/폼/광고 슬롯)
- 테마 토글 스크립트: `/assets/js/theme.js`
- 쿠팡 배너 스크립트: `/assets/js/ads-coupang.js`
- 닉네임 데이터: `/data/nickname_words.json`
- 웹툴:
  - 닉네임 생성기: `/tools/nickname/index.html`
  - 팔자손금 진단기: `/tools/palm-reading/index.html`
  - 만나이 계산기: `/tools/age-calculator/index.html`

## 쿠팡 배너 사용법
모든 페이지에 공통으로 아래 2줄만 넣으면 `.ad-slot` 들이 자동 렌더링됩니다.

```html
<script src="/assets/js/ads-coupang.js"></script>
<script>ToolmoaAds.mount();</script>
```

렌더링할 위치에는 아래처럼 슬롯을 넣으세요. `data-coupang-id`는 본인 배너 ID로 바꾸시면 됩니다.

```html
<div class="ad-slot" data-coupang-id="909422"></div>
```

## 테마 토글
상단 버튼은 `/assets/js/theme.js`가 담당합니다. `localStorage`에 저장되어 대시보드/웹툴 전체에서 유지됩니다.
