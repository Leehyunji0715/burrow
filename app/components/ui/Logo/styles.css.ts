import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/tokens.css';

export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space2,
  color: vars.ink,
});

export const body = style({ fill: vars.accent });
export const line = style({ fill: vars.brandText });

export const wordmark = style({
  fontSize: '20px',
  fontWeight: 800,
  letterSpacing: '-0.02em',
});
