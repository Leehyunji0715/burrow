import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/tokens.css';

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space2,
});

export const label = style({
  fontSize: '14px',
  fontWeight: 600,
});

export const row = style({
  position: 'relative',
  display: 'flex',
  gap: vars.space2,
});

export const input = style({
  flex: 1,
  minWidth: 0,
  height: vars.controlLg,
  padding: `0 ${vars.space4}`,
  border: `1.5px solid ${vars.lineStrong}`,
  borderRadius: vars.radiusLg,
  background: vars.bgRaised,
  color: vars.ink,
  fontSize: '15px',
  outline: 'none',
  selectors: {
    '&::placeholder': { color: vars.inkSubtle },
    '&:focus': { borderColor: vars.brand, boxShadow: `0 0 0 4px ${vars.focusRing}` },
    '&[aria-invalid="true"]': { borderColor: vars.danger },
  },
});

// 오른쪽 안쪽에 버튼(비밀번호 보기)이 겹쳐 들어갈 자리
export const withTrailing = style({ paddingRight: '52px' });

export const trailing = style({
  position: 'absolute',
  right: '4px',
  top: '4px',
});

export const hint = style({ fontSize: '13px', color: vars.inkMuted });
export const error = style({ fontSize: '13px', color: vars.dangerText });
