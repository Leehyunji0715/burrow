import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
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
