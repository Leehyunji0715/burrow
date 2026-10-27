import { style, styleVariants } from '@vanilla-extract/css';

import { projectPalette, vars } from '~/styles/tokens.css';

export const fieldset = style({ margin: 0, padding: 0, border: 0 });

export const legend = style({ marginBottom: vars.space2, fontSize: '14px', fontWeight: 600 });

export const swatches = style({ display: 'flex', flexWrap: 'wrap', gap: vars.space2 });

export const swatch = style({
  position: 'relative',
  width: vars.controlSm,
  height: vars.controlSm,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: vars.radiusLg,
  boxShadow: '0 0 0 1px rgba(28, 24, 48, 0.08)',
  cursor: 'pointer',
  selectors: {
    '&:has(input:checked)': { boxShadow: `0 0 0 2px ${vars.bgRaised}, 0 0 0 4px ${vars.brand}` },
    '&:has(input:focus-visible)': { outline: `2px solid ${vars.brand}`, outlineOffset: '4px' },
  },
});

export const color = styleVariants(projectPalette, (c) => ({ background: c.tile }));

// 원래 라디오 모양은 숨기고 색 칸을 누르게 한다. 접근성 트리에는 라디오로 남는다.
export const radio = style({
  position: 'absolute',
  inset: 0,
  margin: 0,
  opacity: 0,
  cursor: 'pointer',
});

export const check = style({ color: vars.onAccent, fontSize: '18px', pointerEvents: 'none' });
