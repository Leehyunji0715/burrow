import { globalFontFace, globalStyle } from '@vanilla-extract/css';

import { themeContract } from './themes.css';

const mainFont = 'HakgyoansimDunggeunmisoTTF-B';

globalFontFace(mainFont, {
  src: 'url("https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimDunggeunmisoTTF-B.woff2") format("woff2")',
  fontWeight: 300,
  fontStyle: 'normal',
});

globalStyle('html', {
  fontFamily: mainFont,
  fontSize: '62.5%',
  color: themeContract.colors.text,
});

globalStyle('body, *', {
  margin: 0,
  padding: 0,
  overflowX: 'hidden',
});


globalStyle('a, a:link, a:visited', {
  color: 'currentColor',
  textDecoration: 'none',
});