import { style } from '@vanilla-extract/css';

import { themeContract } from '~/styles/themes.css';
import { vars } from '~/styles/variables.css';

const MESSAGE_GAP = '2rem';

export const container = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  fontSize: vars.fontSize.medium,
  padding: '1rem 2rem',
  gap: '1rem'
});

export const chatContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: MESSAGE_GAP,
  overflow: 'auto',
  padding: '2rem 4rem',
});

export const chatDate = style({
  textAlign: 'center'
})

export const chatSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: MESSAGE_GAP,
});

export const chatMessageItem = style({
  listStyle: 'none',
  display: 'flex',
  gap: '1rem',
  alignItems: 'center'
});

export const curUserchatMessageItem = style([
  chatMessageItem,
  {
    justifyContent: 'end',
  },
]);

export const chatMessage = style({
  display: 'inline-block',
  padding: '.5rem 1rem',
  background: themeContract.app.background,
  maxWidth: '70%',
  borderRadius: 5
});

export const curUserChatMessage = style([
  chatMessage,
  {
    background: themeContract.colors.primarySub,
  },
]);

export const inputTextContainer = style({
  padding: '2rem 4rem',
})

export const inputTextSlot = style({
  padding: '.5rem'
})

export const inputText = style({
  height: '4.5rem'
})

export const inputTextButton = style({
  cursor: 'pointer',
  boxShadow: 'none',
  color: themeContract.colors.text,
  fontSize: vars.fontSize.medium2
})