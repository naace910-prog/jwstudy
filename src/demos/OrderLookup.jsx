import { useState } from 'react';
import { fetchOrders } from './fakeServer.js';

/**
 * 버튼을 누르면 가짜 서버에서 주문을 불러와 보여 준다.
 * 입력: 없음
 * 출력: 불러오기 버튼, 진행 문구, 주문 목록
 */
export default function OrderLookup() {
  const [message, setMessage] = useState('버튼을 눌러 주문을 불러오세요.');
  const [orders, setOrders] = useState([]);

  async function handleClick() {
    setMessage('불러오는 중…');
    const result = await fetchOrders();
    setOrders(result);
    setMessage(`${result.length}건을 불러왔습니다.`);
  }

  return (
    <div className="demo-preview">
      <button type="button" onClick={handleClick}>
        주문 불러오기
      </button>
      <p>{message}</p>
      <ul className="demo-list">
        {orders.map((order) => (
          <li key={order.id}>
            {order.item} · {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
