import PromptLog from '../components/PromptLog.jsx';
import QuestionList from '../components/QuestionList.jsx';
import { weeks } from '../data/curriculum.js';
import { glossaryTerms } from '../data/notes.js';
import { glossary, promptsOf, questionsOf } from '../store/records.js';

// 최근 주차가 위에 오게 뒤에서부터 모은다.
const recentFirst = [...weeks].reverse();
const allPrompts = recentFirst.flatMap((week) => promptsOf(week.week));
const allQuestions = recentFirst.flatMap((week) => questionsOf(week.week));

/**
 * 기록 화면. 전체 주차의 프롬프트 기록과 질문, 그리고 개념 사전을 모아 본다.
 * 입력: 없음 (기록은 store/records.js 가 저장소 파일에서 읽는다)
 * 출력: 개념 사전, 질문함, 프롬프트 기록
 */
export default function Notes() {
  return (
    <div className="wrap">
      <header className="hero hero-plain">
        <div className="hero-text">
          <span className="eyebrow">세션에서 함께 보는 기록</span>
          <h1>적어 둔 것만 남습니다</h1>
          <p className="lede">
            내 말로 쓴 개념의 뜻, 20분 넘게 막힌 질문, AI에게 한 요청을 주차 구분 없이 모았습니다. 매주 세션에서 이 화면을
            함께 봅니다.
          </p>
        </div>
      </header>

      <section>
        <h2>개념 사전</h2>
        <p className="section-intro">
          용어마다 학습자가 자기 말로 쓴 뜻입니다. <code>/study</code>에서 새 개념을 배운 뒤 적습니다.
        </p>
        <dl className="glossary">
          {glossaryTerms.map((item) => (
            <div key={item.id}>
              <dt>
                {item.term} <span className="stage-time">{item.week}주차</span>
              </dt>
              <dd className={glossary[item.id] ? 'pre-line' : 'empty'}>{glossary[item.id] || '아직 적지 않았습니다.'}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2>질문함</h2>
        <QuestionList questions={allQuestions} showWeek />
      </section>

      <section>
        <h2>프롬프트 기록</h2>
        <PromptLog entries={allPrompts} showWeek />
      </section>

      <footer>
        이 화면은 저장소의 <code>records/</code> 파일을 읽어 보여 줍니다. 새 기록은 <code>/handoff 받기</code>로 가져옵니다.
      </footer>
    </div>
  );
}
