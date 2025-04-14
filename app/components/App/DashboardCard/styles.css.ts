import { style } from '@vanilla-extract/css';

const CARD_PADDING = '1rem 2rem';

export const container = style({
  boxShadow: 'var(--shadow-2)',
  borderRadius: 'var(--radius-3)',
});

export const contentContainer = style({
  padding: CARD_PADDING,
  borderBottom: `1px solid var(--gray-6)`,
});

export const commentsContainer = style({
  padding: CARD_PADDING,
});

export const title = style({
  flexGrow: 1,
  width: 1,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});
