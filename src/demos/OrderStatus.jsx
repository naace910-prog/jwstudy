import { useEffect, useState } from 'react';
import { fetchOrders } from './fakeServer.js';

/**
 * 화면이 열리면 주문을 불러오고, 로딩·실패·빈 목록·정상 네 경우를 나눠 보여 준다.
 * 입력: 없음
 * 출력: 서버 응답을 고르는 칸과 상태별 화면
 */
export default function OrderStatus() {
  const [mode, setMode] = useState('ok');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const result = await fetchOrders(mode);
        if (!ignore) setOrders(result);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [mode]);

  return (
    <div className="demo-preview">
      <label htmlFor="demo-server-mode">서버 응답</label>{' '}
      <select id="demo-server-mode" value={mode} onChange={(event) => setMode(event.target.value)}>
        <option value="ok">정상</option>
        <option value="empty">빈 목록</option>
        <option value="fail">실패</option>
      </select>
      {loading && <p>불러오는 중…</p>}
      {!loading && error && <p className="demo-error">불러오지 못했습니다: {error}</p>}
      {!loading && !error && orders.length === 0 && <p>주문이 없습니다.</p>}
      {!loading && !error && orders.length > 0 && (
        <ul className="demo-list">
          {orders.map((order) => (
            <li key={order.id}>
              {order.item} · {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
