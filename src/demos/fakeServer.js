// 시연용 가짜 서버. 진짜 서버 대신 잠시 기다렸다가 정해진 결과를 돌려준다.

// 응답을 기다리는 시간: 로딩 상태가 눈에 보일 만큼 길고, 시연 흐름을 끊지 않을 만큼 짧은 값.
const DELAY_MS = 1200;

/**
 * 정해진 시간만큼 기다린다.
 * 입력: ms - 기다릴 시간(밀리초)
 * 출력: 그 시간이 지나면 끝나는 Promise
 */
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ORDERS = [
  { id: 'A-1024', item: '린넨 셔츠', status: '배송 중' },
  { id: 'A-1025', item: '캔버스 가방', status: '결제 완료' },
];

/**
 * 주문 목록을 받아 오는 가짜 요청.
 * 입력: mode - 'ok'(정상), 'empty'(빈 목록), 'fail'(실패)
 * 출력: 주문 배열을 돌려주는 Promise. mode 가 'fail' 이면 오류로 끝난다
 */
export async function fetchOrders(mode = 'ok') {
  await wait(DELAY_MS);
  if (mode === 'fail') {
    throw new Error('서버가 응답하지 않습니다.');
  }
  return mode === 'empty' ? [] : ORDERS;
}
