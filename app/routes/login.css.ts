import { style } from "@vanilla-extract/css";
import { mainFont } from "~/styles/font.css";
import { vars } from "~/styles/variables.css";
import { themeContract } from "~/styles/themes.css";

export const page = style([mainFont, {
    width: '100vw',
    height: '100vh',
    background: themeContract.background.home,
    overflow: 'hidden',
    position: 'relative',
    color: themeContract.colors.textContrast
}])

export const container = style({
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem'
})

export const heading = style({
    fontSize: vars.fontSize.large
})

export const logo = style({
    height: '7rem'
})

export const loginForm = style({
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    alignItems: 'center'
})

export const formField = style({
    width: '100%'
})

export const formMessage = style({
    color: themeContract.colors.danger
})