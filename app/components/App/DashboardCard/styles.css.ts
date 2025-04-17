import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/variables.css';

import { CARD_BORDER_COLOR, CARD_PADDING, CARD_RADIUS, CARD_SHADOW } from './card.css';

export const container = style({
  boxShadow: CARD_SHADOW,
  borderRadius: CARD_RADIUS,
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
  borderTop: `1px solid ${CARD_BORDER_COLOR}`,
});

export const commentInput = style({
  margin: CARD_PADDING,
});
