import { style, styleVariants } from '@vanilla-extract/css';

import { bottomNavHeight, mobile, safeBottom } from '~/styles/media';
import { projectPalette, vars } from '~/styles/tokens.css';
import { displayFace } from '~/styles/typography.css';

export const rail = style({
  flex: 'none',
  width: vars.railWidth,
  height: '100vh',
  position: 'sticky',
  top: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '6px',
  padding: '18px 0',
  background: vars.bgSubtle,
  borderRight: `1px solid ${vars.lineRail}`,
  '@media': {
    // 좁은 화면: 맨 아래 탭 바. 프로젝트가 많으면 가로로 스크롤한다
    [mobile]: {
      position: 'relative',
      width: '100%',
      height: `calc(${bottomNavHeight} + ${safeBottom})`,
      flexDirection: 'row',
      gap: vars.space2,
      padding: `0 0 ${safeBottom} ${vars.space3}`,
      overflowX: 'auto',
      overflowY: 'hidden',
      borderRight: 0,
      borderTop: `1px solid ${vars.lineRail}`,
      scrollbarWidth: 'none',
    },
  },
});

export const home = style({
  width: vars.controlMd,
  height: vars.controlMd,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: vars.space3,
  // 탭 바는 이동하는 곳만 두는 자리라 로고는 뺀다
  '@media': { [mobile]: { display: 'none' } },
});

export const menu = style({
  width: '64px',
  padding: '8px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.space1,
  borderRadius: vars.radiusLg,
  color: vars.inkMuted,
  fontSize: '11px',
  fontWeight: 600,
  selectors: { '&:hover': { color: vars.ink } },
  '@media': { [mobile]: { flex: 'none', width: '56px', padding: '6px 0' } },
});

export const menuActive = style({ background: vars.brandSoft, color: vars.brandText });

export const menuIcon = style({ position: 'relative', fontSize: '22px', lineHeight: 0 });

export const badge = style({
  position: 'absolute',
  top: '-6px',
  right: '-12px',
  minWidth: '18px',
  height: '18px',
  padding: '0 5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '9px',
  background: vars.accent,
  color: vars.onAccent,
  fontSize: '11px',
  fontWeight: 800,
  lineHeight: 1,
});

export const divider = style({
  width: '36px',
  height: '1px',
  margin: '8px 0 4px',
  background: vars.lineStrong,
  '@media': { [mobile]: { flex: 'none', width: '1px', height: '32px', margin: '0 4px' } },
});

export const groupLabel = style({
  fontSize: '11px',
  fontWeight: 700,
  color: vars.inkMuted,
  '@media': { [mobile]: { display: 'none' } },
});

export const tiles = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  paddingTop: vars.space1,
  '@media': { [mobile]: { flex: 'none', flexDirection: 'row', paddingTop: 0 } },
});

const tileBase = {
  width: '44px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: vars.radiusLg,
} as const;

export const tile = style({
  ...tileBase,
  // 타일 색이 테마마다 바뀌므로 글자도 on-project 로 따라 바꾼다 (라이트: 진한 남색, 다크: 밝은 색)
  ...displayFace,
  color: vars.onProject,
  fontSize: '18px',
  letterSpacing: 0,
  // 라일락·페리윙클은 레일 바탕과 밝기가 비슷해서 얇은 테두리로 가장자리를 세운다
  boxShadow: '0 0 0 1px rgba(28, 24, 48, 0.08)',
});

export const tileColor = styleVariants(projectPalette, (c) => ({ background: c.tile }));

export const tileActive = style({
  boxShadow: `0 0 0 2px ${vars.bgSubtle}, 0 0 0 4px ${vars.brand}`,
});

export const addTile = style({
  ...tileBase,
  border: `1.5px dashed ${vars.lineDashed}`,
  background: 'transparent',
  color: vars.inkMuted,
  fontSize: '18px',
  selectors: { '&:hover': { color: vars.ink, borderColor: vars.inkMuted } },
});

export const tooltip = style({
  padding: '6px 10px',
  borderRadius: vars.radiusMd,
  background: vars.night,
  color: vars.onBrand,
  fontSize: '13px',
  fontWeight: 600,
  zIndex: 50,
});

export const profile = style({
  marginTop: 'auto',
  padding: vars.space1,
  border: 0,
  borderRadius: vars.radiusFull,
  background: 'transparent',
  vars: { '--avatar-ring': vars.bgSubtle },
  '@media': {
    // 가로로 스크롤해도 내 프로필은 오른쪽 끝에 붙어 있게 한다
    [mobile]: {
      position: 'sticky',
      right: 0,
      flex: 'none',
      marginTop: 0,
      marginLeft: 'auto',
      padding: `0 ${vars.space3}`,
      height: '100%',
      borderRadius: 0,
      background: vars.bgSubtle,
      boxShadow: `-8px 0 12px -8px rgba(18, 16, 34, 0.25)`,
    },
  },
});

// ── 프로필 메뉴 ────────────────────────────────────────────
export const menuPanel = style({
  minWidth: '200px',
  padding: vars.space2,
  borderRadius: vars.radiusXl,
  border: `1px solid ${vars.line}`,
  background: vars.bgRaised,
  boxShadow: '0 12px 32px rgba(40, 20, 120, 0.16)',
  zIndex: 50,
});

export const menuLabel = style({ padding: '6px 10px', fontSize: '14px', fontWeight: 700 });

export const menuSubLabel = style({
  padding: '6px 10px 2px',
  fontSize: '12px',
  fontWeight: 700,
  color: vars.inkMuted,
});

export const menuItem = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  minHeight: '40px',
  padding: '0 10px',
  borderRadius: vars.radiusMd,
  fontSize: '14px',
  outline: 'none',
  cursor: 'pointer',
  selectors: { '&[data-highlighted]': { background: vars.brandSoft } },
});

export const menuItemIcon = style({ fontSize: '16px', lineHeight: 0, color: vars.inkMuted });

export const menuCheck = style({ marginLeft: 'auto', fontSize: '8px', color: vars.brand });

export const menuSeparator = style({ height: '1px', margin: '6px 0', background: vars.line });
