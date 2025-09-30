function calcKoreanAge(birth) {
  const today = new Date();
  const b = new Date(birth);
  return today.getFullYear() - b.getFullYear() + 1;
}
function calcYearAge(birth) {
  const today = new Date();
  const b = new Date(birth);
  return today.getFullYear() - b.getFullYear();
}

function calcAge(birth) {
  const today = new Date();
  const b = new Date(birth);
  let age = today.getFullYear() - b.getFullYear();
  const m = today.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < b.getDate())) {
    age--;
  }
  return age;
}

function getFunFact(age, birth) {
  const facts = [
    { emoji: "🎉", text: "오늘도 멋진 하루 보내세요!" },
    { emoji: "🧁", text: "생일이 얼마 남지 않았어요!" },
    { emoji: "🦁", text: "용맹한 나이, 새로운 도전을 해보세요!" },
    { emoji: "🌱", text: "성장하는 당신을 응원합니다!" },
    { emoji: "💡", text: "나이는 숫자일 뿐, 마음이 진짜 나이!" }
  ];
  const today = new Date();
  const nextBirthday = new Date(today.getFullYear(), new Date(birth).getMonth(), new Date(birth).getDate());
  if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);
  const diff = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
  let msg = `${facts[Math.floor(Math.random() * facts.length)].emoji} `;
  if (diff === 0) {
    msg += "오늘이 생일입니다! 축하합니다!";
  } else {
    msg += `생일까지 ${diff}일 남았습니다.`;
  }
  return msg;
}

function getMilestone(age) {
  const milestones = [
    { age: 8, text: "초등학교 입학" },
    { age: 14, text: "중학교 입학" },
    { age: 16, text: "운전면허 필기 응시 가능" },
    { age: 17, text: "고등학교 입학" },
    { age: 18, text: "운전면허 취득 가능" },
    { age: 19, text: "성년(투표권, 술/담배 구매 가능)" },
    { age: 20, text: "대학교 입학, 성인" },
    { age: 65, text: "노인 연금 수급 가능" }
  ];
  return milestones.filter(m => m.age === age).map(m => m.text).join(', ');
}

// 별자리 계산 함수
function getZodiacSign(birth) {
  const date = new Date(birth);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const zodiacs = [
    { name: "물병자리", desc: "독창적이고 진취적인 성향", from: [1, 20], to: [2, 18] },
    { name: "물고기자리", desc: "감성적이고 상상력이 풍부", from: [2, 19], to: [3, 20] },
    { name: "양자리", desc: "열정적이고 도전적인 성향", from: [3, 21], to: [4, 19] },
    { name: "황소자리", desc: "끈기있고 신뢰받는 성향", from: [4, 20], to: [5, 20] },
    { name: "쌍둥이자리", desc: "호기심 많고 다재다능", from: [5, 21], to: [6, 21] },
    { name: "게자리", desc: "다정하고 배려심 깊음", from: [6, 22], to: [7, 22] },
    { name: "사자자리", desc: "자신감 넘치고 리더십 강함", from: [7, 23], to: [8, 22] },
    { name: "처녀자리", desc: "섬세하고 분석적인 성향", from: [8, 23], to: [9, 23] },
    { name: "천칭자리", desc: "균형감각과 사교성 뛰어남", from: [9, 24], to: [10, 22] },
    { name: "전갈자리", desc: "직관적이고 열정적", from: [10, 23], to: [11, 22] },
    { name: "사수자리", desc: "자유롭고 낙천적", from: [11, 23], to: [12, 24] },
    { name: "염소자리", desc: "성실하고 책임감 강함", from: [12, 25], to: [1, 19] }
  ];
  for (const z of zodiacs) {
    if (
      (month === z.from[0] && day >= z.from[1]) ||
      (month === z.to[0] && day <= z.to[1])
    ) {
      return z;
    }
  }
  // 염소자리(12/25~1/19) 예외 처리
  return zodiacs[zodiacs.length - 1];
}

// 12지 띠 계산 함수
function getChineseZodiac(birth) {
  const animals = [
    { name: "쥐띠", desc: "총명하고 재치 있음" },
    { name: "소띠", desc: "성실하고 근면함" },
    { name: "호랑이띠", desc: "용감하고 자신감 넘침" },
    { name: "토끼띠", desc: "온화하고 친절함" },
    { name: "용띠", desc: "카리스마와 리더십" },
    { name: "뱀띠", desc: "지혜롭고 신중함" },
    { name: "말띠", desc: "활동적이고 자유분방" },
    { name: "양띠", desc: "온순하고 따뜻함" },
    { name: "원숭이띠", desc: "영리하고 유연함" },
    { name: "닭띠", desc: "성실하고 꼼꼼함" },
    { name: "개띠", desc: "정직하고 충직함" },
    { name: "돼지띠", desc: "순수하고 너그러움" }
  ];
  const year = new Date(birth).getFullYear();
  const idx = (year - 4) % 12;
  return animals[idx];
}

// 생일까지 D-DAY 계산 함수
function getDDay(birth) {
  const today = new Date();
  const b = new Date(birth);
  const nextBirthday = new Date(today.getFullYear(), b.getMonth(), b.getDate());
  if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);
  return Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
}

function renderResult(age, birth) {
  const koreanAge = calcKoreanAge(birth);
  const yearAge = calcYearAge(birth);
  const birthDate = new Date(birth);
  const now = new Date();
  const livedDays = Math.floor((now - birthDate) / (1000 * 60 * 60 * 24));
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const birthDay = days[birthDate.getDay()];
  // 별자리, 띠
  const zodiac = getZodiacSign(birth);
  const animal = getChineseZodiac(birth);

  return `
    <div style="font-size:1.2em;font-weight:700;margin-bottom:8px;">
      만나이: <span style="color:#38bdf8;">${age}세</span> /
      한국식 나이: <span style="color:#fbbf24;">${koreanAge}세</span> /
      연나이: <span style="color:#a3e635;">${yearAge}세</span>
    </div>
    <div class="muted" style="margin-bottom:4px;">
      생일까지 ${getDDay(birth)} 남았습니다.<br>
      내가 살아온 날: <b>${livedDays}일</b><br>
      태어난 요일: <b>${birthDay}요일</b>
    </div>
    <div class="muted" style="margin-bottom:4px;">
      <b>별자리:</b> ${zodiac.name} (${zodiac.desc})
      <a href="https://search.naver.com/search.naver?query=${encodeURIComponent(zodiac.name)}" target="_blank" style="color:#a5b4fc;text-decoration:underline;">${zodiac.name} 더 알아보기</a>
    </div>
    <div class="muted">
      <b>띠:</b> ${animal.name} (${animal.desc})
      <a href="https://search.naver.com/search.naver?query=${encodeURIComponent(animal.name)}" target="_blank" style="color:#a5b4fc;text-decoration:underline;">${animal.name} 더 알아보기</a>
    </div>
  `;
}

function loadTool() {
  console.log('loadTool 실행됨');
  // DOMContentLoaded가 아니라, 바로 실행
  const btn = document.getElementById('calc-btn');
  const birthInput = document.getElementById('birth');
  const result = document.getElementById('age-result');
  if (!btn || !birthInput || !result) {
    console.warn('필수 요소가 없음', btn, birthInput, result);
    return;
  }
  btn.addEventListener('click', () => {
    const birth = birthInput.value;
    if (!birth) {
      result.innerHTML = `<div class="muted" style="color:#f87171;">생년월일을 선택해주세요.</div>`;
      return;
    }
    if (new Date(birth) > new Date()) {
      result.innerHTML = `<div class="muted" style="color:#f87171;">미래 날짜는 입력할 수 없습니다.</div>`;
      return;
    }
    if (new Date(birth).getFullYear() < 1900) {
      result.innerHTML = `<div class="muted" style="color:#f87171;">1900년 이후의 날짜만 입력 가능합니다.</div>`;
      return;
    }
    const age = calcAge(birth);
    result.innerHTML = renderResult(age, birth);
  });
  const copyBtn = document.getElementById('copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = result.innerText;
      navigator.clipboard.writeText(text);
      copyBtn.innerText = "복사됨!";
      setTimeout(() => (copyBtn.innerText = "결과 복사"), 1500);
    });
  }
  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const shareUrl = window.location.href;
      const shareText = result.innerText || "만나이 계산기 결과를 확인해보세요!";
      if (navigator.share) {
        navigator.share({
          title: '만나이 계산기',
          text: shareText,
          url: shareUrl
        });
      } else {
        // SNS 링크 예시 (카카오, 네이버, 페이스북 등)
        const kakaoUrl = `https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        const naverUrl = `https://share.naver.com/web/shareView.nhn?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent('만나이 계산기 결과')}`;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        // 원하는 SNS로 window.open
        window.open(facebookUrl, '_blank');
      }
    });
  }
}

export default loadTool;

console.log('page.js loaded');