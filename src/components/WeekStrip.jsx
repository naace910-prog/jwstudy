import { weeks } from '../data/curriculum.js';
import { currentWeek } from '../lib/weeks.js';
import { settings, weekStatus } from '../store/records.js';

/**
 * 주차 선택 띠. 칸마다 그 주의 진행 상태(제출, 통과)를 색으로 보여 주고, 오늘이 속한 주에 표시를 단다.
 * 입력: selected - 선택된 주차, onSelect(week) - 칸을 눌렀을 때 부르는 함수
 * 출력: 12칸 버튼 띠와 색 범례
 */
export default function WeekStrip({ selected, onSelect }) {
  const nowWeek = currentWeek(settings.startDate, weeks.length);
  return (
    <>
      <div className="week-strip" role="group" aria-label="주차 선택">
        {weeks.map((item) => (
          <button
            key={item.week}
            type="button"
            className={`week-cell is-${weekStatus(item.week)}`}
            aria-pressed={item.week === selected}
            onClick={() => onSelect(item.week)}
          >
            {item.week}
            {item.week === nowWeek && settings.startDate && <span className="week-now">오늘</span>}
          </button>
        ))}
      </div>
      <p className="legend">
        <span className="legend-item is-submitted">제출</span>
        <span className="legend-item is-passed">통과</span>
      </p>
    </>
  );
}
