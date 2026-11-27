// 시연용 일정. 실제 앱에서는 서버에서 받아 온다.
const schedules = [
  { id: 'kickoff', date: '12/01', title: '킥오프 회의' },
  { id: 'design', date: '12/03', title: '시안 공유' },
  { id: 'markup', date: '12/08', title: '마크업 시작' },
  { id: 'review', date: '12/12', title: '중간 점검' },
];

/**
 * 일정 배열을 목록으로 그린다.
 * 입력: 없음
 * 출력: 날짜와 제목이 든 목록
 */
export default function ScheduleList() {
  return (
    <ul className="demo-list">
      {schedules.map((item) => (
        <li key={item.id}>
          <span className="demo-date">{item.date}</span> {item.title}
        </li>
      ))}
    </ul>
  );
}
