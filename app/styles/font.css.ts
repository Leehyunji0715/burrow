import { globalFontFace, style } from '@vanilla-extract/css';


const mainFontName = 'HakgyoansimDunggeunmisoTTF-B';

globalFontFace(mainFontName, {
  src: 'url("https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimDunggeunmisoTTF-B.woff2") format("woff2")',
  fontWeight: 100,
  fontStyle: 'normal',
});


export const mainFont = style({
    fontFamily: mainFontName
});