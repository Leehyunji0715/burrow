import { style } from "@vanilla-extract/css";
import { mainFont } from '~/styles/font.css';
import { vars } from "~/styles/variables.css";
import { themeContract } from "~/styles/themes.css";

export const container = style([mainFont, {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: "1rem 2rem",
    color: themeContract.colors.textContrast,
    background: themeContract.background.home
}]);

export const logo = style({
    height: '5rem'
});

export const navContainer = style({
    display: 'flex',
    gap: '1rem',
    fontSize: vars.fontSize.medium2
});

export const navItem = style({
    listStyle: 'none'
})