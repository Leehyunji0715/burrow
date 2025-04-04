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
    textInBackground: ''
  },
  background: {
    home: '',
    app: '',
    appContent: ''
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
    textInBackground: 'white',
  },
  background: {
    home: `linear-gradient(to left, ${themeContract.colors.primary}, ${themeContract.colors.secondary})`,
    app: `#a584ff99`,
    appContent: 'white'
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
    textInBackground: ''
  },
  background: {
    home: '',
    app: '',
    appContent: ''
  }
});
