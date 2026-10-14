import { globalStyle, style } from '@vanilla-extract/css';

import { themeContract } from '~/styles/themes.css';

import { CARD_BORDER_COLOR, CARD_PADDING, CARD_RADIUS, CARD_SHADOW } from './card.css';

export const container = style({
  boxShadow: CARD_SHADOW,
  borderRadius: CARD_RADIUS,
});

export const titleContainer = style({
  padding: CARD_PADDING,
});

globalStyle(`${titleContainer} input`, {
  textIndent: 'unset',
  borderBottom: `2px solid transparent`,
  transition: 'border 100ms',
});

globalStyle(`${titleContainer} input:focus`, {
  borderBottom: `2px solid ${themeContract.colors.primary}`,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
});

globalStyle(`${titleContainer} > div`, {
  outline: 'none',
  boxShadow: 'none',
});

export const headerContainer = style({
  padding: CARD_PADDING,
  fontSize: 'var(--font-size-3)',
  fontWeight: 'var(--font-weight-medium)',
  borderBottom: `1px solid ${CARD_BORDER_COLOR}`,
});

export const editorContainer = style({
  padding: CARD_PADDING,
  paddingTop: 0,
  paddingBottom: 0,
});

globalStyle(`${editorContainer} .ql-editor`, {
  minHeight: '15rem',
  maxHeight: '25rem',
});

export const footerContainer = style({
  padding: CARD_PADDING,
  alignSelf: 'end',
});

export const footerButton = style({
  padding: '0 3rem',
});
