// 시작일로부터 주차와 날짜 범위를 계산한다.

const DAY_MS = 24 * 60 * 60 * 1000;
// 한 주차의 길이: 커리큘럼이 주 1회 세션을 기준으로 짜여 있다.
const DAYS_PER_WEEK = 7;

/**
 * 날짜 입력 칸의 글자를 그날 0시의 Date 로 바꾼다.
 * 입력: text - "2026-11-30" 형식의 글자
 * 출력: 사용자 시간대 기준 그날 0시의 Date
 */
export function parseDate(text) {
  const [year, month, day] = text.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * 오늘이 몇 주차인지 계산한다.
 * 입력: startDate - 1주차 시작일("2026-11-30" 형식, 비어 있을 수 있음), totalWeeks - 전체 주 수, today - 기준일
 * 출력: 1 이상 totalWeeks 이하의 주차. 시작일이 없거나 시작 전이면 1, 과정이 끝난 뒤면 마지막 주
 */
export function currentWeek(startDate, totalWeeks, today = new Date()) {
  if (!startDate) return 1;
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const days = Math.round((todayStart - parseDate(startDate)) / DAY_MS);
  const week = Math.floor(days / DAYS_PER_WEEK) + 1;
  return Math.min(totalWeeks, Math.max(1, week));
}

/**
 * 어느 주차의 날짜 범위를 글자로 만든다.
 * 입력: startDate - 1주차 시작일, week - 주차(1부터)
 * 출력: "11월 30일 ~ 12월 6일" 형식의 글자
 */
export function weekRangeText(startDate, week) {
  const first = new Date(parseDate(startDate).getTime());
  first.setDate(first.getDate() + (week - 1) * DAYS_PER_WEEK);
  const last = new Date(first.getTime());
  last.setDate(last.getDate() + DAYS_PER_WEEK - 1);
  const format = (date) => `${date.getMonth() + 1}월 ${date.getDate()}일`;
  return `${format(first)} ~ ${format(last)}`;
}
