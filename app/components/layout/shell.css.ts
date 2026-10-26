import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/tokens.css';

/** 앱 화면 전체: 레일 | 목록 열 | 본문 */
export const app = style({
  display: 'flex',
  minHeight: '100vh',
  background: vars.bg,
});

export const content = style({
  flex: 1,
  minWidth: 0,
  display: 'flex',
});

export const dialogForm = style({ display: 'flex', flexDirection: 'column', gap: vars.space5 });

export const dialogActions = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: vars.space2,
});

export const notFound = style({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space5,
});

export const notFoundTitle = style({ fontSize: '26px', fontWeight: 800 });

export const empty = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.inkMuted,
});
