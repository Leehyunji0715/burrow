import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '~/styles/tokens.css';

export const root = style({
  position: 'relative',
  flex: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: vars.radiusFull,
  // 아바타 바탕은 두 테마 공통 파스텔이라 글자는 항상 on-accent(진한 남색)
  color: vars.onAccent,
  fontWeight: 700,
});

export const size = styleVariants({
  sm: { width: '32px', height: '32px', fontSize: '11px' },
  md: { width: '38px', height: '38px', fontSize: '12px' },
});

export const tone = styleVariants({
  1: { background: vars.avatar1 },
  2: { background: vars.avatar2 },
  3: { background: vars.avatar3 },
  4: { background: vars.avatar4 },
  5: { background: vars.avatar5 },
});

export const dot = style({
  position: 'absolute',
  right: '-1px',
  bottom: '-1px',
  width: '11px',
  height: '11px',
  borderRadius: vars.radiusFull,
  // 바탕색 테두리로 아바타와 점을 떼어 놓는다. 바탕은 부모가 --avatar-ring 으로 정한다.
  boxShadow: `0 0 0 2px var(--avatar-ring, ${vars.bgRaised})`,
});

export const presence = styleVariants({
  online: { background: vars.presenceOnline },
  away: { background: vars.presenceAway },
  offline: { background: vars.presenceOffline },
});
