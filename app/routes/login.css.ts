import { style } from "@vanilla-extract/css";
import { mainFont } from "~/styles/font.css";
import { themeContract } from "~/styles/themes.css";

export const page = style([mainFont, {
    width: '100vw',
    height: '100vh',
    background: themeContract.home.background,
    overflow: 'hidden',
    position: 'relative',
    color: themeContract.home.text
}])

export const container = style({
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '45rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem'
})

export const logo = style({
    height: '7rem'
})