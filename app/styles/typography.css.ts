// Burrow 디자인 시스템 tokens.json 의 type 에서 생성했다.
// 제목(display·heading·pageTitle)은 800 굵기 + 좁은 자간. 앱의 기본 글자는 text.body (15px).
// micro(11px)보다 작은 글자는 쓰지 않는다.
import { style } from '@vanilla-extract/css';

export const fontSans =
  'Pretendard, -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", system-ui, sans-serif';

export const text = {
  /** 랜딩 히어로 제목. 화면에 하나. 예: 팀의 대화, 업무, 사람을 한 곳에서. */
  display: style({
    fontFamily: fontSans,
    fontSize: '56px',
    lineHeight: 1.18,
    fontWeight: 800,
    letterSpacing: '-0.03em',
  }),
  /** 로그인·회원가입 브랜드 패널 제목. 예: 다시 오신 걸 환영해요. */
  heading1: style({
    fontFamily: fontSans,
    fontSize: '40px',
    lineHeight: 1.3,
    fontWeight: 800,
    letterSpacing: '-0.02em',
  }),
  /** 섹션 제목, 폼 제목. 예: 팀 협업에 필요한 세 가지 */
  heading2: style({
    fontFamily: fontSans,
    fontSize: '32px',
    lineHeight: 1.3,
    fontWeight: 800,
    letterSpacing: '-0.02em',
  }),
  /** 앱 화면 상단 팀 이름. 예: 프론트엔드팀 */
  pageTitle: style({
    fontFamily: fontSans,
    fontSize: '26px',
    lineHeight: 1.3,
    fontWeight: 800,
    letterSpacing: '-0.02em',
  }),
  /** 카드 제목. 예: 실시간 그룹 · 개인 채팅 */
  title: style({ fontFamily: fontSans, fontSize: '22px', lineHeight: 1.4, fontWeight: 700 }),
  /** 게시글 제목, 채널 이름, 요약 카드 값. 예: 이번 스프린트 코드 커밋 마감 안내 */
  subtitle: style({ fontFamily: fontSans, fontSize: '18px', lineHeight: 1.45, fontWeight: 700 }),
  /** 랜딩과 로그인의 소개 문장. 예: 팀원들이 남긴 메시지와 오늘의 업무가 기다리고 있어요. */
  bodyLg: style({ fontFamily: fontSans, fontSize: '17px', lineHeight: 1.7, fontWeight: 400 }),
  /** 말풍선, 게시글 본문, 입력값. 앱의 기본 글자. 예: 로그인 페이지 PR 올렸어요! 리뷰 부탁드려요. */
  body: style({ fontFamily: fontSans, fontSize: '15px', lineHeight: 1.6, fontWeight: 400 }),
  /** 입력창 이름표, 팀원 이름, 표 머리. 예: 비밀번호 */
  label: style({ fontFamily: fontSans, fontSize: '14px', lineHeight: 1.5, fontWeight: 600 }),
  /** 시간, 메타 정보, 안내 문구. 예: 오전 10:12 · 읽음 3 */
  caption: style({ fontFamily: fontSans, fontSize: '13px', lineHeight: 1.5, fontWeight: 400 }),
  /** 사이드 레일 메뉴 글자, 배지 숫자. 이 크기 이하로는 쓰지 않아요. 예: 채팅 */
  micro: style({ fontFamily: fontSans, fontSize: '11px', lineHeight: 1.3, fontWeight: 600 }),
};
