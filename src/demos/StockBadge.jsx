import { useState } from 'react';

// 이 개수보다 적으면 "곧 품절"을 보여 준다: 시연에서 버튼 몇 번으로 경계를 넘나들 수 있는 작은 값.
const LOW_STOCK = 3;

/**
 * 재고 수에 따라 배지와 구매 버튼이 바뀌는 상품 줄.
 * 입력: 없음
 * 출력: 재고 조절 버튼, 상태 배지, 구매 버튼
 */
export default function StockBadge() {
  const [stock, setStock] = useState(5);

  return (
    <div className="demo-preview">
      <p>
        린넨 셔츠 · 재고 {stock}개{' '}
        {stock === 0 && <span className="demo-badge is-out">품절</span>}
        {stock > 0 && stock < LOW_STOCK && <span className="demo-badge is-low">곧 품절</span>}
      </p>
      <div className="demo-actions">
        <button type="button" onClick={() => setStock(stock + 1)}>입고 +1</button>
        <button type="button" onClick={() => setStock(stock - 1)} disabled={stock === 0}>
          판매 −1
        </button>
      </div>
      <button type="button" disabled={stock === 0}>
        {stock > 0 ? '구매하기' : '구매할 수 없음'}
      </button>
    </div>
  );
}
