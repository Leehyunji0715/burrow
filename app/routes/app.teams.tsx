import type { LoaderFunctionArgs } from 'react-router';
import { Outlet } from 'react-router';

import { MyTeamList } from '~/components/app';

import * as styles from '~/styles/app.$type.css';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return { type: params.type };
};

export default function AppContent() {
  return (
    <>
      <MyTeamList />
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
}
