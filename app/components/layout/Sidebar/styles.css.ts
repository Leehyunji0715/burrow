import { style } from '@vanilla-extract/css';

import { bottomNavHeight, mobile, safeBottom } from '~/styles/media';
import { vars } from '~/styles/tokens.css';

export const sidebar = style({
  flex: 'none',
  // 너비는 사용자가 정한 값을 인라인으로 넣는다 (useSidebarSize)
  width: vars.sidebarWidth,
  height: '100vh',
  position: 'sticky',
  top: 0,
  zIndex: 2,
  background: vars.brandSoft,
  borderRight: `1px solid ${vars.lineSidebar}`,
  vars: { '--avatar-ring': vars.brandSoft },
  '@media': {
    // 좁은 화면: 왼쪽에서 나오는 덮개 목록. 하단 탭 바는 가리지 않는다
    [mobile]: {
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 30,
      width: 'min(320px, calc(100vw - 48px))',
      height: `calc(100dvh - ${bottomNavHeight} - ${safeBottom})`,
      boxShadow: '0 12px 40px rgba(18, 16, 34, 0.24)',
    },
  },
});

// 손잡이가 목록과 함께 스크롤되지 않도록 스크롤은 안쪽 상자가 맡는다
export const scroll = style({
  height: '100%',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: vars.space4,
});

export const closeButton = style({
  position: 'absolute',
  top: vars.space4,
  right: vars.space2,
});

export const handle = style({
  position: 'absolute',
  top: 0,
  right: '-5px',
  width: '10px',
  height: '100%',
  cursor: 'col-resize',
  touchAction: 'none',
  outline: 'none',
  selectors: {
    // 잡는 영역은 넓게, 보이는 선은 가늘게
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: '4px',
      width: '2px',
      background: 'transparent',
      transition: 'background-color 120ms',
    },
    '&:hover::after, &:active::after, &:focus-visible::after': { background: vars.brand },
  },
});

export const collapsedStrip = style({
  flex: 'none',
  width: '52px',
  height: '100vh',
  position: 'sticky',
  top: 0,
  zIndex: 2,
  display: 'flex',
  justifyContent: 'center',
  paddingTop: vars.space4,
  background: vars.brandSoft,
  borderRight: `1px solid ${vars.lineSidebar}`,
  '@media': {
    // 좁은 화면: 본문 위쪽에 붙는 가로 바. 지금 어느 프로젝트인지 이름을 함께 보여준다
    [mobile]: {
      width: '100%',
      height: 'auto',
      justifyContent: 'flex-start',
      padding: `${vars.space1} ${vars.space2}`,
      borderRight: 0,
      borderBottom: `1px solid ${vars.lineSidebar}`,
    },
  },
});

export const stripButton = style({
  minWidth: vars.controlMd,
  height: vars.controlMd,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space2,
  padding: `0 ${vars.space2}`,
  border: 0,
  borderRadius: vars.radiusMd,
  background: 'transparent',
  color: vars.inkSecondary,
  fontSize: '20px',
  selectors: { '&:hover': { background: vars.brandTint, color: vars.ink } },
});

// 넓은 화면에서는 아이콘만, 좁은 화면에서는 이름도 보인다
export const stripLabel = style({
  display: 'none',
  fontSize: '15px',
  fontWeight: 700,
  color: vars.ink,
  '@media': { [mobile]: { display: 'inline' } },
});

export const backdrop = style({
  position: 'fixed',
  inset: 0,
  zIndex: 29,
  '@media': { [mobile]: { bottom: `calc(${bottomNavHeight} + ${safeBottom})` } },
  border: 0,
  padding: 0,
  background: 'rgba(18, 16, 34, 0.35)',
  cursor: 'default',
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  // 오른쪽 위 접기 버튼과 겹치지 않게 비워 둔다
  padding: `${vars.space5} 52px ${vars.space3} ${vars.space5}`,
});

export const headerTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  minHeight: vars.controlMd,
  fontSize: '17px',
  fontWeight: 800,
});

export const headerMeta = style({ fontSize: '12px', color: vars.inkMuted });

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  padding: `${vars.space4} ${vars.space3} 0`,
});

export const sectionTitle = style({
  padding: '0 10px 6px',
  fontSize: '12px',
  fontWeight: 700,
  color: vars.inkMuted,
});

export const list = style({ display: 'flex', flexDirection: 'column', gap: '2px' });

export const item = style({
  minHeight: '40px',
  padding: '4px 10px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  borderRadius: vars.radiusMd,
  fontSize: '14px',
  color: vars.inkSecondary,
  selectors: { '&:hover': { background: vars.brandTint } },
});

export const itemUnread = style({ color: vars.ink, fontWeight: 700 });

export const itemActive = style({
  background: vars.bgRaised,
  color: vars.ink,
  fontWeight: 700,
  boxShadow: vars.shadowSm,
  vars: { '--avatar-ring': vars.bgRaised },
  selectors: { '&:hover': { background: vars.bgRaised } },
});

export const itemIcon = style({
  flex: 'none',
  fontSize: '18px',
  lineHeight: 0,
  color: vars.inkMuted,
});

export const itemText = style({
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const unread = style({
  minWidth: '20px',
  height: '20px',
  padding: '0 6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  background: vars.brand,
  color: vars.onBrand,
  fontSize: '11px',
  fontWeight: 700,
});

export const person = style({ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 });

export const personText = style({ display: 'flex', flexDirection: 'column', minWidth: 0 });

export const personName = style({ fontSize: '14px', fontWeight: 600, color: vars.ink });

export const personSub = style({
  fontSize: '12px',
  fontWeight: 400,
  color: vars.inkMuted,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const memberRow = style({
  minHeight: '48px',
  padding: '4px 10px',
  display: 'flex',
  alignItems: 'center',
});
