/**
 * 위쪽 메뉴 옆에 놓이는 진행 표시.
 * 입력: label - 세는 대상의 이름(예: "확인", "통과"), done - 체크한 수, total - 전체 수
 * 출력: "이름 n / m" 글과 채워지는 막대
 */
export default function ProgressBar({ label, done, total }) {
  return (
    <>
      <span className="bar-label">
        {label} {done} / {total}
      </span>
      <div className="bar-track" aria-hidden="true">
        <div className="bar-fill" style={{ width: `${(done / total) * 100}%` }} />
      </div>
    </>
  );
}
