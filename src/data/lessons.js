// JS 기초 화면의 내용. 커리큘럼(curriculum.js)의 주차별 "기본기"와 짝을 맞춘다.
//
// 개념 하나의 모양:
//   id, week, title
//   before   - 퍼블리싱에서 비슷하게 하던 일(없어도 됨)
//   explain  - 설명
//   example  - 예제 코드
//   tryIt    - { text, code? } 직접 해 보기. code 는 브라우저 개발자 도구 콘솔에 붙여 넣는 코드
//   exercise - { question, hint?, answer?, answerCode? } 연습 문제
// 글(before, explain, text, question, hint, answer) 안의 백틱으로 감싼 부분은 코드 모양으로 표시된다.
// 코드(example, code, answerCode) 안에 백틱이나 ${ 가 있으면 \` 와 \${ 로 적는다.

export const lessons = [
  // ── 1주차: const/let, 화살표 함수, import/export
  {
    id: 'const-let',
    week: 1,
    title: 'const와 let',
    before: 'SCSS에서 `$main-color: #1f55c8;`처럼 값에 이름을 붙여 두던 일입니다.',
    explain:
      '값을 담아 두는 이름표입니다. `const`는 한 번 담으면 다른 값으로 바꿀 수 없고, `let`은 바꿀 수 있습니다. 기본은 `const`로 쓰고 바꿔야 할 때만 `let`을 씁니다. 옛 코드에 보이는 `var`는 쓰지 않습니다.',
    example: `const siteName = 'JWStudy';
let count = 0;

count = count + 1;   // let 은 바꿀 수 있다
siteName = 'Other';  // 오류: const 는 다시 담을 수 없다`,
    tryIt: {
      text: '브라우저에서 F12를 눌러 개발자 도구의 콘솔 탭을 열고 붙여 넣어 보세요. 빨간 오류가 나오면 성공입니다. 오류 문장을 소리 내어 읽어 보세요.',
      code: `const a = 1;
a = 2;`,
    },
    exercise: {
      question: '장바구니에 담긴 개수와 사이트 이름을 담을 이름을 하나씩 만드세요. 각각 `const`와 `let` 중 무엇을 써야 할까요?',
      hint: '값이 앞으로 바뀌는지만 생각하면 됩니다.',
      answerCode: `let cartCount = 0;          // 담을 때마다 바뀐다
const siteName = 'JWStudy'; // 바뀌지 않는다`,
    },
  },
  {
    id: 'arrow-function',
    week: 1,
    title: '화살표 함수',
    before: "jQuery의 `$('.btn').on('click', function () { ... })`에서 `function () { ... }` 부분이 함수입니다.",
    explain:
      '함수를 짧게 쓰는 문법입니다. `function` 대신 `=>`를 씁니다. 본문이 한 줄이면 중괄호와 `return`을 생략할 수 있습니다. React 코드에 나오는 함수는 대부분 이 모양입니다.',
    example: `function double(n) {
  return n * 2;
}

const double2 = (n) => n * 2;   // 위와 같다

double2(4);   // 8`,
    tryIt: {
      text: '콘솔에 붙여 넣고, 마지막 줄의 글자를 바꿔 다시 실행해 보세요.',
      code: `const hello = (name) => '안녕하세요, ' + name;
hello('퍼블리셔');`,
    },
    exercise: {
      question: '가격을 받아 부가세 10%를 더한 값을 돌려주는 화살표 함수 `withTax`를 만드세요.',
      hint: '가격에 가격의 10분의 1을 더하면 됩니다. 한 줄이면 `return`을 생략할 수 있습니다.',
      answerCode: `const withTax = (price) => price + price / 10;
withTax(10000);   // 11000`,
    },
  },
  {
    id: 'import-export',
    week: 1,
    title: 'import와 export',
    before: 'HTML에서 `<link>`와 `<script src>`로 다른 파일을 불러오던 일입니다.',
    explain:
      '파일 하나를 모듈이라고 부릅니다. 밖에 내놓을 것 앞에 `export`를 붙이고, 쓰는 쪽에서 `import`로 가져옵니다. 파일마다 대표 하나는 `export default`로 내놓고 중괄호 없이 가져옵니다. 나머지는 이름으로 내놓고 중괄호 안에 적어 가져옵니다.',
    example: `// price.js
export const withTax = (price) => price + price / 10;
export default function formatPrice(price) {
  return price.toLocaleString('ko-KR') + '원';
}

// App.jsx
import formatPrice, { withTax } from './price.js';
formatPrice(withTax(10000));   // '11,000원'`,
    tryIt: {
      text: '콘솔에서는 `import`를 쓸 수 없습니다. 대신 이 프로젝트의 `src/main.jsx`를 열어 `import` 줄이 각각 무엇을 가져오는지 찾아보세요. 1주차 시연에서 같은 내용을 단계별로 볼 수 있습니다.',
    },
    exercise: {
      question: '이 프로젝트의 `src/App.jsx` 맨 위 `import` 줄에서, `export default`로 내놓은 것을 가져온 줄과 이름으로 내놓은 것을 가져온 줄을 하나씩 찾으세요.',
      answer: '`import Guide from ...`처럼 중괄호 없이 가져온 것이 default입니다. `import { weeks } from ...`처럼 중괄호 안에 있는 것이 이름으로 내놓은 것입니다.',
    },
  },

  // ── 2주차: 구조 분해, 템플릿 문자열
  {
    id: 'destructuring',
    week: 2,
    title: '구조 분해',
    before: '카드 데이터에서 제목, 가격, 배지를 하나씩 꺼내 마크업 자리에 넣던 일입니다.',
    explain:
      '객체나 배열에서 필요한 값만 이름으로 꺼내는 문법입니다. React에서 props를 받을 때 거의 항상 씁니다. 함수 첫 줄의 `({ title, price })`가 이것입니다.',
    example: `const card = { title: '봄 신상', price: 39000, badge: 'NEW' };

const title = card.title;        // 예전 방식
const { price, badge } = card;   // 구조 분해: 두 개를 한 번에 꺼낸다

// props 를 받을 때
const Card = ({ title, price }) => title + ' ' + price + '원';`,
    tryIt: {
      text: '배열도 같은 방법으로 꺼낼 수 있습니다. 배열은 이름 대신 순서로 꺼냅니다.',
      code: `const [first, second] = ['홈', '소개', '문의'];
first;    // '홈'
second;   // '소개'`,
    },
    exercise: {
      question: "`const user = { name: '민지', job: '퍼블리셔', years: 6 };`에서 `job`과 `years`만 구조 분해로 꺼내세요.",
      answerCode: `const { job, years } = user;`,
    },
  },
  {
    id: 'template-literal',
    week: 2,
    title: '템플릿 문자열',
    before: "문자열을 더해서 마크업 조각을 만들던 일입니다. `'<li>' + name + '</li>'`",
    explain:
      '따옴표 대신 백틱(키보드 숫자 1 왼쪽의 기호)으로 감싸고, 값을 넣을 자리에 달러 기호와 중괄호를 씁니다. 더하기 기호 없이 값을 끼워 넣을 수 있고, 줄바꿈도 그대로 들어갑니다.',
    example: `const name = '봄 신상';
const price = 39000;

const old = '<li>' + name + ' - ' + price + '원</li>';
const now = \`<li>\${name} - \${price}원</li>\`;   // 결과는 같다`,
    tryIt: {
      text: '콘솔에 붙여 넣고 숫자를 바꿔 보세요.',
      code: `const years = 6;
\`\${years}년차 퍼블리셔\`;`,
    },
    exercise: {
      question: "`count`가 3일 때 '장바구니에 3개 담겼습니다'라는 글자를 템플릿 문자열로 만드세요.",
      answerCode: `const count = 3;
\`장바구니에 \${count}개 담겼습니다\`;`,
    },
  },

  // ── 3주차: 함수를 값으로 넘기기
  {
    id: 'function-as-value',
    week: 3,
    title: '함수를 값으로 넘기기',
    before: "`$('.btn').on('click', handler)`처럼 함수를 건네던 일입니다. 지금 실행하지 않고 \"이따가 눌리면 실행해 줘\"라고 맡기는 것입니다.",
    explain:
      '함수도 숫자나 글자처럼 이름에 담고 다른 함수에 넘길 수 있습니다. 넘길 때는 괄호를 붙이지 않습니다. `onClick={handleClick}`은 함수를 건네는 것이고, `onClick={handleClick()}`은 지금 바로 실행한 결과를 건네는 것이라 전혀 다릅니다.',
    example: `const sayHi = () => console.log('안녕하세요');

setTimeout(sayHi, 1000);     // 1초 뒤에 실행해 줘
setTimeout(sayHi(), 1000);   // 지금 바로 실행되고, 결과(undefined)를 넘긴다

// React
<button onClick={handleClick}>저장</button>`,
    tryIt: {
      text: '붙여 넣고 2초를 기다려 보세요. 둘째 줄에 괄호를 붙이면 어떻게 되는지도 해 보세요.',
      code: `const later = () => console.log('2초 지났습니다');
setTimeout(later, 2000);`,
    },
    exercise: {
      question: "아래 버튼은 화면이 그려지자마자 알림이 뜨고, 정작 눌러도 아무 일이 없습니다. 왜일까요? `<button onClick={alert('저장')}>저장</button>`",
      hint: '괄호가 붙어 있으면 그 함수는 언제 실행될까요?',
      answer: "괄호 때문에 화면을 그리는 순간 `alert`가 실행됩니다. `onClick={() => alert('저장')}`처럼 함수로 감싸서 넘겨야 누를 때 실행됩니다.",
    },
  },

  // ── 4주차: 논리 연산자, 삼항 연산자
  {
    id: 'logical-operators',
    week: 4,
    title: '논리 연산자 &&와 ||',
    before: '조건에 따라 `.show()`와 `.hide()`를 부르던 일입니다.',
    explain:
      '`A && B`는 A가 참일 때만 B를 돌려줍니다. React에서는 "조건이 맞을 때만 보여 주기"에 씁니다. `A || B`는 A가 비어 있으면 B를 돌려줍니다. 기본값을 줄 때 씁니다. 주의할 점이 하나 있습니다. 개수가 0일 때 `count && <Badge />`는 화면에 0을 그립니다. 숫자는 `count > 0 &&`처럼 참·거짓으로 바꿔서 씁니다.',
    example: `const isNew = true;
isNew && 'NEW';     // 'NEW'
false && 'NEW';     // false: 아무것도 그리지 않는다

const nickname = '';
nickname || '손님';  // '손님'

// React
{isNew && <span className="badge">NEW</span>}`,
    tryIt: {
      text: '두 줄의 결과를 비교해 보세요. 0이 그대로 나오는 것이 함정입니다.',
      code: `0 && '있음';
3 && '있음';`,
    },
    exercise: {
      question: '할인율 `discount`가 있을 때만 "할인 중"을 보여 주는 JSX를 쓰세요. 할인율은 0일 수 있습니다.',
      hint: '0일 때 화면에 0이 찍히지 않게 하려면?',
      answerCode: `{discount > 0 && <span>할인 중</span>}`,
    },
  },
  {
    id: 'ternary',
    week: 4,
    title: '삼항 연산자',
    before: '`if`/`else`로 버튼 글자나 클래스를 바꾸던 일입니다.',
    explain:
      '`조건 ? 참일 때 : 거짓일 때` 모양으로 둘 중 하나를 고릅니다. 짧은 `if`/`else`입니다. JSX 안에는 `if`를 쓸 수 없어서 이것을 씁니다. 셋 이상으로 갈라지면 겹쳐 쓰지 말고 `&&`를 여러 줄 쓰거나 위에서 미리 계산합니다.',
    example: `const stock = 0;
const label = stock > 0 ? '구매하기' : '품절';

// React
<button disabled={stock === 0}>
  {stock > 0 ? '구매하기' : '품절'}
</button>`,
    tryIt: {
      text: '지금 시각에 따라 결과가 달라집니다.',
      code: `const hour = new Date().getHours();
hour < 12 ? '오전' : '오후';`,
    },
    exercise: {
      question: '`isOpen`이 참이면 "닫기", 거짓이면 "열기"를 보여 주는 버튼 글자를 삼항 연산자로 쓰세요.',
      answerCode: `<button>{isOpen ? '닫기' : '열기'}</button>`,
    },
  },

  // ── 5주차: 배열 map·filter, 전개 연산자
  {
    id: 'map-filter',
    week: 5,
    title: '배열 map과 filter',
    before: '같은 `<li>`를 복사해 붙여 넣고 글자만 바꾸던 일입니다.',
    explain:
      '`map`은 배열의 항목마다 함수를 실행해 같은 길이의 새 배열을 만듭니다. `filter`는 조건에 맞는 항목만 남긴 새 배열을 만듭니다. 둘 다 원래 배열은 그대로 둡니다. React는 `map`으로 목록을 그립니다.',
    example: `const menus = ['홈', '소개', '문의'];
menus.map((menu) => \`<li>\${menu}</li>\`);
// ['<li>홈</li>', '<li>소개</li>', '<li>문의</li>']

const prices = [12000, 39000, 8000];
prices.filter((price) => price >= 10000);   // [12000, 39000]

// React
<ul>{menus.map((menu) => <li key={menu}>{menu}</li>)}</ul>`,
    tryIt: {
      text: '숫자를 바꾸거나 `* 10`을 `+ 1`로 바꿔 보세요.',
      code: `[1, 2, 3].map((n) => n * 10);`,
    },
    exercise: {
      question: '`const scores = [72, 95, 88, 60];`에서 80점 이상만 남긴 배열을 만드세요.',
      answerCode: `scores.filter((score) => score >= 80);   // [95, 88]`,
    },
  },
  {
    id: 'spread',
    week: 5,
    title: '전개 연산자',
    before: '원본 스타일을 그대로 두고 일부만 덮어쓴 변형 클래스를 만들던 일입니다.',
    explain:
      '점 세 개(`...`)는 배열이나 객체의 내용을 그 자리에 펼칩니다. 원본을 고치지 않고 "원본 + 바뀐 부분"인 새 값을 만들 때 씁니다. 6주차 불변성의 바탕입니다.',
    example: `const base = ['홈', '소개'];
const menus = [...base, '문의'];       // ['홈', '소개', '문의']

const style = { color: 'black', size: 14 };
const big = { ...style, size: 20 };   // { color: 'black', size: 20 }`,
    tryIt: {
      text: '새 배열을 만든 뒤에도 원본 `a`가 그대로인지 확인하세요.',
      code: `const a = [1, 2];
const b = [...a, 3];
a;   // [1, 2]
b;   // [1, 2, 3]`,
    },
    exercise: {
      question: "`const user = { name: '민지', years: 6 };`에서 `years`만 7로 바꾼 새 객체를 만드세요. `user`는 바꾸지 않습니다.",
      answerCode: `const next = { ...user, years: 7 };`,
    },
  },

  // ── 6주차: 불변성, 객체·배열 복사
  {
    id: 'immutability',
    week: 6,
    title: '불변성',
    before: '원본 디자인 파일을 덮어쓰지 않고 "사본_수정"으로 저장하던 일입니다.',
    explain:
      'React는 state가 "새것으로 바뀌었는지"를 보고 화면을 다시 그립니다. 배열에 `push`하거나 객체 속성을 직접 고치면 상자는 그대로라서 React가 바뀐 줄 모릅니다. 그래서 state는 항상 새 배열, 새 객체를 만들어 넣습니다.',
    example: `// 화면이 안 바뀐다
todos.push(newTodo);
setTodos(todos);

// 화면이 바뀐다
setTodos([...todos, newTodo]);`,
    tryIt: {
      text: '`b`에 넣었는데 `a`도 바뀝니다. 둘이 같은 상자를 가리키기 때문입니다.',
      code: `const a = [1];
const b = a;
b.push(2);
a;   // [1, 2]`,
    },
    exercise: {
      question: '할 일 목록 `todos`에서 `id`가 3인 항목을 지운 새 배열을 state에 넣으세요.',
      hint: '지우기는 "그것만 빼고 남기기"입니다. 남기기를 하는 배열 함수는?',
      answerCode: `setTodos(todos.filter((todo) => todo.id !== 3));`,
    },
  },
  {
    id: 'copy-nested',
    week: 6,
    title: '객체·배열 복사',
    before: '폴더를 복사해도 안에 든 바로가기는 여전히 같은 원본을 가리키던 일과 비슷합니다.',
    explain:
      '전개 연산자로 복사하면 바깥 한 겹만 새로 생깁니다. 안쪽 객체는 원본과 같은 것을 가리킵니다. 배열 안의 항목 하나를 바꿀 때는 `map`으로 그 항목만 새 객체로 바꾸고, 나머지는 그대로 돌려줍니다.',
    example: `const todos = [
  { id: 1, text: '시안 확인', done: false },
  { id: 2, text: '마크업', done: false },
];

// id 가 2 인 항목만 done 을 뒤집은 새 배열
const next = todos.map((todo) =>
  todo.id === 2 ? { ...todo, done: !todo.done } : todo,
);`,
    tryIt: {
      text: '바깥만 복사했기 때문에 안쪽을 고치면 원본도 바뀝니다.',
      code: `const box = { size: { w: 10 } };
const copy = { ...box };
copy.size.w = 99;
box.size.w;   // 99`,
    },
    exercise: {
      question: "위 예제의 `todos`에서 `id`가 1인 항목의 `text`를 '시안 수정'으로 바꾼 새 배열을 만드세요.",
      answerCode: `const next = todos.map((todo) =>
  todo.id === 1 ? { ...todo, text: '시안 수정' } : todo,
);`,
    },
  },

  // ── 7주차: Promise, async/await, fetch
  {
    id: 'promise',
    week: 7,
    title: 'Promise',
    before: '이미지가 다 불러와지면 실행하던 `onload` 함수와 비슷합니다.',
    explain:
      '"나중에 결과가 나오는 일"을 담은 약속 상자입니다. 서버 요청처럼 시간이 걸리는 일은 결과 대신 Promise를 먼저 돌려줍니다. 결과가 나오면 `then`에 넘긴 함수가, 실패하면 `catch`에 넘긴 함수가 실행됩니다.',
    example: `const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

wait(1000).then(() => console.log('1초 지났습니다'));
console.log('이 줄이 먼저 찍힙니다');`,
    tryIt: {
      text: '예제를 그대로 콘솔에 붙여 넣고 찍히는 순서를 보세요.',
      code: `const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
wait(1000).then(() => console.log('1초 지났습니다'));
console.log('이 줄이 먼저 찍힙니다');`,
    },
    exercise: {
      question: '예제에서 두 문장 중 어느 것이 먼저 찍힐까요? 왜일까요?',
      answer: '"이 줄이 먼저 찍힙니다"가 먼저입니다. `wait`는 기다리지 않고 Promise를 바로 돌려주고, 1초 뒤에 `then`의 함수가 실행됩니다.',
    },
  },
  {
    id: 'async-await',
    week: 7,
    title: 'async / await',
    before: '애니메이션이 끝나면 다음 애니메이션을 하도록 함수 안에 함수를 넣던 일을, 한 줄씩 순서대로 쓰게 해 줍니다.',
    explain:
      'Promise를 위에서 아래로 읽히게 쓰는 문법입니다. 함수 앞에 `async`를 붙이고, 기다릴 곳에 `await`를 붙입니다. `await`는 `async` 함수 안에서만 쓸 수 있습니다. 기다리는 동안에도 화면은 멈추지 않습니다.',
    example: `const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  console.log('시작');
  await wait(1000);
  console.log('1초 뒤');
  await wait(1000);
  console.log('2초 뒤');
}
run();`,
    tryIt: {
      text: '예제를 콘솔에 붙여 넣고 세 줄이 1초 간격으로 찍히는지 보세요.',
    },
    exercise: {
      question: '`run` 안의 두 번째 `await`를 지우면 찍히는 순서와 시간이 어떻게 바뀔까요?',
      answer: '"1초 뒤"와 "2초 뒤"가 거의 동시에 찍힙니다. 기다리지 않으니 두 번째 `wait(1000)`은 시작만 하고 바로 다음 줄로 넘어갑니다.',
    },
  },
  {
    id: 'fetch',
    week: 7,
    title: 'fetch',
    before: '`$.ajax({ url, success })`로 서버에 요청하던 일입니다.',
    explain:
      '서버에 요청을 보내는 브라우저 기본 함수입니다. Promise를 돌려주고, 응답이 오면 `json()`으로 본문을 꺼냅니다. `json()`도 Promise라서 `await`를 두 번 씁니다.',
    example: `async function loadUser() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const user = await response.json();
  console.log(user.name);
}
loadUser();`,
    tryIt: {
      text: '연습용 공개 서버에 실제로 요청합니다. 콘솔에 붙여 넣은 뒤, 개발자 도구의 네트워크 탭에서 `users/1` 요청을 찾아 응답을 열어 보세요.',
      code: `const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
await response.json();`,
    },
    exercise: {
      question: "`$.ajax({ url: '/api/items', success: (items) => render(items) });`를 `fetch`와 `async`/`await`로 바꿔 쓰세요.",
      answerCode: `async function loadItems() {
  const response = await fetch('/api/items');
  const items = await response.json();
  render(items);
}`,
    },
  },

  // ── 8주차: try/catch
  {
    id: 'try-catch',
    week: 8,
    title: 'try / catch',
    before: '`$.ajax`의 `error:` 함수로 실패를 처리하던 일입니다.',
    explain:
      '실패할 수 있는 코드를 `try`에 넣고, 실패하면 `catch`가 받습니다. `finally`는 성공하든 실패하든 마지막에 실행됩니다. 주의할 점이 있습니다. `fetch`는 서버가 404나 500을 돌려줘도 실패로 치지 않습니다. `response.ok`를 직접 확인해서 실패로 바꿔 줘야 합니다.',
    example: `async function loadUser() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/999999');
    if (!response.ok) {
      throw new Error(\`서버 응답 \${response.status}\`);
    }
    return await response.json();
  } catch (error) {
    console.log('불러오지 못했습니다:', error.message);
    return null;
  }
}
loadUser();`,
    tryIt: {
      text: '예제를 콘솔에 붙여 넣으세요. 없는 사용자를 요청했으므로 "서버 응답 404"가 찍힙니다.',
    },
    exercise: {
      question: '예제에서 `if (!response.ok)`로 시작하는 세 줄을 지우면 무엇이 달라질까요?',
      answer: '404여도 실패로 치지 않으므로 `catch`로 가지 않고, 빈 객체 `{}`가 그대로 돌아옵니다. 화면에는 "불러오지 못했습니다" 대신 빈 내용이 나옵니다.',
    },
  },

  // ── 9주차: 주소와 매개변수
  {
    id: 'url-params',
    week: 9,
    title: '주소와 매개변수',
    before: '상품 상세 페이지를 `detail.html?id=12`처럼 만들던 일입니다.',
    explain:
      '주소는 경로(`/posts/12`)와 물음표 뒤의 매개변수(`?sort=new`)로 값을 실어 나릅니다. 브라우저의 `URL`로 이 값들을 꺼낼 수 있습니다. React Router는 `/posts/:id`처럼 경로 안의 값을 `useParams`로 꺼내 줍니다.',
    example: `const url = new URL('https://shop.example.com/posts/12?sort=new&page=2');

url.pathname;                            // '/posts/12'
url.searchParams.get('sort');            // 'new'
Number(url.searchParams.get('page'));    // 2`,
    tryIt: {
      text: '지금 보고 있는 이 페이지의 주소를 나눠 보세요. 이 사이트는 `#` 뒤의 글자로 화면을 고릅니다.',
      code: `const here = new URL(location.href);
here.pathname;
here.hash;`,
    },
    exercise: {
      question: '`https://example.com/products/35?color=red`에서 상품 번호 35와 색 red를 꺼내는 코드를 쓰세요.',
      hint: '경로는 `/`로 잘라서(`split`) 순서로 꺼낼 수 있습니다.',
      answerCode: `const url = new URL('https://example.com/products/35?color=red');
const id = url.pathname.split('/')[2];         // '35'
const color = url.searchParams.get('color');   // 'red'`,
    },
  },

  // ── 10주차: 타입 표기, 인터페이스
  {
    id: 'type-annotation',
    week: 10,
    title: '타입 표기',
    before: '디자인 가이드에 "버튼 높이는 숫자(px), 색은 토큰 이름만"처럼 넣을 수 있는 값을 정해 두던 일입니다.',
    explain:
      '타입스크립트는 값의 종류(타입)를 적어 두는 자바스크립트입니다. 이름 뒤에 콜론과 타입을 적습니다. 실행하기 전에 편집기가 잘못 넣은 값을 빨간 줄로 알려 줍니다. 파일 확장자는 `.ts`, `.tsx`입니다.',
    example: `let count: number = 0;
const name: string = '민지';
const isOpen: boolean = false;

function withTax(price: number): number {
  return price + price / 10;
}

withTax('10000');   // 빨간 줄: 글자(string)는 숫자(number) 자리에 넣을 수 없다`,
    tryIt: {
      text: '타입스크립트는 콘솔에서 실행할 수 없습니다. 10주차에 프로젝트를 옮기면서 편집기에서 빨간 줄을 직접 확인합니다.',
    },
    exercise: {
      question: "`const greeting = '안녕하세요';`와 `let total = 0;`에 타입을 붙여 쓰세요.",
      answerCode: `const greeting: string = '안녕하세요';
let total: number = 0;`,
    },
  },
  {
    id: 'interface',
    week: 10,
    title: '인터페이스',
    before: '컴포넌트 가이드에 "카드에는 제목(글자)과 가격(숫자)이 들어간다"고 적어 두던 일입니다.',
    explain:
      '객체의 모양, 곧 어떤 속성이 어떤 타입인지에 이름을 붙입니다. React에서는 props의 모양을 정할 때 씁니다. 빠뜨린 props나 잘못된 타입을 편집기가 바로 알려 줍니다.',
    example: `interface CardProps {
  title: string;
  price: number;
}

function Card({ title, price }: CardProps) {
  return <p>{title} {price}원</p>;
}

<Card title="봄 신상" />   // 빨간 줄: price 가 빠졌다`,
    tryIt: {
      text: '10주차 과제에서 컴포넌트 세 개의 props에 직접 인터페이스를 붙여 봅니다.',
    },
    exercise: {
      question: "`{ id: 1, text: '시안 확인', done: false }` 모양의 할 일에 `Todo` 인터페이스를 만드세요.",
      answerCode: `interface Todo {
  id: number;
  text: string;
  done: boolean;
}`,
    },
  },

  // ── 11주차: 유니언 타입, 선택 속성
  {
    id: 'union-type',
    week: 11,
    title: '유니언 타입',
    before: '디자인 시스템에서 버튼 변형을 primary, secondary, ghost 세 가지로만 정해 두던 일입니다.',
    explain:
      '"이것 아니면 저것"을 세로 막대(`|`)로 적습니다. 정해진 몇 가지 글자만 받게 할 때 특히 유용합니다. 오타를 내면 편집기가 바로 알려 줍니다.',
    example: `type Status = 'loading' | 'error' | 'done';

let status: Status = 'loading';
status = 'done';     // 괜찮다
status = 'finish';   // 빨간 줄: 정해진 세 가지가 아니다`,
    tryIt: {
      text: '8주차 시연의 로딩·실패·완료 상태를 이 타입으로 바꿔 보면 어떻게 될지 생각해 보세요.',
    },
    exercise: {
      question: '4주차 시연의 재고 상태를 "있음", "곧 품절", "품절" 세 가지만 받는 타입으로 만드세요.',
      answerCode: `type StockState = '있음' | '곧 품절' | '품절';`,
    },
  },
  {
    id: 'optional-property',
    week: 11,
    title: '선택 속성',
    before: '카드에 배지는 있을 때만 붙이던 일입니다.',
    explain:
      '속성 이름 뒤에 물음표를 붙이면 "있어도 되고 없어도 되는" 속성이 됩니다. 쓰는 쪽에서는 값이 없을(`undefined`) 수 있다는 것을 생각해서 `&&` 같은 조건으로 다룹니다.',
    example: `interface CardProps {
  title: string;
  badge?: string;   // 없어도 된다
}

function Card({ title, badge }: CardProps) {
  return (
    <div>
      {badge && <span>{badge}</span>}
      {title}
    </div>
  );
}

<Card title="봄 신상" />              // 괜찮다
<Card title="봄 신상" badge="NEW" />  // 괜찮다`,
    tryIt: {
      text: '11주차 마무리 과제를 기획할 때, 화면에 "있을 때만 보이는 것"을 찾아 선택 속성으로 적어 보세요.',
    },
    exercise: {
      question: '`Todo`에 마감일 `dueDate`(글자)를 넣되, 없어도 되게 하세요.',
      answerCode: `interface Todo {
  id: number;
  text: string;
  done: boolean;
  dueDate?: string;
}`,
    },
  },
];
