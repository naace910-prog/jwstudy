// 빌드 결과(dist)의 스크립트와 스타일을 HTML 한 파일 안에 넣어 jwstudy.html 을 만든다.
// 서버 없이 파일을 더블클릭해 바로 열 수 있게 하기 위한 것이다.
// (브라우저는 file:// 로 연 페이지에서 바깥 모듈 스크립트 파일을 불러오지 못한다.)
import { readFileSync, writeFileSync } from 'node:fs';

const dist = new URL('../dist/', import.meta.url);
let html = readFileSync(new URL('index.html', dist), 'utf8');

// 치환 문자열 대신 함수를 쓴다: 번들 안의 $& 같은 글자가 치환 기호로 해석되지 않게 한다.
html = html.replace(/<link rel="stylesheet"[^>]*href="\.\/(assets\/[^"]+\.css)"[^>]*>/, (_, path) => {
  return `<style>${readFileSync(new URL(path, dist), 'utf8')}</style>`;
});
html = html.replace(/<script type="module"[^>]*src="\.\/(assets\/[^"]+\.js)"[^>]*><\/script>/, (_, path) => {
  // 번들 안의 "</script" 글자가 태그를 일찍 닫지 않게 막는다.
  const js = readFileSync(new URL(path, dist), 'utf8').replaceAll('</script', '<\\/script');
  return `<script type="module">${js}</script>`;
});

if (html.includes('./assets/')) {
  throw new Error('dist/index.html 에 한 파일로 넣지 못한 자원이 남아 있습니다.');
}

const out = new URL('../jwstudy.html', import.meta.url);
writeFileSync(out, html);
console.log(`jwstudy.html 생성 (${Math.round(html.length / 1024)} KB)`);
