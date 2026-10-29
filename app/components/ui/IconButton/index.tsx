import type { ComponentProps } from 'react';

import * as styles from './styles.css';

type Props = Omit<ComponentProps<'button'>, 'aria-label'> & {
  /** 아이콘만 있어서 스크린 리더가 읽을 이름이 꼭 필요하다 */
  label: string;
};

export function IconButton({ label, className, type = 'button', ...props }: Props) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={[styles.root, className].filter(Boolean).join(' ')}
      {...props}
    />
  );
}
