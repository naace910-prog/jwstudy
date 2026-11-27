import BoxModel from '../components/BoxModel.jsx';
import CommandTable from '../components/CommandTable.jsx';
import PromptBlock from '../components/PromptBlock.jsx';
import RichText from '../components/RichText.jsx';
import Stage from '../components/Stage.jsx';
import { learnerCommands } from '../data/commands.js';
import { guideChecks } from '../store/records.js';
import {
  kit,
  loopSteps,
  mappings,
  patterns,
  pitfalls,
  refs,
  roleCompare,
  roleExamples,
  roleParts,
  roleReasons,
  stages,
  starterRule,
} from '../data/guide.js';

/**
 * 학습자용 길잡이 화면.
 * 입력: 없음 (확인 항목의 체크 상태는 store/records.js 가 저장소 파일에서 읽는다)
 * 출력: 역할 주기, 배우는 순환, 대응표, 준비물, 명령, 일곱 단계, 프롬프트 모음, 함정, 참고 문서
 */
export default function Guide() {
  return (
    <div className="wrap">
      <header className="hero">
        <div className="hero-text">
          <span className="eyebrow">HTML · CSS 6년차를 위한 React 입문</span>
          <h1>가운데는 이미 채워져 있습니다</h1>
          <p className="lede">
            바이브코딩은 AI에게 말로 시키고, 결과를 실행해 보며 고쳐 가는 개발 방식입니다. 이 길잡이는 그 방식으로 작은
            화면을 여섯 번 만들면서 자바스크립트와 React를 익히는 순서를 담았습니다.
          </p>
          <p className="lede">마크업과 스타일은 설명하지 않습니다. 새로 배울 것은 바깥 세 겹입니다.</p>
        </div>
        <BoxModel />
      </header>

      <section>
        <h2>먼저 AI에게 역할을 줍니다</h2>
        <p className="section-intro">
          역할을 준다는 것은 AI가 누구의 눈으로, 어떤 수준의 사람에게 답할지를 미리 정해 주는 일입니다. 바이브코딩을
          공부로 만들려면 이것부터 합니다.
        </p>
        <ul className="pitfalls">
          {roleReasons.map((reason) => (
            <li key={reason.title}>
              <b>{reason.title}</b>
              <span>
                <RichText text={reason.body} />
              </span>
            </li>
          ))}
        </ul>
        <div className="patterns">
          {roleCompare.map((item) => (
            <PromptBlock key={item.label} {...item} />
          ))}
        </div>

        <h3>역할 문장에 넣을 네 가지</h3>
        <dl className="kit">
          {roleParts.map((part) => (
            <div key={part.name}>
              <dt>{part.name}</dt>
              <dd>{part.body}</dd>
            </div>
          ))}
        </dl>
        <p className="section-intro">
          "세계 최고의 전문가" 같은 거창한 호칭은 효과가 작습니다. 답을 바꾸는 것은 호칭이 아니라 나의 수준과 원하는
          답의 모양을 얼마나 구체적으로 적었느냐입니다.
        </p>

        <h3>상황에 따라 역할을 바꿉니다</h3>
        <div className="patterns">
          {roleExamples.map((example) => (
            <PromptBlock key={example.label} {...example} />
          ))}
        </div>
        <p className="section-intro">
          <RichText text="계속 쓸 역할은 프로젝트의 지침 파일에 적어 두면 새 대화에서도 유지됩니다. Claude Code는 `CLAUDE.md`, Cursor는 `.cursor/rules`, GitHub Copilot은 `.github/copilot-instructions.md`입니다. 아래 준비물에 있는 규칙이 이 방법으로 쓴 예입니다." />
        </p>
      </section>

      <section>
        <h2>만들기만 하면 남는 게 없습니다</h2>
        <p className="section-intro">
          AI는 요청한 화면을 금방 만들어 줍니다. 그대로 넘어가면 결과물은 생기지만 실력은 그대로입니다. 기능 하나를 만들
          때마다 아래 다섯 걸음을 한 바퀴 돕니다.
        </p>
        <ol className="loop">
          {loopSteps.map((step) => (
            <li key={step.title}>
              <b>{step.title}</b>
              <span>{step.body}</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2>이미 아는 것과 새 이름</h2>
        <p className="section-intro">
          React의 개념 대부분은 퍼블리싱에서 해 오던 일에 이름이 새로 붙은 것입니다. 낯선 용어를 만나면 왼쪽 칸에서
          찾아보세요.
        </p>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>지금까지 하던 일</th>
                <th>React에서</th>
                <th>달라지는 점</th>
              </tr>
            </thead>
            <tbody>
              {mappings.map((row) => (
                <tr key={row.before}>
                  <td>
                    <RichText text={row.before} />
                  </td>
                  <td>
                    <RichText text={row.react} />
                  </td>
                  <td>
                    <RichText text={row.diff} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>준비물</h2>
        <dl className="kit">
          {kit.map((item) => (
            <div key={item.name}>
              <dt>{item.name}</dt>
              <dd>{item.body}</dd>
            </div>
          ))}
        </dl>
        <PromptBlock label="프로젝트를 시작할 때 AI에게 먼저 알려 둘 규칙" text={starterRule} />
      </section>

      <section>
        <h2>이 프로젝트에서 쓰는 명령</h2>
        <p className="section-intro">
          이 저장소 폴더에서 Claude Code를 열면 아래 명령을 쓸 수 있습니다. 위에서 말한 역할과 규칙이 명령 안에 이미 들어
          있어서, 매번 역할을 다시 적지 않아도 됩니다.
        </p>
        <CommandTable commands={learnerCommands} />
      </section>

      <section>
        <h2>일곱 단계</h2>
        <p className="section-intro">
          앞 단계의 개념이 다음 단계에 그대로 쓰이므로 순서대로 진행합니다. 기간은 주 5~6시간 기준의 권장치입니다. 확인
          항목은 <code>/study</code>에서 AI에게 자기 말로 설명해 내면 표시됩니다.
        </p>
        <div className="stages">
          {stages.map((stage) => (
            <Stage key={stage.id} stage={stage} checks={guideChecks} />
          ))}
        </div>
      </section>

      <section>
        <h2>자주 쓰는 말</h2>
        <p className="section-intro">어느 단계에서든 그대로 붙여 넣어 쓸 수 있습니다.</p>
        <div className="patterns">
          {patterns.map((pattern) => (
            <PromptBlock key={pattern.label} {...pattern} />
          ))}
        </div>
      </section>

      <section>
        <h2>자주 빠지는 함정</h2>
        <ul className="pitfalls">
          {pitfalls.map((pitfall) => (
            <li key={pitfall.title}>
              <b>{pitfall.title}</b>
              <span>
                <RichText text={pitfall.body} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>곁에 둘 문서</h2>
        <ul className="refs">
          {refs.map((ref) => (
            <li key={ref.href}>
              <a href={ref.href} target="_blank" rel="noreferrer">
                {ref.name}
              </a>{' '}
              {ref.body}
            </li>
          ))}
        </ul>
      </section>

      <footer>
        확인 항목의 표시는 저장소의 <code>records/learner/checks.json</code>에 있습니다.
      </footer>
    </div>
  );
}
