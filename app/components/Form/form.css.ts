import { style } from '@vanilla-extract/css';

import { themeContract } from '~/styles/themes.css';
import { vars } from '~/styles/variables.css';

export const heading = style({
  fontSize: vars.fontSize.large,
});

export const loginForm = style({
  padding: '7rem 3rem 5rem 3rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  alignItems: 'center',
  border: '3px solid',
  borderRadius: '1rem',
});

export const formField = style({
  width: '100%',
});

const required = style({
  position: 'relative',
  width: 'auto',
  '::after': {
    content: '*',
    color: themeContract.colors.danger,
    position: 'absolute',
    top: '-5px',
    right: '-13px',
  },
});

export const formLabel = style({});
export const formRequiredLabel = style([required, {}]);

export const formMessage = style({
  color: themeContract.colors.danger,
});

export const formLink = style({
  textDecoration: 'underline !important',
});
