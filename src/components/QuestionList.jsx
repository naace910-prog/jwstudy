/**
 * 질문과 강사의 답 목록.
 * 입력: questions - [{ week, id, goal, stuck, aiSaid, date, answer?: { text, solved } }], showWeek - true 면 주차도 보여 준다
 * 출력: 질문 카드 목록. 비어 있으면 안내 글
 */
export default function QuestionList({ questions, showWeek = false }) {
  if (questions.length === 0) {
    return (
      <p className="empty">
        올라온 질문이 없습니다. 20분 넘게 막힌 것은 <code>/handoff 질문</code>으로 올립니다.
      </p>
    );
  }
  return (
    <ul className="entries">
      {questions.map((question) => (
        <li key={`${question.week}-${question.id}`} className="entry">
          <div className="entry-head">
            <span className={`pill ${question.answer?.solved ? 'is-good' : 'is-hard'}`}>
              {question.answer?.solved ? '해결' : '열림'}
            </span>
            <span className="stage-time">
              {showWeek && `${question.week}주차 · `}
              {question.date}
            </span>
          </div>
          <dl className="stage-meta">
            <dt>하려던 것</dt>
            <dd>{question.goal}</dd>
            <dt>막힌 곳</dt>
            <dd>{question.stuck}</dd>
            <dt>AI의 답</dt>
            <dd>{question.aiSaid}</dd>
            <dt>강사의 답</dt>
            <dd>{question.answer?.text || <span className="empty">아직 답이 없습니다.</span>}</dd>
          </dl>
        </li>
      ))}
    </ul>
  );
}
