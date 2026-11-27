/**
 * 가격에 부가세 10%를 더한다.
 * 입력: price - 부가세를 뺀 가격(원)
 * 출력: 부가세를 더한 가격(원)
 */
export const withTax = (price) => price + price / 10;

/**
 * 가격을 "11,000원" 모양의 글자로 바꾼다.
 * 입력: price - 가격(원)
 * 출력: 세 자리마다 쉼표를 찍고 "원"을 붙인 글자
 */
export default function formatPrice(price) {
  return `${price.toLocaleString('ko-KR')}원`;
}
