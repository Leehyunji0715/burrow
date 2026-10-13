import { style } from '@vanilla-extract/css';

import { themeContract } from '~/styles/themes.css';

export const container = style({
  width: '27%',
  minWidth: '30rem',
  maxWidth: '35rem',
  height: '100%',
  padding: '1rem 2rem',
  background: themeContract.app.background,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const heading = style({
  height: '5rem',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
});
