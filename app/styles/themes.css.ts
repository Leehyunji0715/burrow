import { createTheme, createThemeContract } from '@vanilla-extract/css';

export const themeContract = createThemeContract({
  colors: {
    primary: 'primary',
    secondary: 'secondary',
    highlight: 'highlight',
    highlightText: 'highlightText',
    danger: 'danger',
    text: 'black',
  },
})

export const lightTheme = createTheme(themeContract, {
  colors: {
    primary: '#a584ff',
    secondary: '#7ecbff',
    highlight: '#ffac00',
    highlightText: 'white',
    danger: '#e74c3c',
    text: 'black',
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
    text: '',
  },
});