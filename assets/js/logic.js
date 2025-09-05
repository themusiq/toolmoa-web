// assets/js/logic.js
// 순수 로직만 (UI 없음). 다른 파일에서 import 해서 사용합니다.

export function calcAgeISO(iso) {
  // YYYY-MM-DD 형식 검사
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    throw new Error("날짜 형식은 YYYY-MM-DD 이어야 합니다.")
  }

  const [y, m, d] = iso.split("-").map(Number)
  const today = new Date()

  let age = today.getFullYear() - y
  const notYetBirthday =
    (today.getMonth() + 1 < m) ||
    ((today.getMonth() + 1 === m) && (today.getDate() < d))

  if (notYetBirthday) age -= 1
  if (age < 0 || age > 130) throw new Error("비정상 나이 범위입니다.")

  return age
}
