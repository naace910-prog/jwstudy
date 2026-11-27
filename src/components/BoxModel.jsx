/**
 * 첫 화면의 박스 모델 그림. 개발자 도구의 박스 모델 표시를 빌려
 * 이미 가진 것(가운데)과 새로 배울 것(바깥 세 겹)을 보여 준다.
 * 입력: 없음
 * 출력: 네 겹으로 감싼 상자 그림
 */
export default function BoxModel() {
  return (
    <div
      className="boxmodel"
      role="img"
      aria-label="박스 모델 그림. 가운데 콘텐츠는 이미 가진 HTML과 CSS, 그 바깥으로 자바스크립트, React, AI 도구가 차례로 감싼다."
    >
      <div className="bm bm-margin">
        <div className="bm-tag">
          <span>margin</span>
          <b>AI 도구로 시키고 검토하기</b>
        </div>
        <div className="bm bm-border">
          <div className="bm-tag">
            <span>border</span>
            <b>React 컴포넌트와 상태</b>
          </div>
          <div className="bm bm-padding">
            <div className="bm-tag">
              <span>padding</span>
              <b>자바스크립트 기본기</b>
            </div>
            <div className="bm-content">
              <strong>HTML · CSS</strong>
              <span>이미 가진 것, 6년</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
