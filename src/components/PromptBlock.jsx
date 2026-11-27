import { useRef, useState } from 'react';

// 버튼 문구를 원래대로 돌리는 시간: 눈으로 확인하기에 충분하고 다음 복사를 방해하지 않는 길이.
const RESET_MS = 1500;

/**
 * 복사 버튼이 달린 프롬프트(또는 터미널 명령) 상자.
 * 입력: label - 상자 제목, text - 복사할 글, command - true 면 터미널 명령으로 보고 줄바꿈하지 않는다
 * 출력: 제목 줄과 글 상자. 복사가 거부되면 글을 선택해 직접 복사할 수 있게 한다.
 */
export default function PromptBlock({ label, text, command = false }) {
  const [buttonText, setButtonText] = useState('복사');
  const preRef = useRef(null);

  function selectText() {
    const range = document.createRange();
    range.selectNodeContents(preRef.current);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    setButtonText('선택됨');
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setButtonText('복사됨');
    } catch {
      // http 로 열었거나 브라우저가 클립보드를 막은 경우
      selectText();
    }
    setTimeout(() => setButtonText('복사'), RESET_MS);
  }

  return (
    <div className="prompt">
      <div className="prompt-head">
        <span>{label}</span>
        <button type="button" className="copy" onClick={handleCopy}>
          {buttonText}
        </button>
      </div>
      <pre ref={preRef} className={command ? 'cmd' : undefined}>
        {text}
      </pre>
    </div>
  );
}
