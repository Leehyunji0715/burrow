import { style, styleVariants } from '@vanilla-extract/css';

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
});

export const home = style({
  width: vars.controlMd,
  height: vars.controlMd,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: vars.space3,
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
});

export const groupLabel = style({ fontSize: '11px', fontWeight: 700, color: vars.inkMuted });

export const tiles = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  paddingTop: vars.space1,
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
