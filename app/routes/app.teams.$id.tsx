import { Flex } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router';
import { Separator } from '~/components';
import { Team, sampleGetMyTeam } from '~/model/team';

import { TeamAvatar } from '~/components/app';

import * as styles from '~/styles/app.teams.css';

export default function TeamsContent() {
  const { id = '' } = useParams();
  const [team, setTeam] = useState<Team>({ id: '', name: '' });

  useEffect(() => {
    if (!id) return;
    sampleGetMyTeam(id)
      .then((response) => {
        setTeam(response ?? { id: '', name: '' });
      })
      .catch((error) => {
        console.error('MyTeam 데이터 로드 실패:', error);
      });
  }, [id]);

  return (
    <div className={styles.container}>
      <Flex align='center' justify='between'>
        <Flex align='center' gap='2' style={{ height: '5rem' }}>
          <TeamAvatar src='' fallback={team.name} />
          <span>{team.name}</span>
        </Flex>
      </Flex>
      <Separator />
      <Outlet />
    </div>
  );
}

// const dataList = [
//   {
//     id: '1',
//     title: 'Title 1',
//     author: 'Jhon Doe',
//     authorImage: 'https://randomuser.me/api/portraits/men/10.jpg',
//     content: '내일까지 작업 마감 부탁드립니다.',
//   },
// ];
