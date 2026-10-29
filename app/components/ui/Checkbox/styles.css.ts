import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/tokens.css';

export const root = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space2,
  minHeight: vars.controlMd,
  fontSize: '14px',
  color: vars.inkSecondary,
  cursor: 'pointer',
});

export const box = style({
  width: '18px',
  height: '18px',
  margin: 0,
  accentColor: vars.brand,
});
