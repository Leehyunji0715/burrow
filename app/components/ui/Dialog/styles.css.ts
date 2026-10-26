import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/tokens.css';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  background: 'rgba(18, 16, 34, 0.45)',
  zIndex: 40,
});

export const content = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'min(440px, calc(100vw - 32px))',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space4,
  padding: vars.space6,
  borderRadius: vars.radius2xl,
  background: vars.bgRaised,
  boxShadow: '0 24px 64px rgba(18, 16, 34, 0.3)',
  zIndex: 41,
});

export const head = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space3,
});

export const title = style({ fontSize: '20px', fontWeight: 800 });

export const description = style({
  marginTop: `calc(${vars.space2} * -1)`,
  color: vars.inkMuted,
  fontSize: '14px',
});
