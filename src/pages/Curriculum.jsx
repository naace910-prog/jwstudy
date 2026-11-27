import CommandTable from '../components/CommandTable.jsx';
import RichText from '../components/RichText.jsx';
import { instructorCommands } from '../data/commands.js';
import { instructorWeek } from '../store/records.js';
import {
  adjustments,
  checkpoints,
  criteria,
  instructorRoles,
  instructorRules,
  overview,
  prep,
  sessionPlan,
  weeks,
} from '../data/curriculum.js';

/**
 * 강사용 커리큘럼 화면.
 * 입력: 없음 (주차별 통과 여부는 store/records.js 가 저장소 파일에서 읽는다)
 * 출력: 과정 개요, 강사 역할, 명령, 세션 시간표, 12주 계획, 점검, 평가 기준, 준비물, 조정 방법
 */
export default function Curriculum() {
  return (
    <div className="wrap">
      <header className="hero hero-plain">
        <div className="hero-text">
          <span className="eyebrow">강사용 · 12주 과정</span>
          <h1>코드가 아니라 설명을 봅니다</h1>
          <p className="lede">
            코드와 풀이는 AI가 맡습니다. 강사는 학습자의 설명을 듣고, AI에게 시키는 방법을 고쳐 주고, 다음 주로 넘어갈지를
            정합니다.
          </p>
        </div>
      </header>

      <section>
        <h2>과정 개요</h2>
        <dl className="kit">
          {overview.map((item) => (
            <div key={item.name}>
              <dt>{item.name}</dt>
              <dd>{item.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2>강사가 하는 일</h2>
        <ol className="loop loop-3">
          {instructorRoles.map((role) => (
            <li key={role.title}>
              <b>{role.title}</b>
              <span>{role.body}</span>
            </li>
          ))}
        </ol>
        <h3>지킬 것</h3>
        <ul className="refs">
          {instructorRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>강사가 쓰는 명령</h2>
        <p className="section-intro">이 저장소 폴더에서 Claude Code를 열면 쓸 수 있습니다.</p>
        <CommandTable commands={instructorCommands} />
      </section>

      <section>
        <h2>매주 세션 60분</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>시간</th>
                <th>내용</th>
              </tr>
            </thead>
            <tbody>
              {sessionPlan.map((slot) => (
                <tr key={slot.body}>
                  <td className="num">{slot.minutes}분</td>
                  <td>{slot.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>12주 계획</h2>
        <p className="section-intro">
          통과 기준은 길잡이 화면의 단계별 확인 항목과 같습니다. 강사는 세션에서 설명을 듣고{' '}
          <code>/handoff 피드백</code>으로 통과를 확정합니다.
        </p>
        <div className="stages">
          {weeks.map((week) => {
            const { passed, passedAt } = instructorWeek(week.week);
            return (
              <article className="stage" key={week.week}>
                <div className="stage-head">
                  <span className="stage-no">{week.week}주</span>
                  <h3>
                    <RichText text={week.topic} />
                  </h3>
                  {week.checkpoint && <span className="badge">{week.checkpoint}</span>}
                  {passed && <span className="pill is-good">{passedAt} 통과</span>}
                  <span className="stage-time">길잡이 {week.stage}</span>
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
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <h2>점검 세 번</h2>
        <p className="section-intro">점검 주에는 새 개념을 소개하지 않고 세션 전체를 점검에 씁니다.</p>
        <div className="stages">
          {checkpoints.map((cp) => (
            <article className="stage" key={cp.name}>
              <div className="stage-head">
                <span className="badge">{cp.name}</span>
                <h3>{cp.title}</h3>
                <span className="stage-time">{cp.when}</span>
              </div>
              <dl className="stage-meta">
                <dt>과제</dt>
                <dd>{cp.task}</dd>
                <dt>조건</dt>
                <dd>{cp.condition}</dd>
                <dt>통과</dt>
                <dd>{cp.pass}</dd>
                <dt>미통과 시</dt>
                <dd>{cp.fail}</dd>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>평가 기준</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>구분</th>
                <th>본다</th>
                <th>보지 않는다</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((row) => (
                <tr key={row.area}>
                  <td>{row.area}</td>
                  <td>{row.look}</td>
                  <td>{row.ignore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>강사 준비물</h2>
        <ul className="pitfalls">
          {prep.map((item) => (
            <li key={item.title}>
              <b>{item.title}</b>
              <span>
                <RichText text={item.body} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>조정이 필요한 경우</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>상황</th>
                <th>조정</th>
              </tr>
            </thead>
            <tbody>
              {adjustments.map((row) => (
                <tr key={row.when}>
                  <td>{row.when}</td>
                  <td>{row.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer>
        기간과 주간 시간은 가정한 값입니다. 실제 일정에 맞춰 <code>src/data/curriculum.js</code>에서 고칩니다.
      </footer>
    </div>
  );
}
