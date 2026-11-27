const KIND_LABELS = { good: '잘된 요청', hard: '헤맨 요청' };

/**
 * 프롬프트 기록 목록.
 * 입력: entries - [{ week, kind, text, date }], showWeek - true 면 주차도 함께 보여 준다
 * 출력: 기록 카드 목록. 비어 있으면 안내 글
 */
export default function PromptLog({ entries, showWeek = false }) {
  if (entries.length === 0) {
    return (
      <p className="empty">
        아직 기록이 없습니다. <code>/study</code>로 공부를 마무리할 때 잘된 요청과 헤맨 요청을 하나씩 남깁니다.
      </p>
    );
  }
  return (
    <ul className="entries">
      {entries.map((entry) => (
        <li key={`${entry.week}-${entry.date}-${entry.text}`} className="entry">
          <div className="entry-head">
            <span className={`pill is-${entry.kind}`}>{KIND_LABELS[entry.kind]}</span>
            <span className="stage-time">
              {showWeek && `${entry.week}주차 · `}
              {entry.date}
            </span>
          </div>
          <pre className="entry-text">{entry.text}</pre>
        </li>
      ))}
    </ul>
  );
}
