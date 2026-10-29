import type { ReactNode } from 'react';

import * as styles from './styles.css';

type Props = { title: string; description?: string; action?: ReactNode };

/** 대시보드·파일처럼 스크롤되는 프로젝트 화면의 상단 */
export function PageHeader({ title, description, action }: Props) {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {action}
    </header>
  );
}
