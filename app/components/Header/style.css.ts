import { style } from '@vanilla-extract/css';
import { themeContract } from '~/styles/themes.css';

export const base = style({
  height: '98vh',
  color: themeContract.colors.text,
  background: `linear-gradient(to left, ${themeContract.colors.primary}, ${themeContract.colors.secondary})`,
});
