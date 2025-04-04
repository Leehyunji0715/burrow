import { globalStyle } from '@vanilla-extract/css';

import { themeContract } from './themes.css';

globalStyle('html', {
  fontSize: '62.5%',
  color: themeContract.colors.text,
});

globalStyle('body', {
  overflowX: 'hidden',
});

globalStyle('body, *', {
  margin: 0,
  padding: 0,
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('a, a:link, a:visited', {
  color: 'currentColor',
  textDecoration: 'none',
});
