import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ClientOnly } from 'remix-utils/client-only';
import { fetchAllDashboardItems } from '~/model/dashboard';

import { DashboardCard } from '~/components/app/DashboardCard';
import { EditableDashboardCard } from '~/components/app/EditableDashboardCard';

import * as styles from './app.teams.css';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const dashboardItems = await fetchAllDashboardItems();
  return json({ id: params.id, dashboardItems });
};

export default function DashboardContent() {
  const { dashboardItems } = useLoaderData<typeof loader>();
  return (
    <div className={styles.contentContainer}>
      <ClientOnly>{() => <EditableDashboardCard />}</ClientOnly>
      <ul className={styles.dashboardListContainer}>
        {dashboardItems.map((item) => (
          <li key={item.id} className={styles.dashboardListItem}>
            <DashboardCard data={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
