import { globalStyle, style } from '@vanilla-extract/css';

import { mobile } from '~/styles/media';
import { vars } from '~/styles/tokens.css';

export const page = style({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space6,
  padding: `${vars.space8} ${vars.space8} ${vars.space10}`,
  background: vars.bg,
  minHeight: '100vh',
  '@media': { [mobile]: { padding: vars.space4, minHeight: 0 } },
});

export const summary = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: vars.space4,
});

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space1,
  padding: vars.space5,
  border: `1px solid ${vars.line}`,
  borderRadius: vars.radiusXl,
  background: vars.bgRaised,
});

export const cardUrgent = style({ background: vars.accentSoft, borderColor: 'transparent' });

export const cardLabel = style({ fontSize: '13px', fontWeight: 700, color: vars.brandText });

globalStyle(`${cardUrgent} ${cardLabel}`, { color: vars.accentText });

export const cardValue = style({ fontSize: '22px', fontWeight: 800 });
export const cardValueSm = style({ fontSize: '18px', fontWeight: 700 });
export const cardSub = style({ fontSize: '13px', color: vars.inkMuted });

export const columns = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 300px',
  alignItems: 'start',
  gap: vars.space6,
  '@media': { 'screen and (max-width: 1100px)': { gridTemplateColumns: 'minmax(0, 1fr)' } },
});

export const empty = style({
  padding: vars.space10,
  border: `1.5px dashed ${vars.lineDashed}`,
  borderRadius: vars.radiusXl,
  textAlign: 'center',
  color: vars.inkMuted,
});

export const posts = style({ display: 'flex', flexDirection: 'column', gap: vars.space4 });

export const post = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space3,
  padding: vars.space6,
  border: `1px solid ${vars.line}`,
  borderRadius: vars.radiusXl,
  background: vars.bgRaised,
  scrollMarginTop: vars.space6,
});

export const postHead = style({ display: 'flex', alignItems: 'center', gap: vars.space3 });
export const postMeta = style({ flex: 1, display: 'flex', flexDirection: 'column' });
export const postAuthor = style({ fontSize: '14px', fontWeight: 700 });
export const postDate = style({ fontSize: '12px', color: vars.inkSubtle });
export const postTitle = style({ fontSize: '18px', fontWeight: 700 });

export const postBody = style({ fontSize: '15px', color: vars.inkSecondary });

export const postFoot = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space3,
  paddingTop: vars.space2,
  borderTop: `1px solid ${vars.line}`,
});

export const ackCount = style({ fontSize: '13px', color: vars.inkMuted });

export const members = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space3,
  padding: vars.space5,
  border: `1px solid ${vars.line}`,
  borderRadius: vars.radiusXl,
  background: vars.bgRaised,
  vars: { '--avatar-ring': vars.bgRaised },
});

export const membersTitle = style({ fontSize: '16px', fontWeight: 700 });

export const memberList = style({ display: 'flex', flexDirection: 'column', gap: vars.space3 });

export const memberRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space2,
});
