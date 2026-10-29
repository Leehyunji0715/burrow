import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/tokens.css';

export const sidebar = style({
  flex: 'none',
  width: vars.sidebarWidth,
  height: '100vh',
  position: 'sticky',
  top: 0,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: vars.space4,
  background: vars.brandSoft,
  borderRight: `1px solid ${vars.lineSidebar}`,
  vars: { '--avatar-ring': vars.brandSoft },
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  padding: `${vars.space5} ${vars.space5} ${vars.space3}`,
});

export const headerTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  minHeight: vars.controlMd,
  fontSize: '17px',
  fontWeight: 800,
});

export const headerMeta = style({ fontSize: '12px', color: vars.inkMuted });

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  padding: `${vars.space4} ${vars.space3} 0`,
});

export const sectionTitle = style({
  padding: '0 10px 6px',
  fontSize: '12px',
  fontWeight: 700,
  color: vars.inkMuted,
});

export const list = style({ display: 'flex', flexDirection: 'column', gap: '2px' });

export const item = style({
  minHeight: '40px',
  padding: '4px 10px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  borderRadius: vars.radiusMd,
  fontSize: '14px',
  color: vars.inkSecondary,
  selectors: { '&:hover': { background: vars.brandTint } },
});

export const itemUnread = style({ color: vars.ink, fontWeight: 700 });

export const itemActive = style({
  background: vars.bgRaised,
  color: vars.ink,
  fontWeight: 700,
  boxShadow: vars.shadowSm,
  vars: { '--avatar-ring': vars.bgRaised },
  selectors: { '&:hover': { background: vars.bgRaised } },
});

export const itemIcon = style({
  flex: 'none',
  fontSize: '18px',
  lineHeight: 0,
  color: vars.inkMuted,
});

export const itemText = style({
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const unread = style({
  minWidth: '20px',
  height: '20px',
  padding: '0 6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  background: vars.brand,
  color: vars.onBrand,
  fontSize: '11px',
  fontWeight: 700,
});

export const person = style({ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 });

export const personText = style({ display: 'flex', flexDirection: 'column', minWidth: 0 });

export const personName = style({ fontSize: '14px', fontWeight: 600, color: vars.ink });

export const personSub = style({
  fontSize: '12px',
  fontWeight: 400,
  color: vars.inkMuted,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const memberRow = style({
  minHeight: '48px',
  padding: '4px 10px',
  display: 'flex',
  alignItems: 'center',
});
