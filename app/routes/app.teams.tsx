import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import { MyTeamList } from '~/components/app';

import * as styles from '~/styles/app.$type.css';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ type: params.type });
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
