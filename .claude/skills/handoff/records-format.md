# 기록 파일 형식

강사와 학습자가 주고받는 모든 기록은 `records/` 아래 JSON 파일이다. 웹 화면(이번 주, 기록, 길잡이, 커리큘럼)이 이 파일을 읽어 보여 주므로, 아래 모양을 벗어나면 화면에 나타나지 않는다.

## 소유

| 경로 | 쓰는 사람 | 내용 |
| --- | --- | --- |
| `records/settings.json` | 강사 | 1주차 시작일 |
| `records/learner/` | 학습자 | 확인 항목, 개념 사전, 주차별 제출·프롬프트·질문 |
| `records/instructor/` | 강사 | 주차별 피드백·세션 기록·통과·답변 |
| `homework/` | 학습자 | 과제 코드 |

**남의 폴더는 읽기만 한다.** 두 사람이 같은 파일을 고치지 않으므로 git 충돌이 나지 않는다. 고쳐야 할 것이 남의 파일에 있으면 고치지 말고 그 사람에게 전할 말로 남긴다.

주차 파일 이름은 두 자리 숫자를 쓴다: `week-01.json` … `week-12.json`. 날짜는 모두 `2026-12-06` 형식이다.

## records/settings.json (강사)

```json
{ "startDate": "2026-11-30" }
```

정해지지 않았으면 `""`. 웹은 이 값으로 오늘이 몇 주차인지 계산한다.

## records/learner/checks.json (학습자)

길잡이 화면의 단계별 확인 항목. 키는 `c{단계}-{순번}`이고 순번은 0부터다. 예를 들어 2단계의 첫 항목은 `c2-0`. 항목의 글은 `src/data/guide.js`의 `stages[].checks`에 있다.

```json
{ "c0-0": true, "c0-1": true }
```

학습자가 AI에게 그 항목을 자기 말로 설명해 냈을 때만 `true`로 한다.

## records/learner/glossary.json (학습자)

개념 사전. 키는 `src/data/notes.js`의 `glossaryTerms[].id`, 값은 학습자가 쓴 문장 그대로다. AI가 다듬거나 대신 쓰지 않는다.

```json
{ "state": "바뀌면 화면이 다시 그려지는 값. jQuery에서 addClass 하던 걸 값 하나로 대신한다." }
```

## records/learner/week-NN.json (학습자)

```json
{
  "submission": {
    "url": "https://example.com/tab",
    "path": "homework/week-03-tab",
    "summary": "이번 주에 배운 것을 내 말로 두세 줄",
    "unclear": "아직 설명하지 못하는 부분",
    "submittedAt": "2026-12-06"
  },
  "prompts": [
    { "kind": "good", "text": "AI에게 보낸 말 원문", "date": "2026-12-03" },
    { "kind": "hard", "text": "AI에게 보낸 말 원문", "date": "2026-12-04" }
  ],
  "questions": [
    {
      "id": "q1",
      "goal": "하려던 것",
      "stuck": "막힌 곳",
      "aiSaid": "AI가 한 답과 그래도 안 풀린 이유",
      "date": "2026-12-04"
    }
  ]
}
```

- `submission`은 제출 전에는 없다. `url`과 `path`는 있는 것만 적는다.
- `prompts[].kind`는 `good`(잘된 요청) 또는 `hard`(헤맨 요청).
- `questions[].id`는 그 주 안에서 `q1`, `q2` 순으로 붙인다. 강사의 답이 이 id로 연결된다.

## records/instructor/week-NN.json (강사)

```json
{
  "feedback": {
    "good": "잘 설명한 것 하나",
    "retry": "다시 볼 것 하나",
    "date": "2026-12-07"
  },
  "sessionNote": "막힌 개념, 다음 주에 조정할 것",
  "passed": true,
  "passedAt": "2026-12-07",
  "answers": {
    "q1": { "text": "다음에 해 볼 것 하나", "solved": false }
  }
}
```

- `passed`는 강사가 세션에서 설명을 듣고 통과를 말했을 때만 `true`로 한다. AI가 판단해서 넣지 않는다.
- `answers`의 키는 학습자 파일의 `questions[].id`다.
