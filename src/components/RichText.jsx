/**
 * 글 안의 `백틱` 구간을 <code> 로 바꿔 그린다.
 * 입력: text - 백틱이 섞인 문자열
 * 출력: 일반 글과 <code> 가 번갈아 나오는 조각
 */
export default function RichText({ text }) {
  // 백틱으로 자르면 홀수 번째 조각이 코드 구간이다.
  return text.split('`').map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : part));
}
