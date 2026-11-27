// Claude Code 에서 쓰는 이 프로젝트의 명령. 스킬 본문은 .claude/skills/ 에 있다.

/** 학습자가 쓰는 명령 */
export const learnerCommands = [
  { command: '/study', when: '공부를 시작할 때', does: '지난 피드백과 이번 주 과제를 알려 주고, 배우는 순환에 맞춰 함께 진행합니다.' },
  { command: '/handoff 제출', when: '그 주 과제를 마쳤을 때', does: '결과물 위치, 내 말로 적기, 아직 설명 못 하는 부분을 묻고 강사에게 보냅니다.' },
  { command: '/handoff 질문', when: '20분 넘게 막혔을 때', does: '하려던 것, 막힌 곳, AI가 한 답을 정리해 강사에게 보냅니다.' },
  { command: '/handoff 받기', when: '세션 뒤나 공부를 시작하기 전', does: '강사가 남긴 피드백과 답변을 가져와 알려 줍니다.' },
];

/** 강사가 쓰는 명령 */
export const instructorCommands = [
  { command: '/teach', when: '세션 전', does: '지난주 결과물 요약, 설명을 요구할 질문 세 개, 통과 기준 점검표, 시연 제안을 한 장으로 정리합니다.' },
  { command: '/handoff 받기', when: '세션 전이나 틈틈이', does: '학습자가 새로 보낸 제출, 질문, 프롬프트 기록을 가져와 알려 줍니다.' },
  { command: '/handoff 피드백', when: '세션 뒤', does: '잘 설명한 것 하나, 다시 볼 것 하나, 세션 기록, 통과 여부를 적어 보냅니다.' },
  { command: '/handoff 답변', when: '질문이 올라왔을 때', does: '열린 질문에 답을 적어 보냅니다.' },
];
