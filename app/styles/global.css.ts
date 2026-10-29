import { globalStyle } from '@vanilla-extract/css';

import { vars } from './tokens.css';
import { fontSans } from './typography.css';

// 디자인 시스템이 px 기준이라 html 의 62.5% 트릭(1rem = 10px)은 쓰지 않는다.
globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('html', {
  colorScheme: 'light',
});

// 스크롤바·폼 컨트롤 같은 브라우저 기본 UI 도 다크로 그린다.
globalStyle(':root[data-theme="dark"]', {
  colorScheme: 'dark',
});

globalStyle('body', {
  margin: 0,
  fontFamily: fontSans,
  fontSize: '15px',
  lineHeight: 1.6,
  color: vars.ink,
  background: vars.bg,
  // 한국어를 글자가 아니라 띄어쓰기 단위로 줄바꿈한다.
  wordBreak: 'keep-all',
  overflowWrap: 'anywhere',
  WebkitFontSmoothing: 'antialiased',
  // 모바일: 더블탭 확대 대기를 없애 탭이 바로 반응하게 하고, 탭할 때 뜨는 기본 회색 상자를 끈다
  touchAction: 'manipulation',
  WebkitTapHighlightColor: 'transparent',
});

// 움직임 줄이기 설정을 켠 사용자에게는 전환·애니메이션을 사실상 끈다
globalStyle('*, *::before, *::after', {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms !important',
      animationDuration: '0.01ms !important',
      animationIterationCount: '1 !important',
    },
  },
});

globalStyle('h1, h2, h3, h4, p, ul, ol, figure', {
  margin: 0,
});

globalStyle('ul, ol', {
  padding: 0,
  listStyle: 'none',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('button, input, textarea, select', {
  font: 'inherit',
  color: 'inherit',
});

globalStyle('button', {
  cursor: 'pointer',
});

globalStyle(':focus-visible', {
  outline: `2px solid ${vars.brand}`,
  outlineOffset: '2px',
});

globalStyle('img, svg', {
  display: 'block',
  maxWidth: '100%',
});
