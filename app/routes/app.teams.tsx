import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import { MyTeamList } from '~/components/app';

import * as styles from './app.$type.css';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ type: params.type });
};

export default function AppContent() {
  return (
    <>
      <MyTeamList />
      <div className={styles.container} style={{ fontSize: '2rem' }}>
        <Outlet />
      </div>
    </>
  );
}
