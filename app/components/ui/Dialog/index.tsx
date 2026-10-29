import { Dialog as RadixDialog } from 'radix-ui';
import type { ReactNode } from 'react';
import { LuX } from 'react-icons/lu';

import { IconButton } from '../IconButton';
import * as styles from './styles.css';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
};

/** Radix Dialog 에 디자인 시스템 모양만 입힌 것. 포커스 가두기·Esc 닫기는 Radix 가 맡는다 */
export function Dialog({ open, onOpenChange, title, description, children }: Props) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.overlay} />
        <RadixDialog.Content
          className={styles.content}
          // 설명이 없을 때 Radix 의 접근성 경고를 끈다 (제목만으로 충분한 대화상자)
          {...(description ? {} : { 'aria-describedby': undefined })}
        >
          <div className={styles.head}>
            <RadixDialog.Title className={styles.title}>{title}</RadixDialog.Title>
            <RadixDialog.Close asChild>
              <IconButton label='닫기'>
                <LuX />
              </IconButton>
            </RadixDialog.Close>
          </div>
          {description && (
            <RadixDialog.Description className={styles.description}>
              {description}
            </RadixDialog.Description>
          )}
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
