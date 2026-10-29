import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/tokens.css';

export const root = style({
  flex: 1,
  minWidth: 0,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: vars.bgRaised,
});

export const header = style({
  minHeight: '68px',
  padding: `12px ${vars.space6}`,
  '@media': { 'screen and (max-width: 899px)': { padding: `10px ${vars.space4}` } },
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space3,
  borderBottom: `1px solid ${vars.line}`,
});

export const title = style({ fontSize: '18px', fontWeight: 800 });
export const subtitle = style({ fontSize: '13px', color: vars.inkMuted });
export const actions = style({ display: 'flex', alignItems: 'center', gap: vars.space1 });

export const scroller = style({
  flex: 1,
  overflowY: 'auto',
  background: vars.bg,
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  padding: `${vars.space5} ${vars.space6}`,
  '@media': { 'screen and (max-width: 899px)': { padding: vars.space4 } },
});

const line = {
  display: 'flex',
  alignItems: 'center',
  gap: vars.space3,
  fontSize: '12px',
} as const;

export const divider = style({
  ...line,
  color: vars.inkSubtle,
  selectors: {
    '&::before, &::after': { content: '""', flex: 1, height: '1px', background: vars.line },
  },
});

export const unreadDivider = style({
  ...line,
  color: vars.unread,
  fontWeight: 700,
  selectors: {
    '&::before, &::after': {
      content: '""',
      flex: 1,
      height: '1.5px',
      background: vars.unreadLine,
    },
  },
});

// 이어 보낸 메시지는 간격을 좁혀 한 묶음처럼 보이게 한다
export const tight = style({ marginTop: '-12px' });

export const other = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: vars.space3,
  maxWidth: '640px',
});

export const avatarSlot = style({ flex: 'none', width: '38px' });

export const otherBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  minWidth: 0,
});

export const meta = style({ display: 'flex', alignItems: 'baseline', gap: vars.space2 });
export const author = style({ fontSize: '14px' });
export const time = style({ fontSize: '12px', color: vars.inkSubtle });

export const otherBubble = style({
  alignSelf: 'flex-start',
  padding: '10px 14px',
  border: `1px solid ${vars.line}`,
  borderRadius: '4px 16px 16px 16px',
  background: vars.bgRaised,
  fontSize: '15px',
});

export const mine = style({
  alignSelf: 'flex-end',
  display: 'flex',
  alignItems: 'flex-end',
  gap: vars.space2,
  maxWidth: '560px',
});

export const mineTime = style({ flex: 'none', fontSize: '11px', color: vars.inkSubtle });

export const mineBubble = style({
  padding: '10px 14px',
  borderRadius: '16px 4px 16px 16px',
  background: vars.brand,
  color: vars.onBrand,
  fontSize: '15px',
});

export const fileCard = style({
  width: '300px',
  maxWidth: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: vars.space3,
  padding: vars.space3,
  border: `1px solid ${vars.line}`,
  borderRadius: '14px',
  background: vars.bgRaised,
});

export const fileIcon = style({
  flex: 'none',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: vars.radiusMd,
  background: vars.brandSoft,
  color: vars.brand,
  fontSize: '20px',
});

export const fileText = style({ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' });
export const fileName = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: '14px',
  fontWeight: 600,
});
export const fileSize = style({ fontSize: '12px', color: vars.inkSubtle, whiteSpace: 'nowrap' });

export const imageCard = style({
  width: '300px',
  maxWidth: '100%',
  height: '180px',
  display: 'flex',
  alignItems: 'flex-end',
  padding: '10px',
  borderRadius: '14px',
  border: `1px solid ${vars.brandTint}`,
  background: `repeating-linear-gradient(45deg, ${vars.placeholderA} 0 12px, ${vars.placeholderB} 12px 24px)`,
  fontSize: '12px',
  color: vars.inkMuted,
});

export const composerForm = style({
  padding: `14px ${vars.space6} ${vars.space5}`,
  '@media': { 'screen and (max-width: 899px)': { padding: `10px ${vars.space3}` } },
  borderTop: `1px solid ${vars.line}`,
});

export const composer = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space1,
  padding: '6px 6px 6px 8px',
  border: `1.5px solid ${vars.lineStrong}`,
  borderRadius: vars.radiusXl,
  background: vars.bgRaised,
  selectors: {
    '&:focus-within': { borderColor: vars.brand, boxShadow: `0 0 0 4px ${vars.focusRing}` },
  },
});

export const composerInput = style({
  flex: 1,
  minWidth: 0,
  height: vars.controlMd,
  border: 0,
  outline: 'none',
  background: 'transparent',
  fontSize: '15px',
  selectors: { '&::placeholder': { color: vars.inkSubtle } },
});

export const send = style({
  flex: 'none',
  width: vars.controlMd,
  height: vars.controlMd,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 0,
  borderRadius: vars.radiusLg,
  background: vars.accent,
  color: vars.onAccent,
  fontSize: '20px',
  selectors: { '&:disabled': { opacity: 0.45, cursor: 'not-allowed' } },
});
