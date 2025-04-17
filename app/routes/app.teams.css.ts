import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'auto',
});

globalStyle(`${container} > div:first-child`, {
  paddingBottom: '1rem',
});

export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
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

globalStyle(`${dashboardListContainer} li:first-child`, {
  marginTop: '1rem',
});

export const dashboardListItem = style({
  listStyle: 'none',
});

export const footerContainer = style([
  contentPadding,
  {
    height: '8rem',
    flexGrow: 0,
    flexShrink: 0,
  },
]);
