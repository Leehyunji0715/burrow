import { style } from '@vanilla-extract/css';

export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  height: '100%',
  overflow: 'auto',
});

export const dashboardListContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '1px 12rem',
});

export const dashboardListItem = style({
  listStyle: 'none',
});
