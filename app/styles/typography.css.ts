// Burrow 디자인 시스템 tokens.json 의 type 에서 생성했다.
// 글꼴은 역할별로 셋: 로고(카페24 써라운드) · 제목(G마켓 산스) · 그 밖의 모든 글자(Pretendard).
// micro(11px)보다 작은 글자는 쓰지 않는다.
import { globalFontFace, style } from '@vanilla-extract/css';

// 글꼴 파일은 public/fonts 에 있다 (출처·라이선스: public/fonts/README.md).
// 쓰는 굵기만 올린다 — 제목·레일 이니셜은 Bold, 로고는 한 굵기뿐이다.
globalFontFace('GmarketSans', {
  src: 'url("/fonts/GmarketSans-Bold.woff2") format("woff2")',
  fontWeight: 700,
  fontDisplay: 'swap',
});

globalFontFace('Cafe24Ssurround', {
  src: 'url("/fonts/Cafe24Ssurround.woff") format("woff")',
  fontWeight: 700,
  fontDisplay: 'swap',
});

export const fontSans =
  'Pretendard, -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", system-ui, sans-serif';
export const fontDisplay =
  'GmarketSans, Pretendard, -apple-system, "Apple SD Gothic Neo", sans-serif';
export const fontLogo = 'Cafe24Ssurround, GmarketSans, Pretendard, sans-serif';

/** 제목 글꼴 공통값. 크기만 화면마다 다르게 쓸 때 펼쳐 넣는다 */
export const displayFace = {
  fontFamily: fontDisplay,
  fontWeight: 700,
  letterSpacing: '-0.02em',
} as const;

export const text = {
  /** 랜딩 히어로 제목. 화면에 하나. */
  display: style({ ...displayFace, fontSize: '56px', lineHeight: 1.2 }),
  /** 로그인·회원가입 브랜드 패널 제목. 예: 다시 오신 걸 환영해요. */
  heading1: style({ ...displayFace, fontSize: '40px', lineHeight: 1.3 }),
  /** 섹션 제목, 폼 제목. 예: 맥락을 지키는 세 가지 */
  heading2: style({ ...displayFace, fontSize: '32px', lineHeight: 1.3 }),
  /** 앱 화면 상단 제목. 예: 대시보드 */
  pageTitle: style({ ...displayFace, fontSize: '26px', lineHeight: 1.3 }),
  /** 카드 제목. 예: 실시간 채팅 */
  title: style({ fontFamily: fontSans, fontSize: '22px', lineHeight: 1.4, fontWeight: 700 }),
  /** 게시글 제목, 채널 이름, 요약 카드 값. */
  subtitle: style({ fontFamily: fontSans, fontSize: '18px', lineHeight: 1.45, fontWeight: 700 }),
  /** 랜딩과 로그인의 소개 문장. */
  bodyLg: style({ fontFamily: fontSans, fontSize: '17px', lineHeight: 1.7, fontWeight: 400 }),
  /** 말풍선, 게시글 본문, 입력값. 앱의 기본 글자. */
  body: style({ fontFamily: fontSans, fontSize: '15px', lineHeight: 1.6, fontWeight: 400 }),
  /** 입력창 이름표, 멤버 이름, 표 머리. 예: 비밀번호 */
  label: style({ fontFamily: fontSans, fontSize: '14px', lineHeight: 1.5, fontWeight: 600 }),
  /** 시간, 메타 정보, 안내 문구. 예: 오전 10:12 */
  caption: style({ fontFamily: fontSans, fontSize: '13px', lineHeight: 1.5, fontWeight: 400 }),
  /** 사이드 레일 메뉴 글자, 배지 숫자. 이 크기 이하로는 쓰지 않아요. 예: 개인챗 */
  micro: style({ fontFamily: fontSans, fontSize: '11px', lineHeight: 1.3, fontWeight: 600 }),
};
