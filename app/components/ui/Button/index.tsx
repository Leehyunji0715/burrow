import { Slot } from 'radix-ui';
import type { ComponentProps } from 'react';

import * as styles from './styles.css';

type Props = ComponentProps<'button'> & {
  variant?: keyof typeof styles.variant;
  size?: keyof typeof styles.size;
  pill?: boolean;
  block?: boolean;
  /** true 면 자식 요소(<Link> 등)에 버튼 스타일만 입힌다 */
  asChild?: boolean;
};

export function Button({
  variant = 'primary',
  size = 'md',
  pill = false,
  block = false,
  asChild = false,
  className,
  type = 'button',
  ...props
}: Props) {
  const classes = [
    styles.variant[variant],
    styles.size[size],
    pill && styles.pill,
    block && styles.block,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (asChild) return <Slot.Root className={classes} {...props} />;
  return <button type={type} className={classes} {...props} />;
}
