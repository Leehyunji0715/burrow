import { style } from "@vanilla-extract/css";
import { themeContract } from "~/styles/themes.css";

export const container = style({
    display: 'flex',
    alignItems: 'center',
    gap: '2.5rem',
    padding: '1rem',
    borderRadius: '.5rem',
    ':hover': {
        background: themeContract.app.backgroundHover
    }
})

export const userName = style({
    flexGrow: 1
})