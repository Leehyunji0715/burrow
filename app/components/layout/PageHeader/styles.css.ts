import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/tokens.css';

export const header = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space4,
});

export const title = style({ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em' });

export const description = style({ fontSize: '14px', color: vars.inkMuted });
