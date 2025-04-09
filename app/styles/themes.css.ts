import { red } from '@radix-ui/colors';
import { createTheme, createThemeContract } from '@vanilla-extract/css';

export const themeContract = createThemeContract({
  colors: {
    primary: '',
    secondary: '',
    highlight: '',
    highlightText: '',
    danger: '',
    primarySub: '',
    text: '',
    textContrast: '',
  },
  home: {
    background: '',
  },
  app: {
    background: ``,
    backgroundHover: '',
  },
  appContent: {
    background: '',
  },
});

export const lightTheme = createTheme(themeContract, {
  colors: {
    primary: '#a584ff',
    secondary: '#7ecbff',
    highlight: '#ffac00',
    highlightText: 'white',
    danger: red.red11,
    primarySub: hexToRgba('#a584ff', 0.2),
    text: '#252525',
    textContrast: 'white',
  },
  home: {
    background: `linear-gradient(to left, ${themeContract.colors.primary}, ${themeContract.colors.secondary})`,
  },
  app: {
    background: '#f0f0f0',
    backgroundHover: '#fafafa',
  },
  appContent: {
    background: 'white',
  },
});

// TODO: Add Dark Theme
export const darkTheme = createTheme(themeContract, {
  colors: {
    primary: '',
    secondary: '',
    highlight: '',
    highlightText: '',
    danger: '',
    primarySub: '',
    text: '',
    textContrast: '',
  },
  home: {
    background: '',
  },
  app: {
    background: '',
    backgroundHover: '',
  },
  appContent: {
    background: '',
  },
});

function hexToRgba(hex: string, opacity = 1) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '';
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
