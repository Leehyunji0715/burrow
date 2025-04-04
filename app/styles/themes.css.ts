import { createTheme, createThemeContract } from '@vanilla-extract/css';
import { red } from "@radix-ui/colors";

export const themeContract = createThemeContract({
  colors: {
    primary: '',
    secondary: '',
    highlight: '',
    highlightText: '',
    danger: '',
    text: '',
    textContrast: '',
  },
  home: {
    text: '',
    background: '',
  },
  app: {
    text: '',
    background: ``,
    backgroundHover: ''
  },
  appContent: {
    text: '',
    background: ''
  }
});

export const lightTheme = createTheme(themeContract, {
  colors: {
    primary: '#a584ff',
    secondary: '#7ecbff',
    highlight: '#ffac00',
    highlightText: 'white',
    danger: red.red11,
    text: '#252525',
    textContrast: 'white',
  },
  home: {
    text: 'white',
    background: `linear-gradient(to left, ${themeContract.colors.primary}, ${themeContract.colors.secondary})`,
  },
  app: {
    text: '#252525',
    background: '#f0f0f0',
    backgroundHover: '#fafafa'
  },
  appContent: {
    text: '#252525',
    background: 'white'
  }
});

// TODO: Add Dark Theme
export const darkTheme = createTheme(themeContract, {
  colors: {
    primary: '',
    secondary: '',
    highlight: '',
    highlightText: '',
    danger: '',
    text: '',
    textContrast: ''
  },
  home: {
    text: '',
    background: '',
  },
  app: {
    text: '',
    background: '',
    backgroundHover: ''
  },
  appContent: {
    text: '',
    background: ''
  }
});
