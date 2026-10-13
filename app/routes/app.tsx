import { Outlet } from 'react-router';

import { AppNavigation } from '~/components/app';

import * as styles from '~/styles/app.css';

export default function App() {
  return (
    <div className={styles.page}>
      <AppNavigation />
      <div className={styles.contentContainer}>
        <Outlet />
      </div>
    </div>
  );
}
