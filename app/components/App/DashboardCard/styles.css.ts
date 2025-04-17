import { style } from '@vanilla-extract/css';

import { themeContract } from '~/styles/themes.css';
import { vars } from '~/styles/variables.css';

const CARD_PADDING = '1rem 2rem';

export const container = style({
  boxShadow: 'var(--shadow-2)',
  borderRadius: 'var(--radius-3)',
});

export const headerContainer = style({
  padding: CARD_PADDING,
});

export const contentContainer = style({
  marginTop: '2rem',
  fontSize: vars.fontSize.medium,
});

export const title = style({
  flexGrow: 1,
  width: 1,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

export const commentsContainer = style({
  fontSize: vars.fontSize.medium,
});

export const commentsListItem = style({
  listStyle: 'none',
  padding: '.5rem 2rem',
  borderTop: `1px solid var(--gray-5)`,
});

export const commentInput = style({
  margin: CARD_PADDING,
});
