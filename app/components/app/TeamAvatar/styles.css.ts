import { style } from '@vanilla-extract/css';

import { themeContract } from '~/styles/themes.css';

export const avatarContainer = style({
  background: themeContract.colors.primary,
  padding: '.5rem',
});
