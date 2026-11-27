/**
 * 프로필 카드 한 장.
 * 입력: name - 이름, role - 하는 일, years - 경력(년)
 * 출력: 이름, 하는 일, 경력이 든 카드
 */
function ProfileCard({ name, role, years }) {
  return (
    <article className="demo-card">
      <h4>{name}</h4>
      <p>{role} · {years}년</p>
    </article>
  );
}

/**
 * 프로필 카드 세 장을 나란히 보여 준다.
 * 입력: 없음
 * 출력: 서로 다른 props 를 받은 ProfileCard 세 개
 */
export default function ProfileCards() {
  return (
    <div className="demo-row">
      <ProfileCard name="한결" role="퍼블리셔" years={6} />
      <ProfileCard name="서윤" role="디자이너" years={4} />
      <ProfileCard name="도현" role="프론트엔드" years={3} />
    </div>
  );
}
