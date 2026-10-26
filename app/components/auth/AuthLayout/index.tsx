import type { ReactNode } from 'react';
import { Link } from 'react-router';

import { Logo } from '~/components/ui/Logo';

import { paths } from '~/constant/routes';

import * as styles from './styles.css';

type Props = {
  /** 왼쪽 브랜드 패널의 내용 */
  brand: ReactNode;
  children: ReactNode;
};

/** 로그인·회원가입 공통: 왼쪽 브랜드 패널 + 오른쪽 폼 */
export function AuthLayout({ brand, children }: Props) {
  return (
    <div className={styles.page}>
      <aside className={styles.brandPanel}>
        <span className={styles.orbLarge} aria-hidden='true' />
        <span className={styles.orbSmall} aria-hidden='true' />
        <Link to={paths.home} aria-label='Burrow 홈'>
          <Logo withWordmark />
        </Link>
        <div className={styles.brandBody}>{brand}</div>
        <p className={styles.motto}>FOR OUR FUTURE</p>
      </aside>
      <main className={styles.formArea}>{children}</main>
    </div>
  );
}
