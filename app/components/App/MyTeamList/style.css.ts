import { keyframes, style } from '@vanilla-extract/css';
import { themeContract } from '~/styles/themes.css';

export const accordionRoot = style({
  borderRadius: 6,
  width: '100%'
})

export const accordionItem = style({
  overflow: 'hidden',
  marginTop: 1
})

export const accordionHeader = style({
  display: 'flex'
})

const hoverStyle = style({
  cursor: 'pointer',
  ':hover': {
    backgroundColor: themeContract.app.backgroundHover
  }
})

export const accordionTrigger = style([hoverStyle, {
  border: 'none',
	backgroundColor: 'transparent',
	padding: '.5rem 1rem',
  width: '100%',
	flex: 1,
	display: 'flex',
	alignItems: 'center',
  gap: '1rem'
}])

export const accordionTriggerAvater = style({
  background: themeContract.colors.primary,
  padding: '.5rem'
})

export const accorionChevron = style({
  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  selectors: {
    [`${accordionTrigger}[data-state="open"] > &`]: {
      transform: 'rotate(90deg)'
    }
  }
})


const slideDown = keyframes({
  '0%': { height: 0 },
  '100%': { height: 'var(--radix-accordion-content-height)' }
})

const slideUp = keyframes({
  '0%': { height: 'var(--radix-accordion-content-height)' },
  '100%': { height: 0 }
})

export const accordionContent = style([hoverStyle, {
  overflow: 'hidden',
  selectors: {
    '[data-state="open"] &': {
      animation: `${slideDown} 150ms ease-out`
    },
    '[data-state="closed"] &': {
      animation: `${slideUp} 150ms ease-out`
    }
  }
}])

export const accordionContentText = style({
	padding: '.5rem 4rem'
})