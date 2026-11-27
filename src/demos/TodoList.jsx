import { useState } from 'react';

/**
 * 할 일을 더하고, 완료로 표시하고, 지우는 목록.
 * 입력: 없음
 * 출력: 입력 칸, 추가 버튼, 할 일 목록
 */
export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: '시안 확인', done: true },
    { id: 2, text: '마크업', done: false },
  ]);
  const [text, setText] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text: text.trim(), done: false }]);
    setText('');
  }

  function toggle(id) {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  }

  function remove(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="demo-preview">
      <form className="demo-actions" onSubmit={handleSubmit}>
        <label htmlFor="demo-todo-text">할 일</label>
        <input id="demo-todo-text" value={text} onChange={(event) => setText(event.target.value)} />
        <button type="submit">추가</button>
      </form>
      <ul className="demo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" checked={todo.done} onChange={() => toggle(todo.id)} />
              <span className={todo.done ? 'is-done' : undefined}>{todo.text}</span>
            </label>
            <button type="button" onClick={() => remove(todo.id)}>
              지우기
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
