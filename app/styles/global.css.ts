import { globalStyle } from '@vanilla-extract/css';

import { themeContract } from './themes.css';

globalStyle('html', {
  fontSize: '62.5%',
  color: themeContract.colors.text,
});

globalStyle('body, *', {
  margin: 0,
  padding: 0,
  overflowX: 'hidden',
});
