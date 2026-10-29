import { style } from '@vanilla-extract/css';

import { mobile } from '~/styles/media';
import { vars } from '~/styles/tokens.css';
import { displayFace } from '~/styles/typography.css';

/**
 * 앱 화면 전체. 넓은 화면: 레일 | 목록 열 | 본문
 * 좁은 화면: 본문이 화면 높이를 채우고, 레일은 맨 아래 탭 바가 된다
 */
export const app = style({
  display: 'flex',
  minHeight: '100vh',
  background: vars.bg,
  '@media': {
    [mobile]: {
      // 레일이 DOM 에서 먼저 오지만 화면에서는 아래로 보낸다 (탭 순서는 그대로 레일 → 본문)
      flexDirection: 'column-reverse',
      height: '100dvh',
      minHeight: 0,
      overflow: 'hidden',
    },
  },
});

export const main = style({
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  display: 'flex',
  outline: 'none',
});

export const skipLink = style({
  position: 'absolute',
  top: vars.space2,
  left: vars.space2,
  zIndex: 100,
  padding: `${vars.space2} ${vars.space4}`,
  borderRadius: vars.radiusMd,
  background: vars.night,
  color: vars.onBrand,
  fontWeight: 700,
  // 평소에는 화면 밖에 두고, 포커스를 받으면 보인다
  transform: 'translateY(-200%)',
  selectors: { '&:focus-visible': { transform: 'none' } },
});

export const content = style({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  '@media': {
    [mobile]: {
      // 위: 목록 여는 상단 바 / 아래: 본문. 탭 바를 뺀 높이 안에서 본문만 스크롤된다
      flexDirection: 'column',
      minHeight: 0,
      overflowY: 'auto',
      overscrollBehavior: 'contain',
    },
  },
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

export const notFoundTitle = style({ ...displayFace, fontSize: '26px' });

export const empty = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.inkMuted,
});
