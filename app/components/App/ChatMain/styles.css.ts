import { style } from '@vanilla-extract/css';

import { themeContract } from '~/styles/themes.css';

const MESSAGE_GAP = '4rem';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: MESSAGE_GAP,
  overflow: 'auto',
  padding: '2rem 4rem',
});

export const chatSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: MESSAGE_GAP,
});

export const chatMessageItem = style({
  listStyle: 'none',
});

export const curUserchatMessageItem = style([
  chatMessageItem,
  {
    textAlign: 'end',
  },
]);

export const chatMessage = style({
  padding: '1rem 2rem',
  background: themeContract.app.background,
});

export const curUserChatMessage = style([
  chatMessage,
  {
    background: themeContract.colors.primarySub,
  },
]);
