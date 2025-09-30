import wordsKo from '../../data/nickname/words.ko.js';

// 다양한 닉네임 조합 템플릿
const tpls = [
  "{adj}{noun}",
  "{adj}의{noun}",
  "{noun}{suffix}",
  "{adj}{noun}{suffix}",
  "{noun}의{adj}",
  "{adj}-{noun}",
  "{adj}_{noun}",
  "{noun}{adj}{suffix}"
];

// 배열에서 랜덤 선택
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 템플릿에 맞게 닉네임 생성
function buildByTemplate(tpl, a, n, s) {
  return tpl
    .replace("{adj}", () => pick(a) ?? "")
    .replace("{noun}", () => pick(n) ?? "")
    .replace("{suffix}", () => pick(s) ?? "");
}

// 닉네임 생성 함수 (page.js에서 import해서 사용)
export function generate({ lang = "ko", count = 10, theme = "any" } = {}) {
  const adjs = wordsKo.adj[theme] || wordsKo.adj.any;
  const nouns = wordsKo.noun[theme] || wordsKo.noun.any;
  const suffixes = wordsKo.suffix.any;

  const out = [];
  for (let i = 0; i < count; i++) {
    const tpl = pick(tpls);
    out.push(buildByTemplate(tpl, adjs, nouns, suffixes));
  }
  return out;
}