import { style } from '@vanilla-extract/css';
import { themeContract } from '~/styles/themes.css';

export const base = style({
  position: 'relative',
  overflow: 'hidden',
});

export const header = style({
  height: '97vh',
  color: themeContract.colors.text,
  background: `linear-gradient(to left, ${themeContract.colors.primary}, ${themeContract.colors.secondary})`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const messageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textTransform: 'uppercase',
});

export const mainMessage = style({
  fontSize: '10rem',
  letterSpacing: 10,
});

export const subMessage = style({
  fontSize: '5rem',
  letterSpacing: 2,
});

export const wave = style({
  width: '110vw',
  position: 'absolute',
  bottom: '-8%',
});

// 움직이는 Wave animation
// .wave {
//   position: absolute;
//   width: 6400px;
//   height: $wave-height;
//   background: url('/img/wave.svg') repeat-x;

// const rotate = keyframes({
//   'from': { transform: "rotate(0deg)" },
//   'to': { transform: "rotate(360deg)" }
// });

// export const wave = style({
//   zIndex: 1,
//   position: 'absolute',
//   top: '90%',
//   left: '50%',
//   width: '200vw',
//   height: '200vw',
//   marginLeft: '-100vw',
//   marginTop: '-198vw',
//   borderRadius: '40%'
// });

// export const waveOne = style([wave, {
//   animation: `${rotate} 10000ms infinite linear`,
//   opacity: '0.5',
//   background: themeContract.colors.primary
// }])

// export const waveTwo = style([wave, {
//   animation: `${rotate} 13500ms infinite linear`,
//   opacity: '0.1',
//   background: 'yellow'
// }])

// export const waveThree = style([wave, {
//   animation: `${rotate} 11000ms infinite linear`,
//   opacity: '0.1',
//   background: themeContract.colors.secondary
// }])
