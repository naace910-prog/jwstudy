// 저장소의 records/ 폴더에 있는 기록 파일을 읽는다.
// 기록은 강사와 학습자가 Claude Code 스킬(/study, /teach, /handoff)로 쓰고 git 으로 주고받는다.
// 웹은 읽어서 보여 주기만 한다. 파일 모양은 .claude/skills/handoff/records-format.md 에 있다.

import { weeks } from '../data/curriculum.js';

// 빌드할 때(개발 서버에서는 파일이 바뀔 때마다) records 아래 JSON 을 모두 읽어 온다.
const files = import.meta.glob('/records/**/*.json', { eager: true, import: 'default' });

/** records/ 아래 파일 하나를 읽는다. 아직 없는 파일이면 fallback 을 돌려준다. */
function read(path, fallback) {
  return files[`/records/${path}`] ?? fallback;
}

/** 주차 번호를 파일 이름으로 바꾼다: 3 → "week-03.json" */
function weekFile(weekNo) {
  return `week-${String(weekNo).padStart(2, '0')}.json`;
}

/** 강사가 정한 설정. startDate 는 1주차 시작일("2026-11-30" 형식, 미정이면 빈 글자) */
export const settings = read('settings.json', { startDate: '' });

/** 길잡이 확인 항목의 체크 상태. 키는 "c{단계}-{순번}" */
export const guideChecks = read('learner/checks.json', {});

/** 개념 사전. 키는 용어 id, 값은 학습자가 쓴 뜻 */
export const glossary = read('learner/glossary.json', {});

/**
 * 학습자가 그 주에 남긴 기록을 읽는다.
 * 입력: weekNo - 주차(1부터)
 * 출력: { submission?, prompts, questions }
 */
export function learnerWeek(weekNo) {
  const record = read(`learner/${weekFile(weekNo)}`, {});
  return { submission: record.submission, prompts: record.prompts ?? [], questions: record.questions ?? [] };
}

/**
 * 강사가 그 주에 남긴 기록을 읽는다.
 * 입력: weekNo - 주차(1부터)
 * 출력: { feedback?, sessionNote, passed, passedAt, answers }
 */
export function instructorWeek(weekNo) {
  const record = read(`instructor/${weekFile(weekNo)}`, {});
  return {
    feedback: record.feedback,
    sessionNote: record.sessionNote ?? '',
    passed: record.passed === true,
    passedAt: record.passedAt ?? '',
    answers: record.answers ?? {},
  };
}

/**
 * 그 주의 진행 상태를 알려 준다.
 * 입력: weekNo - 주차(1부터)
 * 출력: 'passed'(통과) | 'submitted'(제출) | 'none'(없음)
 */
export function weekStatus(weekNo) {
  if (instructorWeek(weekNo).passed) return 'passed';
  if (learnerWeek(weekNo).submission) return 'submitted';
  return 'none';
}

/**
 * 그 주의 질문에 강사의 답을 붙여 돌려준다.
 * 입력: weekNo - 주차(1부터)
 * 출력: [{ week, id, goal, stuck, aiSaid, date, answer?: { text, solved } }]
 */
export function questionsOf(weekNo) {
  const { answers } = instructorWeek(weekNo);
  return learnerWeek(weekNo).questions.map((question) => ({ ...question, week: weekNo, answer: answers[question.id] }));
}

/**
 * 그 주의 프롬프트 기록을 돌려준다.
 * 입력: weekNo - 주차(1부터)
 * 출력: [{ week, kind, text, date }]
 */
export function promptsOf(weekNo) {
  return learnerWeek(weekNo).prompts.map((prompt) => ({ ...prompt, week: weekNo }));
}

/** 통과가 확정된 주의 수 */
export const passedCount = weeks.filter((week) => weekStatus(week.week) === 'passed').length;
