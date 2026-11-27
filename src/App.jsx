import { useEffect, useState } from 'react';
import ProgressBar from './components/ProgressBar.jsx';
import { weeks } from './data/curriculum.js';
import { stages } from './data/guide.js';
import { glossaryTerms } from './data/notes.js';
import Curriculum from './pages/Curriculum.jsx';
import Guide from './pages/Guide.jsx';
import Notes from './pages/Notes.jsx';
import ThisWeek from './pages/ThisWeek.jsx';
import { glossary, guideChecks, passedCount } from './store/records.js';

/** 위쪽 메뉴. id 는 주소의 # 뒤에 오는 글자다. */
const VIEWS = [
  { id: 'guide', label: '길잡이' },
  { id: 'week', label: '이번 주' },
  { id: 'notes', label: '기록' },
  { id: 'curriculum', label: '커리큘럼' },
];

const totalChecks = stages.reduce((sum, stage) => sum + stage.checks.length, 0);

/** 값이 채워진 항목의 수를 센다. 공백만 있는 글은 세지 않는다. */
function countFilled(record) {
  return Object.values(record).filter((value) => (typeof value === 'string' ? value.trim() : value)).length;
}

/** 화면마다 위쪽에 보여 줄 진행 표시 */
const PROGRESS = {
  guide: { label: '확인', done: countFilled(guideChecks), total: totalChecks },
  week: { label: '통과', done: passedCount, total: weeks.length },
  notes: { label: '개념', done: countFilled(glossary), total: glossaryTerms.length },
  curriculum: { label: '통과', done: passedCount, total: weeks.length },
};

/** 주소의 # 뒤 글자로 지금 볼 화면을 정한다. 모르는 값이면 길잡이를 보여 준다. */
function viewFromHash() {
  const id = window.location.hash.slice(1);
  return VIEWS.some((view) => view.id === id) ? id : 'guide';
}

/**
 * 앱 전체. 위쪽 메뉴와 진행 표시를 그리고, 주소의 # 값에 따라 화면 하나를 보여 준다.
 * 입력: 없음
 * 출력: 위쪽 메뉴와 선택된 화면
 */
export default function App() {
  const [view, setView] = useState(viewFromHash);

  useEffect(() => {
    function handleHashChange() {
      setView(viewFromHash());
      window.scrollTo(0, 0);
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      <div className="bar">
        <div className="wrap">
          <nav className="bar-nav" aria-label="화면 선택">
            {VIEWS.map((item) => (
              <a key={item.id} href={`#${item.id}`} aria-current={item.id === view ? 'page' : undefined}>
                {item.label}
              </a>
            ))}
          </nav>
          <ProgressBar {...PROGRESS[view]} />
        </div>
      </div>

      {view === 'guide' && <Guide />}
      {view === 'week' && <ThisWeek />}
      {view === 'notes' && <Notes />}
      {view === 'curriculum' && <Curriculum />}
    </>
  );
}
