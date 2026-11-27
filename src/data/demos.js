// 시연 화면의 내용. 주차마다 시연 하나를 단계별로 재생한다.
// 각 시연의 마지막 단계는 src/demos/ 의 실제 파일을 그대로 보여 준다(?raw).
// 그래서 화면에 보이는 완성 코드와 아래 "결과"에서 동작하는 코드는 항상 같다.
//
// 단계(step) 모양: { file, tag?, code, highlight, note }
//   file      - 코드 위에 표시할 파일 이름
//   tag       - "jQuery", "틀린 예"처럼 그 단계의 성격을 알리는 짧은 표시(없어도 됨)
//   highlight - 강조할 줄 번호(1부터)
//   note      - 그 단계의 설명. 백틱으로 감싼 부분은 코드 모양으로 표시된다
// code 안에 백틱이나 ${ 가 있으면 \` 와 \${ 로 적는다.

import DarkModeToggle from '../demos/DarkModeToggle.jsx';
import darkModeToggleSource from '../demos/DarkModeToggle.jsx?raw';
import fakeServerSource from '../demos/fakeServer.js?raw';
import OrderLookup from '../demos/OrderLookup.jsx';
import orderLookupSource from '../demos/OrderLookup.jsx?raw';
import OrderStatus from '../demos/OrderStatus.jsx';
import orderStatusSource from '../demos/OrderStatus.jsx?raw';
import PriceDemo from '../demos/PriceDemo.jsx';
import priceDemoSource from '../demos/PriceDemo.jsx?raw';
import priceSource from '../demos/price.js?raw';
import ProfileCards from '../demos/ProfileCards.jsx';
import profileCardsSource from '../demos/ProfileCards.jsx?raw';
import ScheduleList from '../demos/ScheduleList.jsx';
import scheduleListSource from '../demos/ScheduleList.jsx?raw';
import StockBadge from '../demos/StockBadge.jsx';
import stockBadgeSource from '../demos/StockBadge.jsx?raw';
import TodoList from '../demos/TodoList.jsx';
import todoListSource from '../demos/TodoList.jsx?raw';

/**
 * 실제 파일 글을 화면에 보여 줄 모양으로 다듬는다.
 * 윈도우 PC에서 git 이 줄바꿈을 \r\n 으로 바꿔 내려받아도 줄 번호가 어긋나지 않게 \n 으로 맞추고,
 * 파일 끝의 줄바꿈을 떼어 마지막에 빈 줄이 보이지 않게 한다.
 */
const trim = (source) => source.replace(/\r\n/g, '\n').replace(/\s+$/, '');

export const demos = [
  {
    id: 'price-module',
    week: 1,
    title: '가격 표시를 모듈로 나누기',
    goal: '한 파일에 몰려 있던 함수를 다른 파일로 옮기고 `import`로 가져옵니다. 1주차 JS 기초의 화살표 함수와 `import`/`export`를 실제 코드에서 봅니다.',
    files: ['src/demos/price.js', 'src/demos/PriceDemo.jsx'],
    Result: PriceDemo,
    steps: [
      {
        file: 'PriceDemo.jsx',
        tag: '나누기 전',
        code: `const withTax = (price) => price + price / 10;

function formatPrice(price) {
  return \`\${price.toLocaleString('ko-KR')}원\`;
}

export default function PriceDemo() {
  return (
    <ul className="demo-list">
      <li>린넨 셔츠 {formatPrice(withTax(39000))}</li>
    </ul>
  );
}`,
        highlight: [1, 3, 4, 5],
        note: '가격 계산과 표시 함수가 화면 파일 안에 함께 있습니다. 다른 화면에서도 가격을 보여 주려면 같은 함수를 또 써야 합니다.',
      },
      {
        file: 'price.js',
        tag: '새 파일',
        code: `export const withTax = (price) => price + price / 10;

export default function formatPrice(price) {
  return \`\${price.toLocaleString('ko-KR')}원\`;
}`,
        highlight: [1, 3],
        note: '두 함수를 `price.js`로 옮기고 앞에 `export`를 붙였습니다. 파일마다 대표 하나는 `export default`로, 나머지는 이름으로 내놓습니다.',
      },
      {
        file: 'PriceDemo.jsx',
        code: `import formatPrice, { withTax } from './price.js';

export default function PriceDemo() {
  return (
    <ul className="demo-list">
      <li>린넨 셔츠 {formatPrice(withTax(39000))}</li>
      <li>코튼 양말 {formatPrice(withTax(8000))}</li>
      <li>캔버스 가방 {formatPrice(withTax(25000))}</li>
    </ul>
  );
}`,
        highlight: [1],
        note: '`import`로 가져옵니다. default로 내놓은 것은 중괄호 없이, 이름으로 내놓은 것은 중괄호 안에 씁니다. 이제 어느 화면에서든 같은 줄 하나로 가져다 씁니다.',
      },
      {
        file: 'src/demos/price.js',
        tag: '실제 파일',
        code: trim(priceSource),
        highlight: [6, 13],
        note: '실제 파일입니다. 함수마다 목적과 입력, 출력을 적은 주석을 붙였습니다. AI에게 코드를 받을 때도 이런 주석을 달아 달라고 하면 읽기가 쉬워집니다.',
      },
      {
        file: 'src/demos/PriceDemo.jsx',
        tag: '실제 파일',
        code: trim(priceDemoSource),
        highlight: [1],
        note: '아래 결과 화면이 이 코드입니다. 39,000원에 부가세를 더해 42,900원이 나옵니다.',
      },
    ],
    ask: [
      '`import formatPrice`에는 중괄호가 없고 `{ withTax }`에는 있는 이유는?',
      '`price.js`에서 `export`를 지우면 어떤 오류가 날까? 콘솔에서 직접 확인해 보기.',
      '가격 함수를 다른 파일로 옮겨서 좋아진 점을 하나 말해 보기.',
    ],
  },
  {
    id: 'profile-cards',
    week: 2,
    title: '복사한 카드를 컴포넌트 하나로',
    goal: '세 번 복사한 카드 마크업을 컴포넌트 하나와 props로 바꿉니다. 2주차 과제(예전 페이지를 컴포넌트로 옮기기)를 하기 전에 보는 작은 예입니다.',
    files: ['src/demos/ProfileCards.jsx'],
    Result: ProfileCards,
    steps: [
      {
        file: 'index.html',
        tag: '복사·붙여넣기',
        code: `<div class="row">
  <article class="card">
    <h4>한결</h4>
    <p>퍼블리셔 · 6년</p>
  </article>
  <article class="card">
    <h4>서윤</h4>
    <p>디자이너 · 4년</p>
  </article>
  <article class="card">
    <h4>도현</h4>
    <p>프론트엔드 · 3년</p>
  </article>
</div>`,
        highlight: [2, 6, 10],
        note: '같은 카드 마크업을 세 번 복사하고 글자만 바꿨습니다. 카드 모양을 고치려면 세 군데를 모두 고쳐야 합니다.',
      },
      {
        file: 'ProfileCards.jsx',
        tag: '컴포넌트로',
        code: `function ProfileCard() {
  return (
    <article className="demo-card">
      <h4>한결</h4>
      <p>퍼블리셔 · 6년</p>
    </article>
  );
}`,
        highlight: [1, 3],
        note: '카드 한 장을 함수로 감쌌습니다. 마크업을 돌려주는 함수가 컴포넌트입니다. 이름은 대문자로 시작하고, `class`는 `className`으로 씁니다.',
      },
      {
        file: 'ProfileCards.jsx',
        tag: 'props',
        code: `function ProfileCard({ name, role, years }) {
  return (
    <article className="demo-card">
      <h4>{name}</h4>
      <p>{role} · {years}년</p>
    </article>
  );
}`,
        highlight: [1, 4, 5],
        note: '바뀌는 글자를 props로 받습니다. 첫 줄의 `{ name, role, years }`는 2주차 JS 기초의 구조 분해입니다. JSX 안에 값을 넣을 때도 중괄호를 씁니다.',
      },
      {
        file: 'src/demos/ProfileCards.jsx',
        tag: '실제 파일',
        code: trim(profileCardsSource),
        highlight: [23, 24, 25],
        note: '같은 컴포넌트를 props만 바꿔 세 번 씁니다. 숫자는 따옴표 대신 중괄호로 넘깁니다. 카드 모양을 고칠 곳은 이제 6~13번 줄 한 군데입니다.',
      },
    ],
    ask: [
      '`years={6}`을 `years="6"`으로 바꾸면 무엇이 달라질까?',
      '카드에 사진을 넣으려면 어디를 고치고, 무엇을 props로 더 받아야 할까?',
      '자기가 예전에 만든 페이지에서 이렇게 컴포넌트로 묶을 만한 곳을 하나 골라 보기.',
    ],
  },
  {
    id: 'dark-mode-toggle',
    week: 3,
    title: '다크 모드 스위치',
    goal: 'jQuery로 클래스를 붙였다 떼던 일을 state 하나로 바꿉니다. "왜 일반 변수가 아니라 state인가"를 틀린 예로 직접 봅니다.',
    files: ['src/demos/DarkModeToggle.jsx'],
    Result: DarkModeToggle,
    steps: [
      {
        file: 'script.js',
        tag: 'jQuery',
        code: `$('.toggle').on('click', function () {
  $('.preview').toggleClass('is-dark');
  $(this).attr('aria-pressed', $('.preview').hasClass('is-dark'));
});`,
        highlight: [2, 3],
        note: 'jQuery에서는 버튼을 누르면 클래스를 직접 붙였다 뗐습니다. 지금 어두운지 알려면 화면(DOM)의 클래스를 다시 들여다봐야 합니다.',
      },
      {
        file: 'DarkModeToggle.jsx',
        code: `import { useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  // ...
}`,
        highlight: [1, 4],
        note: 'React에서는 "지금 어두운가"를 값 하나로 기억합니다. `useState(false)`는 처음 값이 false인 state를 만들고, 지금 값과 값을 바꾸는 함수 두 개를 돌려줍니다.',
      },
      {
        file: 'DarkModeToggle.jsx',
        code: `import { useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  function handleClick() {
    setIsDark(!isDark);
  }

  return (
    <button type="button" onClick={handleClick}>
      어두운 화면
    </button>
  );
}`,
        highlight: [6, 7, 8, 11],
        note: '버튼을 누르면 `setIsDark`로 값을 뒤집습니다. `onClick`에는 함수를 괄호 없이 넘깁니다(3주차 JS 기초). 클래스를 고치는 코드는 어디에도 없습니다.',
      },
      {
        file: 'DarkModeToggle.jsx',
        tag: '틀린 예',
        code: `export default function DarkModeToggle() {
  let isDark = false;

  function handleClick() {
    isDark = !isDark;
    console.log(isDark);
  }

  return (
    <div className={isDark ? 'demo-preview is-dark' : 'demo-preview'}>
      <button type="button" onClick={handleClick}>어두운 화면</button>
    </div>
  );
}`,
        highlight: [2, 5, 6],
        note: '일반 변수로 바꾸면 콘솔에는 값이 바뀌어 찍히지만 화면은 그대로입니다. React는 state를 바꾸는 함수가 불렸을 때만 화면을 다시 그리기 때문입니다.',
      },
      {
        file: 'src/demos/DarkModeToggle.jsx',
        tag: '실제 파일',
        code: trim(darkModeToggleSource),
        highlight: [9, 12, 16, 17],
        note: '화면은 값을 보고 그립니다. `isDark`가 true면 `is-dark` 클래스가 붙습니다. 값만 바꾸면 React가 화면을 다시 그립니다. 16번 줄의 조건 쓰기(삼항 연산자)는 4주차에 자세히 봅니다.',
      },
    ],
    ask: [
      '틀린 예에서 콘솔에는 값이 바뀌는데 화면은 왜 그대로일까?',
      '`onClick={handleClick}`을 `onClick={handleClick()}`으로 바꾸면 어떻게 될까?',
      'jQuery 방식과 비교해 "지금 어두운가"를 어디에 기억하는지 말해 보기.',
    ],
  },
  {
    id: 'stock-badge',
    week: 4,
    title: '재고에 따라 바뀌는 배지',
    goal: '조건에 따라 보이고 숨기던 일을 `&&`와 삼항 연산자로 씁니다. 숫자 0을 조건에 그대로 쓰면 생기는 함정도 봅니다.',
    files: ['src/demos/StockBadge.jsx'],
    Result: StockBadge,
    steps: [
      {
        file: 'script.js',
        tag: 'jQuery',
        code: `function render(stock) {
  $('.stock').text(stock);
  if (stock === 0) {
    $('.badge-out').show();
    $('.buy').prop('disabled', true).text('구매할 수 없음');
  } else {
    $('.badge-out').hide();
    $('.buy').prop('disabled', false).text('구매하기');
  }
}`,
        highlight: [3, 4, 5, 6, 7, 8],
        note: 'jQuery에서는 조건마다 요소를 보이고 숨기고, 글자와 속성을 하나씩 바꿨습니다. 한 곳이라도 빠뜨리면 화면이 어긋납니다.',
      },
      {
        file: 'StockBadge.jsx',
        tag: '&&',
        code: `<p>
  린넨 셔츠 · 재고 {stock}개
  {stock === 0 && <span className="demo-badge is-out">품절</span>}
</p>`,
        highlight: [3],
        note: 'React에서는 "조건 && 그릴 것"으로 씁니다. 조건이 참일 때만 배지가 그려지고, 숨기는 코드는 따로 없습니다.',
      },
      {
        file: 'StockBadge.jsx',
        tag: '틀린 예',
        code: `<p>
  린넨 셔츠
  {stock && <span className="demo-badge">재고 있음</span>}
</p>`,
        highlight: [3],
        note: '재고가 0이면 이 코드는 화면에 숫자 0을 그립니다. `0 && ...`의 결과가 false가 아니라 0이기 때문입니다. 숫자는 `stock > 0 &&`처럼 참·거짓으로 바꿔서 씁니다.',
      },
      {
        file: 'StockBadge.jsx',
        tag: '삼항 연산자',
        code: `<button type="button" disabled={stock === 0}>
  {stock > 0 ? '구매하기' : '구매할 수 없음'}
</button>`,
        highlight: [1, 2],
        note: '둘 중 하나를 고를 때는 삼항 연산자를 씁니다. JSX 안에는 if를 쓸 수 없어서 이 모양을 씁니다. `disabled` 같은 속성 값에도 조건을 바로 넣습니다.',
      },
      {
        file: 'src/demos/StockBadge.jsx',
        tag: '실제 파일',
        code: trim(stockBadgeSource),
        highlight: [18, 19, 28],
        note: '완성된 코드입니다. 아래 결과에서 판매 버튼으로 재고를 줄여 보세요. 2개부터 "곧 품절", 0개에서 "품절"과 구매 불가로 바뀝니다.',
      },
    ],
    ask: [
      '틀린 예에서 화면에 0이 그려지는 이유는?',
      '19번 줄의 조건 두 개 중 `stock > 0`을 빼면 0개일 때 어떻게 될까?',
      '"곧 품절" 기준을 5개로 바꾸려면 어디를 고칠까?',
    ],
  },
  {
    id: 'schedule-list',
    week: 5,
    title: '일정 배열을 목록으로',
    goal: '복사해 붙이던 `<li>`를 데이터 배열과 `map`으로 바꿉니다. `key`가 왜 필요한지 봅니다.',
    files: ['src/demos/ScheduleList.jsx'],
    Result: ScheduleList,
    steps: [
      {
        file: 'index.html',
        tag: '복사·붙여넣기',
        code: `<ul>
  <li><span>12/01</span> 킥오프 회의</li>
  <li><span>12/03</span> 시안 공유</li>
  <li><span>12/08</span> 마크업 시작</li>
  <li><span>12/12</span> 중간 점검</li>
</ul>`,
        highlight: [2, 3, 4, 5],
        note: '일정이 바뀔 때마다 마크업을 고쳐야 합니다. 서버에서 받은 일정 수가 매번 다르면 미리 써 둘 수도 없습니다.',
      },
      {
        file: 'ScheduleList.jsx',
        tag: '데이터',
        code: `const schedules = [
  { id: 'kickoff', date: '12/01', title: '킥오프 회의' },
  { id: 'design', date: '12/03', title: '시안 공유' },
  { id: 'markup', date: '12/08', title: '마크업 시작' },
  { id: 'review', date: '12/12', title: '중간 점검' },
];`,
        highlight: [2, 3, 4, 5],
        note: '내용을 데이터로 떼어 냅니다. 일정 하나가 객체 하나이고, 일정 목록은 객체의 배열입니다.',
      },
      {
        file: 'ScheduleList.jsx',
        tag: 'map',
        code: `<ul className="demo-list">
  {schedules.map((item) => (
    <li>
      <span className="demo-date">{item.date}</span> {item.title}
    </li>
  ))}
</ul>`,
        highlight: [2, 3],
        note: '`map`이 항목마다 `<li>`를 하나씩 만들어 배열로 돌려주고, React는 그 배열을 차례로 그립니다. 그런데 이대로 두면 콘솔에 key 경고가 뜹니다.',
      },
      {
        file: 'ScheduleList.jsx',
        tag: 'key',
        code: `<ul className="demo-list">
  {schedules.map((item) => (
    <li key={item.id}>
      <span className="demo-date">{item.date}</span> {item.title}
    </li>
  ))}
</ul>`,
        highlight: [3],
        note: '`key`는 항목마다 겹치지 않는 이름표입니다. 순서가 바뀌거나 중간 항목이 빠져도 React가 어느 `<li>`가 어느 일정인지 알아봅니다. 배열의 순번은 순서가 바뀌면 같이 바뀌어서 이름표로 맞지 않습니다.',
      },
      {
        file: 'src/demos/ScheduleList.jsx',
        tag: '실제 파일',
        code: trim(scheduleListSource),
        highlight: [17, 18],
        note: '완성된 코드입니다. 일정을 하나 더하려면 2~7번 줄의 배열에 한 줄만 넣으면 됩니다. 마크업은 고치지 않습니다.',
      },
    ],
    ask: [
      '`key`를 빼면 콘솔에 어떤 경고가 뜨는지 직접 띄워 보고 읽기.',
      '`key={index}`가 문제가 되는 경우를 하나 들어 보기.',
      '날짜가 12/05 이후인 일정만 보여 주려면 무엇을 더 쓸까?',
    ],
  },
  {
    id: 'todo-list',
    week: 6,
    title: '할 일 더하기, 표시하기, 지우기',
    goal: '배열 state를 바꾸는 세 가지(더하기, 하나 바꾸기, 지우기)를 원본을 고치지 않는 방법으로 씁니다. 입력 칸도 state로 다룹니다.',
    files: ['src/demos/TodoList.jsx'],
    Result: TodoList,
    steps: [
      {
        file: 'TodoList.jsx',
        tag: '틀린 예',
        code: `function handleSubmit(event) {
  event.preventDefault();
  todos.push({ id: Date.now(), text, done: false });
  setTodos(todos);
}`,
        highlight: [3, 4],
        note: '배열에 `push`하고 같은 배열을 다시 넣었습니다. 내용은 늘었지만 상자가 같아서 React는 바뀐 줄 모르고 화면을 그대로 둡니다.',
      },
      {
        file: 'TodoList.jsx',
        tag: '더하기',
        code: `function handleSubmit(event) {
  event.preventDefault();
  setTodos([...todos, { id: Date.now(), text, done: false }]);
  setText('');
}`,
        highlight: [3],
        note: '기존 항목을 펼치고 새 항목을 붙인 새 배열을 넣습니다. 원본은 그대로 두고 새것을 만든다는 것이 불변성입니다.',
      },
      {
        file: 'TodoList.jsx',
        tag: '하나 바꾸기',
        code: `function toggle(id) {
  setTodos(
    todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo,
    ),
  );
}`,
        highlight: [3, 4],
        note: '하나만 바꿀 때는 `map`으로 그 항목만 새 객체로 바꾸고, 나머지는 그대로 돌려줍니다.',
      },
      {
        file: 'TodoList.jsx',
        tag: '지우기',
        code: `function remove(id) {
  setTodos(todos.filter((todo) => todo.id !== id));
}`,
        highlight: [2],
        note: '지우기는 "그것만 빼고 남기기"입니다. `filter`가 새 배열을 만들어 줍니다.',
      },
      {
        file: 'TodoList.jsx',
        tag: '입력 칸',
        code: `const [text, setText] = useState('');

<input
  value={text}
  onChange={(event) => setText(event.target.value)}
/>`,
        highlight: [1, 4, 5],
        note: '입력 칸의 글자도 state로 둡니다. 글자를 칠 때마다 state가 바뀌고, 입력 칸은 state를 그대로 보여 줍니다. 이런 입력 칸을 제어 컴포넌트라고 합니다.',
      },
      {
        file: 'src/demos/TodoList.jsx',
        tag: '실제 파일',
        code: trim(todoListSource),
        highlight: [18, 23, 27, 34],
        note: '완성된 코드입니다. 아래에서 직접 더하고, 체크하고, 지워 보세요.',
      },
    ],
    ask: [
      '틀린 예처럼 `push`하면 화면이 안 바뀌는 이유를 "상자"라는 말로 설명해 보기.',
      '`{ ...todo, done: !todo.done }`에서 `...todo`를 빼면 무엇이 사라질까?',
      '"완료한 것 모두 지우기" 버튼을 만들려면 어떤 배열 함수를 쓸까?',
    ],
  },
  {
    id: 'order-lookup',
    week: 7,
    title: '버튼을 눌러 주문 불러오기',
    goal: '`$.ajax`의 success 콜백을 Promise와 `async`/`await`로 바꿉니다. 진짜 서버 대신 1.2초 기다리는 가짜 서버를 써서 네트워크 없이도 동작합니다.',
    files: ['src/demos/fakeServer.js', 'src/demos/OrderLookup.jsx'],
    Result: OrderLookup,
    steps: [
      {
        file: 'script.js',
        tag: 'jQuery',
        code: `$('.load').on('click', function () {
  $('.message').text('불러오는 중…');
  $.ajax({
    url: '/api/orders',
    success: function (orders) {
      $('.message').text(orders.length + '건을 불러왔습니다.');
    },
  });
});`,
        highlight: [3, 5, 6],
        note: 'jQuery에서는 요청이 끝나면 실행할 함수(success)를 미리 넘겼습니다. 결과는 그 함수 안에서만 쓸 수 있습니다.',
      },
      {
        file: 'console',
        tag: 'Promise',
        code: `fetchOrders().then((orders) => {
  console.log(\`\${orders.length}건을 불러왔습니다.\`);
});
console.log('요청을 보냈습니다.');`,
        highlight: [1, 4],
        note: '`fetchOrders`는 결과 대신 Promise를 바로 돌려줍니다. 결과가 오면 `then`이 실행되므로, 콘솔에는 "요청을 보냈습니다"가 먼저 찍힙니다.',
      },
      {
        file: 'OrderLookup.jsx',
        tag: 'async / await',
        code: `async function handleClick() {
  setMessage('불러오는 중…');
  const result = await fetchOrders();
  setOrders(result);
  setMessage(\`\${result.length}건을 불러왔습니다.\`);
}`,
        highlight: [1, 3],
        note: '`async`/`await`를 쓰면 위에서 아래로 읽힙니다. `await` 줄에서 결과가 올 때까지 기다렸다가 다음 줄로 갑니다. 기다리는 동안 화면은 멈추지 않습니다.',
      },
      {
        file: 'src/demos/fakeServer.js',
        tag: '실제 파일',
        code: trim(fakeServerSource),
        highlight: [11, 23, 24, 26],
        note: '시연용 가짜 서버입니다. 1.2초 기다렸다가 정해진 주문을 돌려줍니다. 네트워크가 없어도 동작하고, 실패도 일부러 낼 수 있습니다. 8주차 시연에서도 씁니다.',
      },
      {
        file: 'src/demos/OrderLookup.jsx',
        tag: '실제 파일',
        code: trim(orderLookupSource),
        highlight: [13, 15],
        note: '완성된 코드입니다. 아래 버튼을 누르고 1.2초 동안 문구가 어떻게 바뀌는지 보세요.',
      },
    ],
    ask: [
      'Promise 단계에서 두 줄 중 어느 것이 먼저 찍히고, 왜일까?',
      '`await`를 지우면 `result`에는 무엇이 들어갈까? 콘솔에 찍어 보기.',
      '이 버튼은 실패를 처리하지 않습니다. 서버가 실패하면 화면이 어떻게 될까? (8주차로 이어집니다)',
    ],
  },
  {
    id: 'order-status',
    week: 8,
    title: '불러오기의 네 가지 화면',
    goal: '화면이 열리면 `useEffect`로 불러오고, 로딩·실패·빈 목록·정상을 나눠 보여 줍니다. 의존성 배열이 무엇을 정하는지 봅니다.',
    files: ['src/demos/fakeServer.js', 'src/demos/OrderStatus.jsx'],
    Result: OrderStatus,
    steps: [
      {
        file: 'OrderStatus.jsx',
        tag: '틀린 예',
        code: `export default function OrderStatus() {
  const [orders, setOrders] = useState([]);

  fetchOrders().then(setOrders);   // 그릴 때마다 실행된다

  return <p>{orders.length}건</p>;
}`,
        highlight: [4],
        note: '컴포넌트 본문에서 바로 요청하면 그릴 때마다 요청이 나갑니다. 결과로 state가 바뀌면 다시 그리고, 또 요청하는 일이 끝없이 반복됩니다.',
      },
      {
        file: 'OrderStatus.jsx',
        tag: 'useEffect',
        code: `useEffect(() => {
  fetchOrders().then(setOrders);
}, []);`,
        highlight: [1, 3],
        note: '`useEffect`에 넣으면 화면을 그린 뒤에 실행됩니다. 마지막의 `[]`는 의존성 배열이고, 비어 있으면 처음 한 번만 실행합니다.',
      },
      {
        file: 'OrderStatus.jsx',
        tag: '세 가지 상태',
        code: `const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

async function load() {
  try {
    const result = await fetchOrders(mode);
    setOrders(result);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}`,
        highlight: [1, 2, 5, 8, 10],
        note: '기다리는 중과 실패를 각각 state로 둡니다. `try`에서 실패하면 `catch`로 가고, `finally`는 성공하든 실패하든 마지막에 실행됩니다.',
      },
      {
        file: 'OrderStatus.jsx',
        tag: '의존성 배열',
        code: `useEffect(() => {
  load();
}, [mode]);`,
        highlight: [3],
        note: '의존성 배열에 `mode`를 넣으면 서버 응답 칸을 바꿀 때마다 다시 불러옵니다. 배열에 넣은 값이 바뀔 때만 다시 실행된다는 뜻입니다.',
      },
      {
        file: 'src/demos/OrderStatus.jsx',
        tag: '실제 파일',
        code: trim(orderStatusSource),
        highlight: [16, 31, 33, 43, 44, 45],
        note: '완성된 코드입니다. `ignore`는 응답이 오기 전에 칸을 또 바꾸면 늦게 온 옛 응답을 버리는 장치입니다. 아래에서 서버 응답을 바꿔 네 화면을 모두 확인해 보세요.',
      },
    ],
    ask: [
      '의존성 배열을 `[]`로 바꾸면 서버 응답 칸을 바꿔도 무엇이 안 될까?',
      '44~46번 줄의 조건 중 하나를 빼면 화면에 두 가지가 동시에 보이는 경우가 생긴다. 어떤 경우일까?',
      '`ignore` 없이 "정상"→"실패"를 빠르게 바꾸면 어떤 일이 생길 수 있을까?',
    ],
  },
];
