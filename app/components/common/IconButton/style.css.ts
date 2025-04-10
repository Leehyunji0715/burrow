import { style } from '@vanilla-extract/css';

import { themeContract } from '~/styles/themes.css';

export const root = style({
  color: themeContract.colors.highlightText,
  border: 'none',
  padding: '.75rem 1.5rem',
  borderRadius: 100,
  background: themeContract.colors.highlight,
  ':hover': {
    transform: 'translateY(-1.5px)',
  },
  ':active': {
    filter: 'brightness(0.95)',
    transform: 'translateY(1px)',
  },
});

export const highlight = style({
  background: themeContract.colors.highlight,
});

export const primary = style({
  background: themeContract.colors.primary,
});
