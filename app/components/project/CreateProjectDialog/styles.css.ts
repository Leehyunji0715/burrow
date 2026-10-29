import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/tokens.css';

export const form = style({ display: 'flex', flexDirection: 'column', gap: vars.space5 });

export const actions = style({ display: 'flex', justifyContent: 'flex-end', gap: vars.space2 });
