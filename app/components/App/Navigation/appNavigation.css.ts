import { style } from '@vanilla-extract/css';

import { themeContract } from '~/styles/themes.css';

export const navContainer = style({
  width: '12rem',
  height: '100%',
  flex: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  padding: '1rem 2rem',
  color: themeContract.colors.textContrast,
  background: themeContract.colors.primary,
  gap: '1rem',
  fontSize: '3rem',
});

export const logo = style({
  height: '5rem',
});

export const listContainer = style({
  width: '100%',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

export const listItem = style({
  listStyle: 'none',
  padding: '1rem',
  textAlign: 'center',
  ':hover': {
    color: themeContract.colors.highlight,
    cursor: 'pointer',
  },
  selectors: {
    '&:last-child': {
      marginTop: 'auto',
    },
  },
});

export const activeLink = style({
  color: `${themeContract.colors.highlight} !important`,
});
