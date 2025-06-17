import { Flex } from '@radix-ui/themes';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { ClientOnly } from 'remix-utils/client-only';
import { Button } from '~/components';
import { fetchAllDashboardItems } from '~/model/dashboard';

import { DashboardCard } from '~/components/app/DashboardCard';
import { EditableDashboardCard } from '~/components/app/DashboardCard/EditableDashboardCard';

import * as styles from '~/styles/app.teams.css';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const dashboardItems = await fetchAllDashboardItems();
  return json({ id: params.id, dashboardItems });
};

export default function DashboardContent() {
  const { id, dashboardItems } = useLoaderData<typeof loader>();
  const [addNew, setAddNew] = useState(false);

  useEffect(() => {
    setAddNew(false);
  }, [id]);

  return (
    <div className={styles.contentContainer}>
      <ul className={styles.dashboardListContainer}>
        {addNew && (
          <ClientOnly>
            {() => (
              <li key='__newDashboardCard' className={styles.dashboardListItem}>
                <EditableDashboardCard />
              </li>
            )}
          </ClientOnly>
        )}
        {dashboardItems.map((item) => (
          <li key={item.id} className={styles.dashboardListItem}>
            <DashboardCard data={item} />
          </li>
        ))}
      </ul>
      <Flex align='center' className={styles.footerContainer}>
        <Button
          onClick={() => {
            setAddNew((prev) => !prev);
          }}
        >
          <FaRegEdit />
          게시글 작성
        </Button>
      </Flex>
    </div>
  );
}
