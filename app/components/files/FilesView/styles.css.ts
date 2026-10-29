import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/tokens.css';

export const page = style({
  flex: 1,
  minWidth: 0,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space5,
  padding: `${vars.space8} ${vars.space8} ${vars.space10}`,
  background: vars.bg,
  '@media': { 'screen and (max-width: 899px)': { padding: vars.space4 } },
});

export const toolbar = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space3,
});

export const filters = style({ display: 'flex', flexWrap: 'wrap', gap: vars.space2 });

const chip = {
  height: vars.controlSm,
  padding: `0 ${vars.space4}`,
  borderRadius: vars.radiusFull,
  fontSize: '14px',
} as const;

export const filter = style({
  ...chip,
  border: `1px solid ${vars.line}`,
  background: vars.bgRaised,
  color: vars.inkSecondary,
  fontWeight: 500,
});

// 선택된 필터 칩은 night (디자인 시스템: 어두운 강조 면)
export const filterOn = style({
  ...chip,
  border: 0,
  background: vars.night,
  color: vars.onBrand,
  fontWeight: 700,
});

export const search = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: 'min(320px, 100%)',
});

export const searchIcon = style({
  position: 'absolute',
  left: '14px',
  color: vars.inkSubtle,
  fontSize: '18px',
  pointerEvents: 'none',
});

export const searchInput = style({
  width: '100%',
  height: vars.controlMd,
  padding: '0 14px 0 42px',
  border: `1.5px solid ${vars.lineStrong}`,
  borderRadius: vars.radiusMd,
  background: vars.bgRaised,
  outline: 'none',
  selectors: { '&:focus': { borderColor: vars.brand, boxShadow: `0 0 0 4px ${vars.focusRing}` } },
});

export const srOnly = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
});

export const dropzone = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space3,
  padding: vars.space6,
  border: `1.5px dashed ${vars.lineDashed}`,
  borderRadius: vars.radiusXl,
  background: vars.bgRaised,
  color: vars.inkMuted,
  fontSize: '14px',
});

export const dropIcon = style({ fontSize: '22px', color: vars.brand });

export const tableWrap = style({
  overflowX: 'auto',
  border: `1px solid ${vars.line}`,
  borderRadius: vars.radiusXl,
  background: vars.bgRaised,
});

export const table = style({ width: '100%', borderCollapse: 'collapse', fontSize: '14px' });

globalStyle(`${table} th`, {
  padding: '12px 16px',
  textAlign: 'left',
  fontSize: '13px',
  fontWeight: 600,
  color: vars.inkMuted,
  borderBottom: `1px solid ${vars.line}`,
  whiteSpace: 'nowrap',
});

globalStyle(`${table} td`, {
  padding: '8px 16px',
  // 전역의 overflow-wrap: anywhere 때문에 좁은 칸에서 글자가 세로로 쌓이지 않게 한 줄로 둔다
  whiteSpace: 'nowrap',
  borderBottom: `1px solid ${vars.line}`,
  color: vars.inkSecondary,
});

globalStyle(`${table} tbody tr:last-child td`, { borderBottom: 0 });

// 이름 칸이 남는 폭을 모두 차지하고, 넘치면 말줄임으로 자른다 (max-width: 0 은 표 칸에서 말줄임을 켜는 관용구)
export const nameTd = style({ width: '100%', maxWidth: 0 });

export const nameCell = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space3,
  minWidth: 0,
});

export const ext = style({
  flex: 'none',
  width: '42px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: vars.radiusSm,
  background: vars.brandSoft,
  color: vars.brandStrong,
  fontSize: '11px',
  fontWeight: 800,
});

export const fileName = style({
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontWeight: 600,
  color: vars.ink,
});

export const num = style({ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' });

export const rowActions = style({ display: 'flex', justifyContent: 'flex-end' });

export const empty = style({ padding: vars.space8, textAlign: 'center', color: vars.inkMuted });
