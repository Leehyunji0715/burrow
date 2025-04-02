import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  colors: {
    primary: '#a584ff',
    secondary: '#7ecbff',
    highlight: '#ffac00',
    danger: '#e74c3c',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  fontSize: {
    small: '.75rem',
    medium: '1.5rem',
    medium2: '2rem',
    large: '3rem'
  }
});
