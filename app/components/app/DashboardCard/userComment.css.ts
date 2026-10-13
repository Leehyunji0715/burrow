import { style } from '@vanilla-extract/css';

import { themeContract } from '~/styles/themes.css';
import { vars } from '~/styles/variables.css';

export const commentsDate = style({
  fontSize: vars.fontSize.small,
  color: themeContract.colors.textSub,
});
