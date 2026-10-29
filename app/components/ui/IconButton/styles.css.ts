import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/tokens.css';

export const root = style({
  flex: 'none',
  // 아이콘만 있는 버튼도 최소 터치 크기(control-md)를 지킨다.
  width: vars.controlMd,
  height: vars.controlMd,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 0,
  borderRadius: vars.radiusMd,
  background: 'transparent',
  color: vars.inkSecondary,
  fontSize: '20px',
  selectors: {
    '&:hover': { background: vars.brandSoft, color: vars.ink },
  },
});
