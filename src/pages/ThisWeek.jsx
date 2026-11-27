import PromptLog from '../components/PromptLog.jsx';
import QuestionList from '../components/QuestionList.jsx';
import RichText from '../components/RichText.jsx';
import WeekStrip from '../components/WeekStrip.jsx';
import { weeks } from '../data/curriculum.js';
import { demos } from '../data/demos.js';
import { lessons } from '../data/lessons.js';
import { weekRangeText } from '../lib/weeks.js';
import { instructorWeek, learnerWeek, promptsOf, questionsOf, settings } from '../store/records.js';

/**
 * 주소 글자가 링크로 걸어도 되는 웹 주소인지 확인한다.
 * 입력: text - 기록 파일에 적힌 주소
 * 출력: http 또는 https 로 시작하면 true (javascript: 같은 주소가 링크로 실행되지 않게 막는다)
 */
function isWebUrl(text) {
  return /^https?:\/\//i.test(text);
}

/**
 * 이번 주 화면. 한 주의 과제, 자료, 그 주에 오간 기록(제출, 프롬프트, 질문, 피드백)을 한곳에서 본다.
 * 입력: week - 선택된 주차, onWeekChange(week) - 주차를 바꾸는 함수
 * 출력: 주차 띠와 선택한 주의 과제·자료·기록
 */
export default function ThisWeek({ week: selected, onWeekChange }) {
  const week = weeks[selected - 1];
  const { submission } = learnerWeek(selected);
  const { feedback, sessionNote, passed, passedAt } = instructorWeek(selected);
  const weekLessons = lessons.filter((lesson) => lesson.week === selected);
  const demo = demos.find((item) => item.week === selected);

  return (
    <div className="wrap">
      <header className="hero hero-plain">
        <div className="hero-text">
          <span className="eyebrow">
            {settings.startDate ? `${selected}주차 · ${weekRangeText(settings.startDate, selected)}` : `${selected}주차`}
          </span>
          <h1>
            <RichText text={week.topic} />
          </h1>
          {!settings.startDate && (
            <p className="lede">
              1주차 시작일이 아직 없습니다. 강사가 <code>/teach</code>에서 정하면 오늘이 몇 주차인지 자동으로 맞춰집니다.
            </p>
          )}
        </div>
      </header>

      <section>
        <h2>주차</h2>
        <WeekStrip selected={selected} onSelect={onWeekChange} />
      </section>

      <section>
        <div className="stage-head">
          <h2>과제</h2>
          {week.checkpoint && <span className="badge">{week.checkpoint}</span>}
          <a className="stage-time" href="#guide">
            길잡이 {week.stage}
          </a>
        </div>
        <dl className="stage-meta">
          <dt>기본기</dt>
          <dd>
            <RichText text={week.basics} />
          </dd>
          <dt>과제</dt>
          <dd>{week.task}</dd>
          <dt>통과 기준</dt>
          <dd>
            <RichText text={week.pass} />
          </dd>
        </dl>
      </section>

      <section>
        <h2>이번 주 자료</h2>
        <dl className="stage-meta">
          <dt>
            <a href="#js">JS 기초</a>
          </dt>
          <dd>
            {weekLessons.length > 0
              ? weekLessons.map((lesson) => lesson.title).join(', ')
              : '새 개념이 없습니다. 지난 주차를 복습합니다.'}
          </dd>
          <dt>
            <a href="#demos">시연</a>
          </dt>
          <dd>{demo ? demo.title : '시연이 없습니다. 학습자 코드에서 시연 거리를 고릅니다.'}</dd>
        </dl>
      </section>

      <section>
        <div className="stage-head">
          <h2>제출</h2>
          {submission && <span className="pill is-submitted">{submission.submittedAt} 제출</span>}
          <span className="stage-time">학습자</span>
        </div>
        {submission ? (
          <dl className="stage-meta">
            <dt>결과물</dt>
            <dd>
              {submission.path && <code>{submission.path}</code>}{' '}
              {submission.url &&
                (isWebUrl(submission.url) ? (
                  <a href={submission.url} target="_blank" rel="noreferrer">
                    {submission.url}
                  </a>
                ) : (
                  submission.url
                ))}
            </dd>
            <dt>내 말로</dt>
            <dd className="pre-line">{submission.summary}</dd>
            <dt>아직 모르는 것</dt>
            <dd className="pre-line">{submission.unclear || '없음'}</dd>
          </dl>
        ) : (
          <p className="empty">
            아직 제출이 없습니다. 과제를 마치면 Claude Code에서 <code>/handoff 제출</code>을 실행합니다.
          </p>
        )}
      </section>

      <section>
        <div className="stage-head">
          <h2>강사 피드백</h2>
          {passed && <span className="pill is-good">{passedAt} 통과</span>}
          <span className="stage-time">강사</span>
        </div>
        {feedback || sessionNote ? (
          <dl className="stage-meta">
            <dt>잘 설명한 것</dt>
            <dd className="pre-line">{feedback?.good}</dd>
            <dt>다시 볼 것</dt>
            <dd className="pre-line">{feedback?.retry}</dd>
            <dt>세션 기록</dt>
            <dd className="pre-line">{sessionNote}</dd>
          </dl>
        ) : (
          <p className="empty">
            아직 피드백이 없습니다. 세션 뒤에 강사가 <code>/handoff 피드백</code>으로 남깁니다.
          </p>
        )}
      </section>

      <section>
        <h2>질문</h2>
        <QuestionList questions={questionsOf(selected)} />
      </section>

      <section>
        <h2>프롬프트 기록</h2>
        <PromptLog entries={promptsOf(selected)} />
      </section>

      <footer>
        이 화면은 저장소의 <code>records/</code> 파일을 읽어 보여 줍니다. 새 기록은 <code>/handoff 받기</code>로 가져옵니다.
      </footer>
    </div>
  );
}
