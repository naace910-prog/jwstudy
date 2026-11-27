import PromptBlock from './PromptBlock.jsx';
import RichText from './RichText.jsx';

/**
 * 학습 단계 하나를 그리는 카드.
 * 입력: stage - guide.js 의 단계 객체, checks - 확인 항목 체크 상태 객체(키는 "c{단계}-{순번}")
 * 출력: 단계 제목, 만들 것·익히는 것, 프롬프트 상자, 확인 항목 목록
 */
export default function Stage({ stage, checks }) {
  return (
    <article className="stage">
      <div className="stage-head">
        <span className="stage-no">{stage.id}단계</span>
        <h3>{stage.title}</h3>
        <span className="stage-time">{stage.time}</span>
      </div>

      <dl className="stage-meta">
        <dt>만들 것</dt>
        <dd>
          <RichText text={stage.make} />
        </dd>
        <dt>익히는 것</dt>
        <dd>
          <RichText text={stage.learn} />
        </dd>
      </dl>

      {stage.prompts.map((prompt) => (
        <PromptBlock key={prompt.label} {...prompt} />
      ))}

      <div>
        <p className="checklist-title">넘어가기 전에 설명할 수 있어야 하는 것</p>
        <ul className="checklist">
          {stage.checks.map((check, i) => {
            const done = !!checks[`c${stage.id}-${i}`];
            return (
              <li key={check} className={done ? 'is-done' : undefined}>
                <span>
                  <RichText text={check} />
                  {done && <span className="sr-only"> (설명 완료)</span>}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
