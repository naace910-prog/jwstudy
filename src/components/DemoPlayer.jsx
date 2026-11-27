import { useEffect, useState } from 'react';
import RichText from './RichText.jsx';

// 자동 재생에서 한 단계에 머무는 시간: 기본 5초에 설명 한 글자당 0.06초를 더해 긴 설명은 더 오래 보여 준다.
const BASE_MS = 5000;
const MS_PER_CHAR = 60;

/**
 * 시연 하나를 단계별로 재생한다. 단계마다 코드, 강조할 줄, 설명이 바뀐다.
 * 입력: demo - data/demos.js 의 시연 객체
 * 출력: 코드 상자, 단계 설명, 재생 버튼, 실제로 동작하는 결과, 세션에서 물어볼 것
 */
export default function DemoPlayer({ demo }) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const last = demo.steps.length - 1;
  const current = demo.steps[step];

  useEffect(() => {
    if (!playing) return undefined;
    const timer = setTimeout(() => {
      setStep(step + 1);
      if (step + 1 === last) setPlaying(false);
    }, BASE_MS + current.note.length * MS_PER_CHAR);
    return () => clearTimeout(timer);
  }, [playing, step, last, current]);

  /** 단계를 직접 옮기면 자동 재생을 멈춘다. */
  function goTo(index) {
    setPlaying(false);
    setStep(index);
  }

  function togglePlay() {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (step === last) setStep(0);
    setPlaying(true);
  }

  let playLabel = '재생';
  if (playing) playLabel = '멈춤';
  else if (step === last) playLabel = '처음부터 재생';

  return (
    <>
      <section>
        <div className="stage-head">
          <span className="stage-no">{demo.week}주</span>
          <h2>{demo.title}</h2>
        </div>
        <p className="section-intro">
          <RichText text={demo.goal} />
        </p>

        <div className="player">
          <div className="player-head">
            <span className="player-file">{current.file}</span>
            {current.tag && <span className="badge">{current.tag}</span>}
            <span className="player-count">
              {step + 1} / {last + 1}
            </span>
          </div>
          <pre className="player-code">
            {current.code.split('\n').map((line, i) => (
              // 줄 번호가 곧 그 줄의 이름이고 줄 순서는 바뀌지 않으므로 순번을 key 로 쓴다.
              <span key={i} className={current.highlight.includes(i + 1) ? 'line is-hl' : 'line'}>
                <span className="line-no" aria-hidden="true">
                  {i + 1}
                </span>
                {line || ' '}
              </span>
            ))}
          </pre>
          <p className="player-note" aria-live="polite">
            <RichText text={current.note} />
          </p>
          <div className="player-controls">
            <button type="button" className="btn" onClick={() => goTo(step - 1)} disabled={step === 0}>
              이전
            </button>
            <button type="button" className="btn btn-primary" onClick={togglePlay}>
              {playLabel}
            </button>
            <button type="button" className="btn" onClick={() => goTo(step + 1)} disabled={step === last}>
              다음
            </button>
            <div className="player-dots" role="group" aria-label="단계로 바로 가기">
              {demo.steps.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  className="player-dot"
                  aria-label={`${i + 1}단계: ${item.tag ?? item.file}`}
                  aria-current={i === step ? 'step' : undefined}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>결과</h2>
        <p className="section-intro">완성된 코드가 실제로 동작하는 화면입니다. 직접 눌러 보세요.</p>
        <div className="demo-stage">
          <demo.Result />
        </div>
        <p className="hint">
          파일:{' '}
          {demo.files.map((file) => (
            <code key={file}>{file}</code>
          ))}{' '}
          학습자는 이 파일을 <code>homework/</code> 아래에 복사해서 고쳐 봅니다.
        </p>
      </section>

      <section>
        <h2>세션에서 물어볼 것</h2>
        <p className="section-intro">재생을 마친 뒤 학습자에게 묻습니다. 답을 먼저 알려 주지 않습니다.</p>
        <ol className="refs">
          {demo.ask.map((question) => (
            <li key={question}>
              <RichText text={question} />
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
