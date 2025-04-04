import { style } from "@vanilla-extract/css";
import { themeContract } from "~/styles/themes.css";

export const page = style([{
    width: '100vw',
    height: '100vh',
    background: themeContract.app.background,
    overflow: 'hidden',
    position: 'relative',
    color: themeContract.app.text,
    display: 'flex'
}])

export const contentContainer = style({
    width: '100%',
    height: '100%',
    background: themeContract.appContent.background
})