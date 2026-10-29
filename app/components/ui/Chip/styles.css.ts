import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '~/styles/tokens.css';

export const base = style({
  flex: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space1,
  padding: '4px 10px',
  borderRadius: vars.radiusFull,
  fontSize: '12px',
  fontWeight: 700,
  lineHeight: 1.3,
});

// 칩 바탕/글자 쌍은 디자인 시스템이 대비를 맞춰 둔 조합만 쓴다.
export const tone = styleVariants({
  notice: { background: vars.brandSoft, color: vars.brandStrong },
  urgent: { background: vars.accentSoft, color: vars.accentText },
  done: { background: vars.successSoft, color: vars.successText },
  neutral: { background: vars.bgSubtle, color: vars.inkSecondary },
});
