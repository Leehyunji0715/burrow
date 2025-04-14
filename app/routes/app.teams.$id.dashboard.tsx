import { Avatar, Box, Container, Flex, Text } from '@radix-ui/themes';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { fetchAllDashboardItems } from '~/model/dashboard';
import { Team, sampleGetMyTeam } from '~/model/team';

import { DashboardCard } from '~/components/app/DashboardCard';

import * as styles from './app.teams.css';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const dashboardItems = await fetchAllDashboardItems();
  return json({ id: params.id, dashboardItems });
};

export default function DashboardContent() {
  const { dashboardItems } = useLoaderData<typeof loader>();
  return (
    <div className={styles.contentContainer}>
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
