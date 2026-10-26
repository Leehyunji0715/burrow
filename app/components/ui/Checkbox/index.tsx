import type { ComponentProps, ReactNode } from 'react';

import * as styles from './styles.css';

type Props = Omit<ComponentProps<'input'>, 'type'> & { children: ReactNode };

export function Checkbox({ children, className, ...props }: Props) {
  return (
    <label className={[styles.root, className].filter(Boolean).join(' ')}>
      <input type='checkbox' className={styles.box} {...props} />
      {children}
    </label>
  );
}
