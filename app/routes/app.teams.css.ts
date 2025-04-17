import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  height: '100%',
  overflow: 'auto',
});

export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  height: '100%',
  overflow: 'auto',
});

const contentPadding = style({
  padding: '1px 12rem',
});

export const dashboardListContainer = style([
  contentPadding,
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    flexGrow: '1',
    overflow: 'auto',
  },
]);

export const dashboardListItem = style({
  listStyle: 'none',
});

export const footerContainer = style([
  contentPadding,
  {
    height: '15rem',
  },
]);
