import { useState } from 'react';

/**
 * 어두운 화면 스위치. 누를 때마다 미리보기 상자의 색이 바뀐다.
 * 입력: 없음
 * 출력: 스위치 버튼과 미리보기 상자
 */
export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  function handleClick() {
    setIsDark(!isDark);
  }

  return (
    <div className={isDark ? 'demo-preview is-dark' : 'demo-preview'}>
      <button type="button" aria-pressed={isDark} onClick={handleClick}>
        어두운 화면
      </button>
      <p>버튼을 누르면 이 상자의 색이 바뀝니다.</p>
    </div>
  );
}
