import DemoPlayer from '../components/DemoPlayer.jsx';
import WeekStrip from '../components/WeekStrip.jsx';
import { demos } from '../data/demos.js';

/**
 * 시연 화면. 선택한 주차의 시연 코드를 단계별로 재생하고, 완성된 코드가 동작하는 결과를 보여 준다.
 * 입력: week - 선택된 주차, onWeekChange(week) - 주차를 바꾸는 함수
 * 출력: 주차 띠와 그 주의 시연 재생기. 시연이 없는 주에는 안내 글
 */
export default function Demos({ week, onWeekChange }) {
  const demo = demos.find((item) => item.week === week);

  return (
    <div className="wrap">
      <header className="hero hero-plain">
        <div className="hero-text">
          <span className="eyebrow">시연 · {week}주차</span>
          <h1>한 줄씩 따라 보는 코드</h1>
          <p className="lede">
            강사가 세션의 5분 시연에 쓰고, 학습자가 세션 뒤에 혼자 다시 보는 자료입니다. 재생을 누르면 코드가 단계별로
            바뀌고 바뀐 줄이 강조됩니다. 아래 결과는 완성된 코드가 실제로 동작하는 화면입니다.
          </p>
        </div>
      </header>

      <section>
        <h2>주차</h2>
        <WeekStrip selected={week} onSelect={onWeekChange} />
      </section>

      {demo ? (
        // 주차를 바꾸면 재생 위치를 처음으로 되돌리도록 시연마다 새로 만든다.
        <DemoPlayer key={demo.id} demo={demo} />
      ) : (
        <section>
          <p className="empty">
            {week}주차는 시연이 없습니다. 9주차부터는 라우터와 타입스크립트를 학습자가 자기 과제에 직접 붙이는 주라서,
            강사는 <code>/teach</code>로 학습자 코드에서 시연 거리를 고르고 학습자는 <a href="#js">JS 기초</a>의 같은
            주차를 봅니다.
          </p>
        </section>
      )}
    </div>
  );
}
