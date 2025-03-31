import { style } from "@vanilla-extract/css";
import { themeContract } from "~/styles/themes.css";

export const root = style({
  color: themeContract.colors.highlightText,
  border: "2px solid currentColor",
  padding: '.5rem 1rem',
  borderRadius: 7,
  background: themeContract.colors.highlight,
  ':hover': {
    transform: 'translateY(-1.5px)'
  },
  ':active': {
    filter: 'brightness(0.95)',
    transform: 'translateY(1px)',
  }
});
