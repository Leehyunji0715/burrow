import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { Team, sampleGetMyTeam } from '~/model/team';

import * as styles from './app.teams.css';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ id: params.id });
};

export default function DashboardContent() {
  const { id = '' } = useLoaderData<typeof loader>();
  const [team, setTeam] = useState<Team>({ id: '', name: '' });

  useEffect(() => {
    if (!id) return;
    sampleGetMyTeam(id).then((response) => {
      setTeam(response ?? { id: '', name: '' });
    });
  }, [id]);

  return <div className={styles.contentContainer}></div>;
}

const dataList = [
  {
    id: '1',
    title: 'Title 1',
    author: 'Jhon Doe',
    authorImage: 'https://randomuser.me/api/portraits/men/10.jpg',
    content: '내일까지 작업 마감 부탁드립니다.',
  },
];
