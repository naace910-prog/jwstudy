import PromptBlock from '../components/PromptBlock.jsx';
import RichText from '../components/RichText.jsx';
import WeekStrip from '../components/WeekStrip.jsx';
import { weeks } from '../data/curriculum.js';
import { lessons } from '../data/lessons.js';

/**
 * JS 기초 화면. 선택한 주차의 과제에 필요한 자바스크립트 문법을 설명, 예제, 직접 해 보기, 연습 문제로 보여 준다.
 * 입력: week - 선택된 주차, onWeekChange(week) - 주차를 바꾸는 함수
 * 출력: 주차 띠와 그 주의 개념 카드
 */
export default function JsBasics({ week, onWeekChange }) {
  const items = lessons.filter((lesson) => lesson.week === week);

  return (
    <div className="wrap">
      <header className="hero hero-plain">
        <div className="hero-text">
          <span className="eyebrow">JS 기초 · {week}주차</span>
          <h1>React 아래에 있는 자바스크립트</h1>
          <p className="lede">
            React 코드에서 낯선 부분은 대부분 React가 아니라 자바스크립트 문법입니다. 주차마다 그 주 과제에 필요한 문법만
            골랐습니다. 예제는 브라우저 개발자 도구(F12)의 콘솔에 붙여 넣어 바로 실행해 볼 수 있습니다.
          </p>
        </div>
      </header>

      <section>
        <h2>주차</h2>
        <WeekStrip selected={week} onSelect={onWeekChange} />
      </section>

      <section>
        <div className="stage-head">
          <h2>{week}주차 기본기</h2>
          <span className="stage-time">
            <RichText text={weeks[week - 1].basics} />
          </span>
        </div>
        {items.length === 0 ? (
          <p className="empty">
            {week}주차는 새 개념이 없습니다. 위에서 지난 주차를 골라 연습 문제를 다시 풀어 봅니다.
          </p>
        ) : (
          <div className="stages">
            {items.map((lesson) => (
              <article className="stage" key={lesson.id}>
                <h3>{lesson.title}</h3>
                {lesson.before && (
                  <p className="lesson-before">
                    <b>퍼블리싱에서는</b> <RichText text={lesson.before} />
                  </p>
                )}
                <p>
                  <RichText text={lesson.explain} />
                </p>
                <PromptBlock label="예제" text={lesson.example} command />

                <div className="lesson-part">
                  <p className="checklist-title">직접 해 보기</p>
                  <p>
                    <RichText text={lesson.tryIt.text} />
                  </p>
                  {lesson.tryIt.code && <PromptBlock label="콘솔에 붙여 넣기" text={lesson.tryIt.code} command />}
                </div>

                <div className="lesson-part">
                  <p className="checklist-title">연습 문제</p>
                  <p>
                    <RichText text={lesson.exercise.question} />
                  </p>
                  {lesson.exercise.hint && (
                    <details className="reveal">
                      <summary>힌트</summary>
                      <p>
                        <RichText text={lesson.exercise.hint} />
                      </p>
                    </details>
                  )}
                  <details className="reveal">
                    <summary>답 보기</summary>
                    {lesson.exercise.answerCode && <pre className="answer">{lesson.exercise.answerCode}</pre>}
                    {lesson.exercise.answer && (
                      <p>
                        <RichText text={lesson.exercise.answer} />
                      </p>
                    )}
                  </details>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer>
        개념을 더 깊이 보려면 길잡이 화면 아래의 모던 JavaScript 튜토리얼에서 같은 이름의 장을 찾습니다.
      </footer>
    </div>
  );
}
