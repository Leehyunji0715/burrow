import { style } from '@vanilla-extract/css';

import { themeContract } from '~/styles/themes.css';

export const container = style({});

export const chatSection = style({
  display: 'flex',
  flexDirection: 'column',
});

export const chatMessage = style({
  listStyle: 'none',
  padding: '1rem 2rem',
  background: themeContract.app.background,
});

export const curUserChatMessage = style([
  chatMessage,
  {
    textAlign: 'end',
    background: themeContract.colors.primarySub,
  },
]);
