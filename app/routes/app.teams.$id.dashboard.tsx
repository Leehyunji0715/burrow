import { Flex } from '@radix-ui/themes';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import type { LoaderFunctionArgs } from 'react-router';
import { useLoaderData } from 'react-router';
import { ClientOnly } from 'remix-utils/client-only';
import { Button } from '~/components';
import { fetchAllDashboardItems } from '~/model/dashboard';

import { DashboardCard } from '~/components/app/DashboardCard';
import { EditableDashboardCard } from '~/components/app/DashboardCard/EditableDashboardCard';

import * as styles from '~/styles/app.teams.css';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const dashboardItems = await fetchAllDashboardItems();
  return { id: params.id, dashboardItems };
};

export default function DashboardContent() {
  const { id, dashboardItems } = useLoaderData<typeof loader>();
  const [addNew, setAddNew] = useState(false);
  // 다른 팀으로 이동하면 작성 중이던 카드를 닫는다.
  //
  // effect 에서 setState 하지 않는 이유: id 변경 -> 렌더 -> effect -> setState
  // -> 또 렌더 가 되어 불필요한 두 번째 렌더가 생긴다(cascading render).
  // 렌더 중에 직전 id 와 비교해 바로 리셋하면 한 번의 렌더로 끝난다.
  // https://react.dev/reference/react/useState#storing-information-from-previous-renders
  const [prevId, setPrevId] = useState(id);
  if (prevId !== id) {
    setPrevId(id);
    setAddNew(false);
  }

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
