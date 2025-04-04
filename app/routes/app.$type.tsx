import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useLocation } from '@remix-run/react';

import { UserList } from '~/components/App';

import { isChat, routes } from '~/constant/routes';

import * as styles from './app.$type.css';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ type: params.type });
};

export default function AppContent() {
  const location = useLocation();
  const { type = '' } = useLoaderData<typeof loader>();
  if (isChat(location.pathname)) {
    return (
      <>
        <UserList />
        <div className={styles.container} style={{ fontSize: '2rem' }}>
          <Outlet />
        </div>
      </>
    );
  }
  return (
    <>
      <div className={styles.container} style={{ fontSize: '2rem', color: 'orange' }}>
        {type}
      </div>
    </>
  );
}
