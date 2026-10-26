import { type ComponentProps, type ReactNode, useId, useState } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';

import { IconButton } from '../IconButton';
import * as styles from './styles.css';

type Props = ComponentProps<'input'> & {
  label: string;
  /** 입력창 아래 안내 (조건 목록 등) */
  hint?: ReactNode;
  error?: string;
  /** 입력창 오른쪽 옆에 붙는 요소 (중복 확인 버튼 등) */
  addon?: ReactNode;
};

export function TextField({ label, hint, error, addon, id, className, ...props }: Props) {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;
  const messageId = `${inputId}-message`;

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <div className={styles.row}>
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? messageId : undefined}
          className={[styles.input, className].filter(Boolean).join(' ')}
          {...props}
        />
        {addon}
      </div>
      {error ? (
        <p id={messageId} className={styles.error} role='alert'>
          {error}
        </p>
      ) : (
        hint && (
          <div id={messageId} className={styles.hint}>
            {hint}
          </div>
        )
      )}
    </div>
  );
}

export function PasswordField({
  label,
  hint,
  error,
  id,
  ...props
}: Omit<Props, 'type' | 'addon' | 'className'>) {
  const [visible, setVisible] = useState(false);
  const fallbackId = useId();
  const inputId = id ?? fallbackId;
  const messageId = `${inputId}-message`;

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <div className={styles.row}>
        <input
          id={inputId}
          type={visible ? 'text' : 'password'}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? messageId : undefined}
          className={[styles.input, styles.withTrailing].join(' ')}
          {...props}
        />
        <span className={styles.trailing}>
          <IconButton
            label={visible ? '비밀번호 숨기기' : '비밀번호 보기'}
            onClick={() => setVisible((v) => !v)}
          >
            {visible ? <LuEyeOff /> : <LuEye />}
          </IconButton>
        </span>
      </div>
      {error ? (
        <p id={messageId} className={styles.error} role='alert'>
          {error}
        </p>
      ) : (
        hint && (
          <div id={messageId} className={styles.hint}>
            {hint}
          </div>
        )
      )}
    </div>
  );
}
