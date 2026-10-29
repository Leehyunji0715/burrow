import type { ReactNode } from 'react';

import * as styles from './styles.css';

type Props = {
  tone: keyof typeof styles.tone;
  children: ReactNode;
};

export function Chip({ tone, children }: Props) {
  return <span className={[styles.base, styles.tone[tone]].join(' ')}>{children}</span>;
}
