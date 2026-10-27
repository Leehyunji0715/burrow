import { style, styleVariants } from '@vanilla-extract/css';

import { projectPalette, vars } from '~/styles/tokens.css';

export const mark = style({
  flex: 'none',
  width: '30px',
  height: '30px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '9px',
  // 파스텔 타일은 두 테마 공통이라 글자는 항상 진한 색
  color: vars.onAccent,
  fontSize: '14px',
  fontWeight: 800,
  boxShadow: '0 0 0 1px rgba(28, 24, 48, 0.08)',
});

export const color = styleVariants(projectPalette, (c) => ({ background: c.tile }));
