import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/variables.css";
import { themeContract } from "~/styles/themes.css";

export const heading = style({
    fontSize: vars.fontSize.large
})

export const loginForm = style({
    padding: '7rem 3rem 5rem 3rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    alignItems: 'center',
    border: '3px solid',
    borderRadius: '1rem'
})

export const formField = style({
    width: '100%'
})

export const formMessage = style({
    color: themeContract.colors.danger
})

export const formLink = style({
    textDecoration: 'underline !important'
})