import { Avatar, Flex } from '@radix-ui/themes';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData, useLocation } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { FaPlus, FaRegEdit } from 'react-icons/fa';
import { Button, Separator } from '~/components';
import { Team, sampleGetMyTeam } from '~/model/team';

import { TeamAvatar } from '~/components/app';

import * as styles from './app.teams.css';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ id: params.id });
};

export default function TeamsContent() {
  const { id = '' } = useLoaderData<typeof loader>();
  const [team, setTeam] = useState<Team>({ id: '', name: '' });
  const location = useLocation();

  useEffect(() => {
    if (!id) return;
    sampleGetMyTeam(id).then((response) => {
      setTeam(response ?? { id: '', name: '' });
    });
  }, [id]);

  return (
    <div className={styles.container}>
      <Flex align='center' justify='between'>
        <Flex align='center' gap='2' style={{ height: '5rem' }}>
          <TeamAvatar src='' fallback={team.name} />
          <span>{team.name}</span>
        </Flex>
        <AddButton pathname={location.pathname} />
      </Flex>
      <Separator />
      <Outlet />
    </div>
  );
}

const AddButton = ({ pathname }: { pathname: string }) => {
  if (pathname.includes('dashboard')) {
    return null;
  } else if (pathname.includes('files')) {
    return (
      <Button>
        <FaPlus />
        파일 추가
      </Button>
    );
  }
};

const dataList = [
  {
    id: '1',
    title: 'Title 1',
    author: 'Jhon Doe',
    authorImage: 'https://randomuser.me/api/portraits/men/10.jpg',
    content: '내일까지 작업 마감 부탁드립니다.',
  },
];
