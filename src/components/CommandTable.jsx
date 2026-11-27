/**
 * Claude Code 명령 안내 표.
 * 입력: commands - [{ command, when, does }] (data/commands.js)
 * 출력: 명령, 언제 쓰는지, 무엇을 하는지 세 칸짜리 표
 */
export default function CommandTable({ commands }) {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>명령</th>
            <th>언제</th>
            <th>하는 일</th>
          </tr>
        </thead>
        <tbody>
          {commands.map((item) => (
            <tr key={item.command}>
              <td className="num">
                <code>{item.command}</code>
              </td>
              <td>{item.when}</td>
              <td>{item.does}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
