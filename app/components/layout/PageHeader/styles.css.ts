import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/tokens.css';
import { displayFace } from '~/styles/typography.css';

export const header = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space4,
});

export const title = style({ ...displayFace, fontSize: '26px' });

export const description = style({ fontSize: '14px', color: vars.inkMuted });
