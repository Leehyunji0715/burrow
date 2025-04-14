import { style } from '@vanilla-extract/css';

export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1rem 6rem',
});

export const dashboardListContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const dashboardListItem = style({
  listStyle: 'none',
});
