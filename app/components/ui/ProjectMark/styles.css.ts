import { style, styleVariants } from '@vanilla-extract/css';

import { projectPalette, vars } from '~/styles/tokens.css';
import { displayFace } from '~/styles/typography.css';

export const mark = style({
  flex: 'none',
  width: '30px',
  height: '30px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '9px',
  ...displayFace,
  color: vars.onProject,
  fontSize: '14px',
  letterSpacing: 0,
  boxShadow: '0 0 0 1px rgba(28, 24, 48, 0.08)',
});

export const color = styleVariants(projectPalette, (c) => ({ background: c.tile }));
