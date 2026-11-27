# JWStudy

강사 한 명과 학습자 한 명이 각자의 PC에서 함께 쓰는 학습 프로젝트다. 학습자는 AI 바이브코딩으로 React를 배우고, 강사는 매주 세션에서 학습자의 설명을 듣는다.

## 누가 무엇을 쓰는가

| 경로 | 쓰는 사람 |
| --- | --- |
| `homework/`, `records/learner/` | 학습자 |
| `records/instructor/`, `records/settings.json` | 강사 |
| `src/`, `.claude/`, 설정 파일 | 강사. 학습자는 커리큘럼이 그 과제를 낸 주에만 |

이 PC의 사용자가 누구인지는 저장소 루트의 `.jwstudy-role`(`learner` 또는 `instructor`)에 있다. 남의 폴더는 읽기만 한다.

## 스킬

- `/study`: 학습자가 공부를 시작할 때
- `/teach`: 강사가 세션을 준비할 때
- `/handoff`: 제출, 질문, 피드백, 답변을 주고받을 때

기록 파일의 모양은 `.claude/skills/handoff/records-format.md`에 있다. 웹 화면이 이 파일을 읽으므로 모양을 지킨다.

## 응답

한국어로 답한다. push는 사용자에게 확인을 받은 뒤에만 한다.
