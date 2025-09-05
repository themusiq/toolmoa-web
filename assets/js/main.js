// assets/js/main.js
import { calcAgeISO } from "/assets/js/logic.js"

// 공통 선택자(해당 페이지에 요소가 있으면 동작)
const form = document.querySelector("#form")
const input = document.querySelector("#birth")
const out = document.querySelector("#result")
const err = document.querySelector("#error")

function showError(msg) {
  if (err) { err.textContent = msg; err.hidden = false }
}
function clearError() {
  if (err) err.hidden = true
}

form?.addEventListener("submit", (e) => {
  e.preventDefault()
  clearError()
  try {
    const v = (input?.value || "").trim()
    const age = calcAgeISO(v)
    if (out) { out.textContent = `만 ${age}세`; out.hidden = false }
  } catch (e2) {
    showError(e2.message || "알 수 없는 오류")
  }
})
