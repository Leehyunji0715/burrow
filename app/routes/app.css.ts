import { style } from "@vanilla-extract/css";
import { themeContract } from "~/styles/themes.css";

export const page = style([{
    width: '100vw',
    height: '100vh',
    background: themeContract.background.app,
    overflow: 'hidden',
    position: 'relative',
    color: themeContract.colors.textInBackground,
    display: 'flex'
}])

export const contentContainer = style({
    width: '100%',
    height: '100%',
    background: themeContract.background.appContent,
})