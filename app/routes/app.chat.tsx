import { Outlet } from 'react-router';

import { ChatRoomList } from '~/components/app';

import * as styles from '~/styles/app.$type.css';

export default function AppContent() {
  return (
    <>
      <ChatRoomList />
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
}
