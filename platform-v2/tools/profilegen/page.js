document.getElementById('profile-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const style = document.getElementById('style').value;
  const length = Math.min(parseInt(document.getElementById('length').value, 10), 800);
  const keyword = document.getElementById('keyword').value.trim();

  function generateProfile(style, length, keyword) {
    // 핵심 키워드 분리 및 1개 이상 필수
    const keywords = keyword.split(',').map(k => k.trim()).filter(k => k);
    if (keywords.length === 0) return '핵심 키워드를 1개 이상 입력해주세요.';

    // 스타일별 패턴
    const stylePatterns = {
      'any': [
        `저는 ${pick(keywords)}에 대한 열정으로 매 순간을 소중히 여기며 성장합니다.`,
        `저는 ${pick(keywords)}에 관심이 많으며, 긍정적인 태도로 새로운 도전을 즐깁니다.`
      ],
      'sensible': [
        `저는 ${pick(keywords)}에 대한 센스와 배려를 중요하게 생각합니다.`,
        `상황에 맞는 유연한 사고와 창의적인 해결책으로 ${pick(keywords)} 분야에서 두각을 나타냅니다.`
      ],
      'serious': [
        `저는 ${pick(keywords)}에 대한 책임감과 성실함을 바탕으로 목표를 향해 나아갑니다.`,
        `진지한 자세와 깊이 있는 사고로 ${pick(keywords)} 분야에서 신뢰를 얻습니다.`
      ],
      'friendly': [
        `저는 ${pick(keywords)}에 대한 친근한 분위기로 주변에 긍정적인 에너지를 전합니다.`,
        `누구와도 쉽게 어울리며, ${pick(keywords)}를 통해 소통을 즐깁니다.`
      ],
      'funny': [
        `저는 ${pick(keywords)}에 대한 유머와 재치로 분위기를 밝게 만듭니다.`,
        `작은 일에도 즐거움을 찾으며, ${pick(keywords)}를 통해 웃음을 나눕니다.`
      ],
      'emotional': [
        `저는 ${pick(keywords)}에 대한 감성적인 시선으로 세상을 바라봅니다.`,
        `마음의 울림을 중요하게 생각하며, ${pick(keywords)}를 통해 깊은 공감을 나눕니다.`
      ],
      'professional': [
        `저는 ${pick(keywords)}에 대한 전문성과 효율성을 중시합니다.`,
        `체계적인 접근과 전략으로 ${pick(keywords)} 분야에서 문제를 해결합니다.`
      ],
      'interview': [
        `저는 ${pick(keywords)}에 대한 목표의식과 자기계발에 힘씁니다.`,
        `협업과 소통을 통해 ${pick(keywords)} 분야에서 더 나은 결과를 만듭니다.`
      ]
    };

    // 마무리 패턴
    const outroPatterns = [
      '앞으로도 꾸준히 발전하는 모습을 보여드리겠습니다.',
      '함께 성장하며 긍정적인 변화를 만들어가고 싶습니다.',
      '저의 경험과 열정이 새로운 기회로 이어지길 기대합니다.',
      '더 나은 내일을 위해 오늘도 최선을 다합니다.'
    ];

    // 랜덤 선택 함수
    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    // 문장 조합
    let result = pick(stylePatterns[style] || stylePatterns['any']) + ' ';
    result += pick(outroPatterns);

    // 문법 자동 교정: 모든 문장 끝이 '습니다.'로 끝나도록
    result = result.replace(/다\./g, '습니다.').replace(/니다\./g, '니다.');
    if (!result.trim().endsWith('습니다.')) {
      result = result.trim().replace(/[.!?]$/, '') + '습니다.';
    }

    // 글자수 제한
    if (result.length > length) result = result.slice(0, length - 3) + '...';

    return result;
  }

  const result = generateProfile(style, length, keyword);

  document.getElementById('result-text').innerHTML = result +
    `<div style="margin-top:10px; font-size:12px; color:#94a3b8;">
      만족스럽지 않다면 <b style="color:#fbbf24;">챗GPT 프롬프트</b>를 활용해보세요.<br>
      <span style="font-size:11px;">
        예시:<br>
        "아래 정보를 참고해서 나만의 자기소개글을 800자 이내로 작성해줘.<br>
        - 상황: 000 (예: 면접, SNS, 자기소개서 등)<br>
        - 페르소나/성격: 000 (예: 긍정적, 도전적, 유머러스 등)<br>
        - 강점/경험: 000 (예: 개발 경험, 협업 능력, 창의적 문제 해결 등)<br>
        - 핵심 키워드: 000 (예: 개발, 여행, 성장, 소통 등)<br>
        - 원하는 분위기/말투: 000 (예: 진지한, 친근한, 해요체 등)<br>
        - 후킹 문장이나 차별화 포인트가 있으면 포함해줘."
      </span>
    </div>`;
  document.getElementById('result-card').style.display = 'block';
});

// 복사/공유 버튼
document.getElementById('copy-btn').onclick = function() {
  navigator.clipboard.writeText(document.getElementById('result-text').textContent);
  alert('복사되었습니다!');
};
document.getElementById('share-btn').onclick = function() {
  const text = document.getElementById('result-text').textContent;
  if (navigator.share) {
    navigator.share({ text });
  } else {
    alert('이 브라우저는 공유 기능을 지원하지 않습니다.');
  }
};

// 다른 스타일로 다시 생성
document.getElementById('regen-btn').onclick = function() {
  const styleOptions = Array.from(document.getElementById('style').options).map(opt => opt.value);
  const currentStyle = document.getElementById('style').value;
  let newStyle;
  do {
    newStyle = styleOptions[Math.floor(Math.random() * styleOptions.length)];
  } while (newStyle === currentStyle);
  document.getElementById('style').value = newStyle;

  // 재생성
  document.getElementById('profile-form').dispatchEvent(new Event('submit'));
};

(function(){
  const FIXED_MAX = 100; // 출력은 100자 이내로 고정

  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  function sanitizeKeywords(raw){
    return (raw||'').split(',').map(s=>s.trim()).filter(Boolean);
  }

  const styleKorean = {
    any: '다양한 분위기',
    sensible: '센스 있는',
    serious: '진지한',
    friendly: '친근한',
    funny: '유머러스한',
    emotional: '감성적인',
    professional: '전문적인',
    interview: '인터뷰용'
  };

  const stylePatterns = {
    any: [
      '다양한 경험으로 빠르게 학습하며 실무에 적용합니다.',
      '문제 상황에서 적절한 판단과 실행으로 결과를 만듭니다.'
    ],
    sensible: [
      '상황에 맞는 센스와 배려로 팀에 긍정적 영향을 줍니다.',
      '작은 부분까지 신경 쓰며 완성도를 높입니다.'
    ],
    serious: [
      '책임감 있게 업무를 수행하며 약속을 지킵니다.',
      '목표 달성을 위해 체계적으로 접근합니다.'
    ],
    friendly: [
      '원활한 소통으로 협업의 시너지를 만듭니다.',
      '팀의 분위기를 북돋우며 협력을 이끌어냅니다.'
    ],
    funny: [
      '유머와 재치로 분위기를 밝게 만들며 긴장을 풀어줍니다.',
      '일상 속 재치로 문제를 부드럽게 풀어냅니다.'
    ],
    emotional: [
      '공감 능력으로 타인의 의견을 존중하며 조율합니다.',
      '감성적 인사이트로 사용자 경험을 생각합니다.'
    ],
    professional: [
      '전문성을 바탕으로 효율적인 해결책을 제시합니다.',
      '데이터와 근거로 합리적 결론을 도출합니다.'
    ],
    interview: [
      '명확한 목표의식과 자기계발로 기여합니다.',
      '도전적인 과제에서도 꾸준히 성과를 만듭니다.'
    ]
  };

  const outroPatterns = [
    '지속해서 성장하며 조직에 기여하겠습니다.',
    '배움에 열려 있으며 협업에서 가치를 만들겠습니다.',
    '주어진 역할 이상을 해내는 것이 목표입니다.'
  ];

  // 단순 규칙 기반 정제: 공백/구두점, 영어 토큰 제거/치환, 문장 종결을 '습니다.'로 통일
  function normalizeText(s){
    if(!s) return s;
    // 영어 옵션 토큰 제거/치환(혹 남아있을 때)
    s = s.replace(/\bhaeyo\b/ig, '').replace(/\bserious\b/ig, '');
    Object.keys(styleKorean).forEach(k=>{
      s = s.replace(new RegExp('\\b'+k+'\\b','ig'), styleKorean[k]);
    });
    // 공백 정리
    s = s.replace(/\s+/g,' ').trim();
    // 쉼표/온점 주변 공백 정리
    s = s.replace(/\s+,/g,',').replace(/,\s*/g,', ').replace(/\s+\./g,'.');
    // 마침표 중복 제거
    s = s.replace(/\.{2,}/g,'.');
    // 끝 마침표/조사 정리: 문장이 '습니다.'로 끝나도록 강제
    s = s.replace(/[.!?]+$/,'');
    // 일부 잘못된 조사/어미 패턴 보정 (간단 규칙)
    s = s.replace(/\b입니다니다\b/g,'입니다');
    // 끝맺음
    if(!/습니다$/.test(s)) s = s.replace(/다$/,'습니다').replace(/니다$/,'니다').replace(/습니다$/,'습니다');
    if(!/습니다$/.test(s)) s = s + '습니다';
    // ensure final punctuation
    if(!/습니다\.$/.test(s)) s = s.replace(/$/,'.');
    return s;
  }

  function generateProfile(style, rawKeyword){
    const keywords = sanitizeKeywords(rawKeyword);
    if(keywords.length === 0) return '핵심 키워드를 1개 이상 입력해주세요.';
    const mainKW = keywords[0];
    const otherKW = keywords.slice(1);

    // 도입부: '저는' 반복 안 하도록 설계
    const introPool = [
      `${mainKW} 분야에서 쌓은 경험을 바탕으로 업무에 기여합니다.`,
      `${mainKW}을(를) 중심으로 전문성을 키워왔습니다.`,
      `${mainKW}에 대한 관심과 실무 경험으로 즉시 활용 가능한 역량을 보유하고 있습니다.`
    ];

    const intro = pick(introPool);
    const body = pick(stylePatterns[style] || stylePatterns['any']);
    let kwPhrase = '';
    if(otherKW.length){
      kwPhrase = ' 또한 ' + otherKW.slice(0,2).join(', ') + ' 관련 경험이 있습니다.';
    }
    const outro = pick(outroPatterns);

    let result = `${intro} ${body}${kwPhrase} ${outro}`;
    result = normalizeText(result);

    // 강제 100자 이내로 트리밍
    if(result.length > FIXED_MAX){
      let truncated = result.slice(0, FIXED_MAX - 3);
      // 마지막 미완성 단어 제거
      truncated = truncated.replace(/\s+[^\s]*$/,'');
      result = truncated + '...';
      result = normalizeText(result);
    }
    return result;
  }

  // 챗GPT 프롬프트 템플릿 (사용자가 복사해 붙여넣기 하도록 안내)
  function buildChatGPTPrompt(){
    return [
      '아래 정보를 참고해 800자 이내의 자기소개글을 작성해 주세요.',
      '- 상황: 000 (예: 면접, SNS, 자기소개서 등)',
      '- 페르소나/성격: 000 (예: 긍정적, 도전적, 유머러스 등)',
      '- 강점/경험: 000 (예: 개발 경험, 협업 능력, 창의적 문제 해결 등)',
      '- 핵심 키워드: 000 (콤마로 구분, 최소 1개 이상)',
      '- 분위기/말투: 000 (예: 진지한, 친근한, 해요체 삭제 → 합니다체 고정)',
      '- 후킹 문장 포함 여부: 000 (예: 포함 / 미포함)',
      '',
      '요청사항: 문법과 맞춤법을 정확히 지키고, 다양한 문장 구조로 작성해 주세요. 800자 이내로 완결된 문장으로 출력해주세요.'
    ].join('\n');
  }

  // 이벤트 바인딩
  document.getElementById('profile-form').addEventListener('submit', function(e){
    e.preventDefault();
    const style = document.getElementById('style').value || 'any';
    // length UI는 무시하고 100자 고정
    const keyword = document.getElementById('keyword').value || '';
    const result = generateProfile(style, keyword);

    // 결과 표시 및 챗GPT 프롬프트 안내(복사 버튼 포함)
    const promptText = buildChatGPTPrompt();
    document.getElementById('result-text').textContent = result;

    // 하단에 프롬프트 안내 영역 동적 추가 (이미 존재하면 덮어쓰기)
    const card = document.getElementById('result-card');
    let guide = card.querySelector('.cgpt-guide');
    if(!guide){
      guide = document.createElement('div');
      guide.className = 'cgpt-guide';
      guide.style.marginTop = '12px';
      guide.style.fontSize = '12px';
      guide.style.color = '#94a3b8';
      card.appendChild(guide);
    }
    guide.innerHTML = `
      <div style="margin-bottom:6px;">더 긴 문장(최대 800자)이 필요하면 아래 프롬프트를 챗GPT에 붙여넣어 사용하세요.</div>
      <pre id="cgpt-prompt" style="white-space:pre-wrap; background:#0b1220; padding:8px; border-radius:6px; color:#d1d5db; font-size:12px;">${promptText}</pre>
      <div style="margin-top:8px; display:flex; gap:8px;">
        <button id="copy-prompt-btn" class="btn secondary">프롬프트 복사</button>
      </div>
    `;
    // 복사 버튼 이벤트
    const copyBtn = document.getElementById('copy-prompt-btn');
    if(copyBtn){
      copyBtn.onclick = function(){
        navigator.clipboard.writeText(promptText);
        alert('프롬프트가 복사되었습니다. 챗GPT에 붙여넣어 사용하세요.');
      };
    }

    card.style.display = 'block';
  });

  // 복사/공유/재생성 버튼 (기존 기능 유지)
  document.getElementById('copy-btn').onclick = function(){
    navigator.clipboard.writeText(document.getElementById('result-text').textContent);
    alert('복사되었습니다!');
  };
  document.getElementById('share-btn').onclick = function(){
    const text = document.getElementById('result-text').textContent;
    if(navigator.share) navigator.share({text});
    else alert('이 브라우저는 공유를 지원하지 않습니다.');
  };
  document.getElementById('regen-btn').onclick = function(){
    const options = Array.from(document.getElementById('style').options).map(o=>o.value);
    const current = document.getElementById('style').value;
    let next;
    do { next = pick(options); } while(next === current);
    document.getElementById('style').value = next;
    document.getElementById('profile-form').dispatchEvent(new Event('submit'));
  };
})();