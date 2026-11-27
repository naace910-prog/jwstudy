import formatPrice, { withTax } from './price.js';

/**
 * 부가세를 더한 가격 세 줄을 보여 준다.
 * 입력: 없음
 * 출력: 상품 이름과 가격이 든 목록
 */
export default function PriceDemo() {
  return (
    <ul className="demo-list">
      <li>린넨 셔츠 {formatPrice(withTax(39000))}</li>
      <li>코튼 양말 {formatPrice(withTax(8000))}</li>
      <li>캔버스 가방 {formatPrice(withTax(25000))}</li>
    </ul>
  );
}
