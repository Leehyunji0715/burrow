import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '~/styles/tokens.css';

const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space2,
  border: 0,
  borderRadius: vars.radiusLg,
  fontWeight: 700,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  transition: 'filter 120ms, background-color 120ms',
  selectors: {
    '&:hover:not(:disabled)': { filter: 'brightness(0.96)' },
    '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
  },
});

// 디자인 시스템 규칙: 화면당 핵심 행동 하나만 accent(오렌지), 두 번째 행동은 brand 채움이나 테두리.
export const variant = styleVariants({
  primary: [base, { background: vars.accent, color: vars.onAccent }],
  brand: [base, { background: vars.brand, color: vars.onBrand }],
  outline: [
    base,
    {
      background: vars.bgRaised,
      color: vars.brandText,
      boxShadow: `inset 0 0 0 1.5px ${vars.brand}`,
    },
  ],
  ghost: [
    base,
    {
      background: 'transparent',
      color: vars.inkSecondary,
      selectors: { '&:hover:not(:disabled)': { background: vars.brandSoft, filter: 'none' } },
    },
  ],
});

export const size = styleVariants({
  md: { height: vars.controlMd, padding: `0 ${vars.space4}`, fontSize: '15px' },
  lg: { height: vars.controlLg, padding: `0 ${vars.space6}`, fontSize: '16px' },
});

export const pill = style({ borderRadius: vars.radiusFull });
export const block = style({ width: '100%' });
