// 화면 너비 경계. CSS(@media)와 JS(matchMedia)가 같은 값을 쓰도록 한 곳에 둔다.
// *.css.ts 가 아닌 평범한 모듈이라 컴포넌트·훅·스타일 어디서든 가져다 쓸 수 있다.

/** 이보다 좁으면 레일이 하단 탭 바가 되고, 사이드바는 본문 위에 덮이는 목록이 된다 */
export const mobileQuery = '(max-width: 899px)';
export const mobile = `screen and ${mobileQuery}`;

/** 하단 탭 바 높이 (iPhone 홈 표시줄 영역은 별도로 더한다) */
export const bottomNavHeight = '64px';
export const safeBottom = 'env(safe-area-inset-bottom, 0px)';
