import { Link } from '@remix-run/react';

import * as styles from './homeNavigation.css';

export const HomeNavigation = () => {
  return (
    <nav className={styles.navContainer}>
      <Link to='/'>
        <img src='./app/assets/logo.svg' className={styles.logo} />
      </Link>
      <ul className={styles.listContainer}>
        <li className={styles.listItem}>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
};
