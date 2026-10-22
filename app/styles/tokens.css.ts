// Burrow 디자인 시스템 tokens.json 에서 생성했다. 값을 바꿀 때는 디자인 시스템을 먼저 고친다.
//
// 이름 규칙: 디자인 시스템 이름의 하이픈만 뺀 camelCase (bg-raised → vars.bgRaised).
// CSS 변수 이름은 디자인 시스템 이름 그대로 (--bg-raised) 라서 DevTools 에서도 바로 찾을 수 있다.
//
// 테마 선택자는 고정 이름(data-theme 속성)이다. index.html 의 인라인 스크립트가
// React 보다 먼저 <html data-theme="…"> 를 붙여야 하는데, 정적 HTML 은 vanilla-extract 가
// 만드는 해시 클래스명을 알 수 없기 때문이다.
import { createGlobalTheme, createGlobalThemeContract } from '@vanilla-extract/css';

/** 테마(라이트/다크)마다 값이 바뀌는 색 */
const themedColor = createGlobalThemeContract({
  /** 앱 본문 바탕. 순백(#FFFFFF)은 눈이 부셔서 라벤더 기가 살짝 도는 오프화이트를 써요. */
  bg: 'bg',
  /** 랜딩·로그인·회원가입처럼 깔끔하게 하얀 느낌이 필요한 페이지 바탕. */
  bgBright: 'bg-bright',
  /** 맨 왼쪽 사이드 레일(로고·나·프로젝트 타일) 바탕. 화면에서 가장 어두운 면이라 구조의 기준선이 돼요. 테두리는 #CBC3E3. */
  bgSubtle: 'bg-subtle',
  /** 카드, 입력창, 표, 말풍선(상대방) 바탕. 순백(#FFFFFF) 대신 써요. */
  bgRaised: 'bg-raised',
  /** 제목과 본문 기본 글자색. bg, bg-raised 위에서 사용. */
  ink: 'ink',
  /** 게시글 본문, 표 셀 등 두 번째 단계 글자. */
  inkSecondary: 'ink-secondary',
  /** 보조 설명, 상태 문구(온라인 · 디자이너), 메타 정보. bg-raised 위 4.5:1 이상. */
  inkMuted: 'ink-muted',
  /** 시간, 날짜, placeholder 같은 가장 약한 글자. 12px 이상에서만. */
  inkSubtle: 'ink-subtle',
  /** 카드 테두리, 구분선, 헤더 하단선. */
  line: 'line',
  /** 입력창과 보조 버튼 테두리. */
  lineStrong: 'line-strong',
  /** 브랜드 보라. 넓은 면적에는 쓰지 않아요. 내 말풍선, 내 일정 막대, 로고 타일, 보조 주요 버튼(새 글 작성), 선택된 프로젝트 테두리처럼 작은 곳에만. 위 글자는 on-brand. */
  brand: 'brand',
  /** 링크, 활성 탭 글자, 레일의 선택된 메뉴 글자처럼 보라색 글자. */
  brandText: 'brand-text',
  /** brand-soft 위 글자(역할 티켓, 공지 칩). */
  brandStrong: 'brand-strong',
  /** 채널·팀원 목록 열 배경, 아이콘 타일, 역할 티켓 칩 바탕. */
  brandSoft: 'brand-soft',
  /** brand-soft 위 테두리, 선택 표시, 연한 장식 면. */
  brandTint: 'brand-tint',
  /** brand와 그라데이션 위 글자, 아이콘. */
  onBrand: 'on-brand',
  /** 브랜드 그라데이션 시작 색. gradient-start → gradient-end, 135°. 장식에만 써요: 카드 테두리, 둥근 장식 도형. 그 위에 글자를 올리지 않아요. */
  gradientStart: 'gradient-start',
  /** 브랜드 그라데이션 끝 색. */
  gradientEnd: 'gradient-end',
  /** 글자가 올라가는 브랜드 배경(랜딩 히어로, 로그인·회원가입 패널)의 시작 색. tint-start → tint-end, 90°. 위 글자는 ink. */
  tintStart: 'tint-start',
  /** 브랜드 배경 그라데이션의 끝 색. */
  tintEnd: 'tint-end',
  /** 포커스된 입력창 바깥 4px 링. 테두리는 brand. */
  focusRing: 'focus-ring',
  /** 토끼 로고의 오렌지. 화면당 하나뿐인 핵심 행동(시작하기, 로그인, 보내기, 업로드)과 알림 숫자 배지. */
  accent: 'accent',
  /** accent 위 글자. 흰 글자는 대비가 부족해 쓰지 않아요. */
  onAccent: 'on-accent',
  /** 마감 임박 카드, D-day 칩, '오늘' 배지, 부재중 안내 바탕. */
  accentSoft: 'accent-soft',
  /** accent-soft 위 글자. */
  accentText: 'accent-text',
  /** 어두운 강조 면. 랜딩 Dev Features 섹션과 선택된 필터 칩에만 써요. 앱 안의 큰 카드에는 쓰지 않아요(시선을 다 가져가요). 위 글자는 on-brand. */
  night: 'night',
  /** 확인 문구(사용할 수 있는 아이디예요), 충족된 비밀번호 조건. */
  successText: 'success-text',
  /** 완료 칩 바탕. */
  successSoft: 'success-soft',
  /** 오류 입력창 테두리. */
  danger: 'danger',
  /** 오류 문구, 삭제 아이콘. */
  dangerText: 'danger-text',
  /** 채팅의 '여기부터 새 메시지' 구분선 글자와 선. */
  unread: 'unread',
  /** 아바타 상태 점: 온라인. */
  presenceOnline: 'presence-online',
  /** 아바타 상태 점: 부재중. 점 옆에 항상 '부재중' 글자를 함께 써요. */
  presenceAway: 'presence-away',
  /** 아바타 상태 점: 오프라인. */
  presenceOffline: 'presence-offline',
});

createGlobalTheme(':root, :root[data-theme="light"]', themedColor, {
  bg: '#F8F7FB',
  bgBright: '#FBFAFD',
  bgSubtle: '#DDD7EE',
  bgRaised: '#FDFCFE',
  ink: '#1C1830',
  inkSecondary: '#3D394F',
  inkMuted: '#5F5B70',
  inkSubtle: '#6B6780',
  line: '#E7E5EE',
  lineStrong: '#D9D6E3',
  brand: '#6D4AFF',
  brandText: '#5B3BF0',
  brandStrong: '#4B2FD1',
  brandSoft: '#ECE8F7',
  brandTint: '#E4DCFF',
  onBrand: '#FFFFFF',
  gradientStart: '#A584FF',
  gradientEnd: '#7ECBFF',
  tintStart: '#F3EEFF',
  tintEnd: '#EAF6FF',
  focusRing: '#EDE8FF',
  accent: '#FFAC00',
  onAccent: '#1C1830',
  accentSoft: '#FFF0D6',
  accentText: '#8A5300',
  night: '#1F1640',
  successText: '#127A45',
  successSoft: '#EAF6EF',
  danger: '#D93A3A',
  dangerText: '#C02626',
  unread: '#C2410C',
  presenceOnline: '#1FA463',
  presenceAway: '#E08A00',
  presenceOffline: '#A8A4B8',
});

createGlobalTheme(':root[data-theme="dark"]', themedColor, {
  bg: '#121022',
  bgBright: '#121022',
  bgSubtle: '#0E0C1C',
  bgRaised: '#1B1830',
  ink: '#F2F0FA',
  inkSecondary: '#D4D0E4',
  inkMuted: '#A9A4C0',
  inkSubtle: '#9792AE',
  line: '#2E2A45',
  lineStrong: '#3E3958',
  brand: '#6D4AFF',
  brandText: '#A996FF',
  brandStrong: '#C4B5FF',
  brandSoft: '#241E45',
  brandTint: '#332A63',
  onBrand: '#FFFFFF',
  gradientStart: '#A584FF',
  gradientEnd: '#7ECBFF',
  tintStart: '#1E1838',
  tintEnd: '#14213A',
  focusRing: '#3A2F73',
  accent: '#FFAC00',
  onAccent: '#1C1830',
  accentSoft: '#3A2A0A',
  accentText: '#FFC24D',
  night: '#2B2257',
  successText: '#4ADE80',
  successSoft: '#12321F',
  danger: '#EF4444',
  dangerText: '#F87171',
  unread: '#FB923C',
  presenceOnline: '#34C77B',
  presenceAway: '#F5A524',
  presenceOffline: '#6B6780',
});

/** 테마와 무관한 값: 프로젝트·아바타 팔레트, 간격, 모서리, 그림자, 크기 */
const fixed = createGlobalThemeContract({
  /** 프로젝트 팔레트 1 · 타일. 위 글자·아이콘은 ink. 프로젝트 구분에만 써요. */
  projectLilac: 'project-lilac',
  /** 라일락 · 진행률 막대, 색 점. */
  projectLilacStrong: 'project-lilac-strong',
  /** 라일락 · 칩 바탕. */
  projectLilacSoft: 'project-lilac-soft',
  /** 라일락 · 칩 글자 (soft 위 4.5:1 이상). */
  projectLilacText: 'project-lilac-text',
  /** 프로젝트 팔레트 2 · 타일. */
  projectMint: 'project-mint',
  /** 민트 · 진행률 막대, 색 점. */
  projectMintStrong: 'project-mint-strong',
  /** 민트 · 칩 바탕. */
  projectMintSoft: 'project-mint-soft',
  /** 민트 · 칩 글자. */
  projectMintText: 'project-mint-text',
  /** 프로젝트 팔레트 3 · 타일. */
  projectPink: 'project-pink',
  /** 핑크 · 진행률 막대, 색 점. */
  projectPinkStrong: 'project-pink-strong',
  /** 핑크 · 칩 바탕. */
  projectPinkSoft: 'project-pink-soft',
  /** 핑크 · 칩 글자. */
  projectPinkText: 'project-pink-text',
  /** 프로젝트 팔레트 4 · 타일. */
  projectSky: 'project-sky',
  /** 하늘 · 진행률 막대, 색 점. */
  projectSkyStrong: 'project-sky-strong',
  /** 하늘 · 칩 바탕. */
  projectSkySoft: 'project-sky-soft',
  /** 하늘 · 칩 글자. */
  projectSkyText: 'project-sky-text',
  /** 프로젝트 팔레트 5 · 타일. */
  projectPeriwinkle: 'project-periwinkle',
  /** 페리윙클 · 진행률 막대, 색 점. */
  projectPeriwinkleStrong: 'project-periwinkle-strong',
  /** 페리윙클 · 칩 바탕. */
  projectPeriwinkleSoft: 'project-periwinkle-soft',
  /** 페리윙클 · 칩 글자. */
  projectPeriwinkleText: 'project-periwinkle-text',
  /** 프로젝트 팔레트 6 · 타일. */
  projectAqua: 'project-aqua',
  /** 아쿠아 · 진행률 막대, 색 점. */
  projectAquaStrong: 'project-aqua-strong',
  /** 아쿠아 · 칩 바탕. */
  projectAquaSoft: 'project-aqua-soft',
  /** 아쿠아 · 칩 글자. */
  projectAquaText: 'project-aqua-text',
  /** 프로젝트 팔레트 7 · 타일. */
  projectMauve: 'project-mauve',
  /** 모브 · 진행률 막대, 색 점. */
  projectMauveStrong: 'project-mauve-strong',
  /** 모브 · 칩 바탕. */
  projectMauveSoft: 'project-mauve-soft',
  /** 모브 · 칩 글자. */
  projectMauveText: 'project-mauve-text',
  /** 프로젝트 팔레트 8 · 타일. */
  projectSage: 'project-sage',
  /** 세이지 · 진행률 막대, 색 점. */
  projectSageStrong: 'project-sage-strong',
  /** 세이지 · 칩 바탕. */
  projectSageSoft: 'project-sage-soft',
  /** 세이지 · 칩 글자. */
  projectSageText: 'project-sage-text',
  /** 이니셜 아바타 바탕 1. 글자는 on-accent. 두 테마 공통. */
  avatar1: 'avatar-1',
  /** 이니셜 아바타 바탕 2. */
  avatar2: 'avatar-2',
  /** 이니셜 아바타 바탕 3 (본인 기본). */
  avatar3: 'avatar-3',
  /** 이니셜 아바타 바탕 4. */
  avatar4: 'avatar-4',
  /** 이니셜 아바타 바탕 5. */
  avatar5: 'avatar-5',
  /** 아이콘 버튼 사이, 탭 사이. */
  space1: 'space-1',
  /** 이름표와 입력창 사이, 아이콘과 글자 사이. */
  space2: 'space-2',
  /** 아바타와 이름 사이, 카드 안 요소 사이. */
  space3: 'space-3',
  /** 폼 필드 사이, 모바일 좌우 여백. */
  space4: 'space-4',
  /** 카드 안쪽 여백, 대화 메시지 사이. */
  space5: 'space-5',
  /** 폼 묶음 사이, 카드 그리드 간격. */
  space6: 'space-6',
  /** 랜딩 카드 안쪽 여백, 페이지 좌우 여백. */
  space8: 'space-8',
  /** 큰 묶음 사이. */
  space10: 'space-10',
  /** 히어로 안 두 열 사이, 브랜드 패널 좌우 여백. */
  space14: 'space-14',
  /** 랜딩 섹션 위아래. */
  space18: 'space-18',
  /** 역할 티켓, '오늘' 배지 같은 작은 칩. */
  radiusSm: 'radius-sm',
  /** 아이콘 버튼, 검색창, 목록 항목. */
  radiusMd: 'radius-md',
  /** 입력창, 버튼, 레일 메뉴. */
  radiusLg: 'radius-lg',
  /** 카드, 표, 말풍선, 업로드 영역. */
  radiusXl: 'radius-xl',
  /** 랜딩 기능 카드, 제품 미리보기. */
  radius2xl: 'radius-2xl',
  /** 필터 칩, 상태 칩, 아바타, 랜딩 CTA. */
  radiusFull: 'radius-full',
  /** 선택된 채널 항목처럼 살짝 떠 있는 요소. */
  shadowSm: 'shadow-sm',
  /** 그라데이션 위에 놓인 제품 미리보기. 그 외에는 쓰지 않아요. */
  shadowFloat: 'shadow-float',
  /** 표 안 아이콘 버튼, 필터 칩 높이. */
  controlSm: 'control-sm',
  /** 최소 터치 크기. 아이콘 버튼, 체크박스 줄. */
  controlMd: 'control-md',
  /** 입력창, 주요 버튼 높이. */
  controlLg: 'control-lg',
  /** 앱 왼쪽 사이드 레일 너비. */
  railWidth: 'rail-width',
  /** 채널·팀원 목록 열 너비. */
  sidebarWidth: 'sidebar-width',
});

createGlobalTheme(':root', fixed, {
  projectLilac: '#CDB8FF',
  projectLilacStrong: '#8B6CF0',
  projectLilacSoft: '#EEE7FF',
  projectLilacText: '#4B2FD1',
  projectMint: '#8EE3C8',
  projectMintStrong: '#2FAE8A',
  projectMintSoft: '#DDF6EE',
  projectMintText: '#11684F',
  projectPink: '#FFB3C1',
  projectPinkStrong: '#E0607A',
  projectPinkSoft: '#FFE4EA',
  projectPinkText: '#9E2443',
  projectSky: '#A8D8FF',
  projectSkyStrong: '#3B8FE0',
  projectSkySoft: '#E1F1FF',
  projectSkyText: '#1A5A9E',
  projectPeriwinkle: '#B9C4FF',
  projectPeriwinkleStrong: '#5E6FE6',
  projectPeriwinkleSoft: '#E6EAFF',
  projectPeriwinkleText: '#2F3DA8',
  projectAqua: '#8FDDE6',
  projectAquaStrong: '#23A3B3',
  projectAquaSoft: '#DDF5F8',
  projectAquaText: '#0F6570',
  projectMauve: '#E7B8F0',
  projectMauveStrong: '#B05CC4',
  projectMauveSoft: '#F7E6FA',
  projectMauveText: '#6E2A80',
  projectSage: '#C5E1B5',
  projectSageStrong: '#6AA052',
  projectSageSoft: '#EAF4E3',
  projectSageText: '#3C6B2A',
  avatar1: '#FFE3A3',
  avatar2: '#D7EBFF',
  avatar3: '#E4DCFF',
  avatar4: '#D5F5E3',
  avatar5: '#FFD9D9',
  space1: '4px',
  space2: '8px',
  space3: '12px',
  space4: '16px',
  space5: '20px',
  space6: '24px',
  space8: '32px',
  space10: '40px',
  space14: '56px',
  space18: '72px',
  radiusSm: '6px',
  radiusMd: '10px',
  radiusLg: '12px',
  radiusXl: '16px',
  radius2xl: '20px',
  radiusFull: '999px',
  shadowSm: '0 1px 2px rgba(40, 20, 120, 0.08)',
  shadowFloat: '0 30px 60px rgba(40, 20, 120, 0.28)',
  controlSm: '40px',
  controlMd: '44px',
  controlLg: '52px',
  railWidth: '76px',
  sidebarWidth: '260px',
});

export const vars = { ...themedColor, ...fixed };

/** 프로젝트 팔레트 8색 × 4단계. 배정 규칙은 디자인 시스템 README "프로젝트 팔레트" */
export const projectPalette = {
  lilac: {
    tile: vars.projectLilac,
    strong: vars.projectLilacStrong,
    soft: vars.projectLilacSoft,
    text: vars.projectLilacText,
  },
  mint: {
    tile: vars.projectMint,
    strong: vars.projectMintStrong,
    soft: vars.projectMintSoft,
    text: vars.projectMintText,
  },
  pink: {
    tile: vars.projectPink,
    strong: vars.projectPinkStrong,
    soft: vars.projectPinkSoft,
    text: vars.projectPinkText,
  },
  sky: {
    tile: vars.projectSky,
    strong: vars.projectSkyStrong,
    soft: vars.projectSkySoft,
    text: vars.projectSkyText,
  },
  periwinkle: {
    tile: vars.projectPeriwinkle,
    strong: vars.projectPeriwinkleStrong,
    soft: vars.projectPeriwinkleSoft,
    text: vars.projectPeriwinkleText,
  },
  aqua: {
    tile: vars.projectAqua,
    strong: vars.projectAquaStrong,
    soft: vars.projectAquaSoft,
    text: vars.projectAquaText,
  },
  mauve: {
    tile: vars.projectMauve,
    strong: vars.projectMauveStrong,
    soft: vars.projectMauveSoft,
    text: vars.projectMauveText,
  },
  sage: {
    tile: vars.projectSage,
    strong: vars.projectSageStrong,
    soft: vars.projectSageSoft,
    text: vars.projectSageText,
  },
} as const;

export type ProjectColor = keyof typeof projectPalette;
