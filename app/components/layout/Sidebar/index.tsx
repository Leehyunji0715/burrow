import type { ReactNode } from 'react';
import { NavLink } from 'react-router';
import type { User } from '~/model';

import { Avatar, presenceLabel } from '~/components/ui/Avatar';

import * as styles from './styles.css';

/** 레일 오른쪽 목록 열의 틀. 프로젝트 화면과 개인챗 화면이 같이 쓴다 */
export function Sidebar({ label, children }: { label: string; children: ReactNode }) {
  return (
    <aside aria-label={label} className={styles.sidebar}>
      {children}
    </aside>
  );
}

export function SidebarHeader({
  title,
  meta,
  icon,
}: {
  title: string;
  meta?: string;
  icon?: ReactNode;
}) {
  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>
        {icon}
        <span>{title}</span>
      </div>
      {meta && <span className={styles.headerMeta}>{meta}</span>}
    </div>
  );
}

export function SidebarSection({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className={styles.section}>
      {title && <div className={styles.sectionTitle}>{title}</div>}
      <ul className={styles.list}>{children}</ul>
    </div>
  );
}

type ItemProps = {
  to: string;
  icon?: ReactNode;
  children: ReactNode;
  unread?: number;
  /** 하위 경로에서도 활성으로 볼지 */
  end?: boolean;
};

export function SidebarLink({ to, icon, children, unread = 0, end = true }: ItemProps) {
  return (
    <li>
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          [styles.item, unread > 0 && styles.itemUnread, isActive && styles.itemActive]
            .filter(Boolean)
            .join(' ')
        }
      >
        {icon && (
          <span className={styles.itemIcon} aria-hidden='true'>
            {icon}
          </span>
        )}
        <span className={styles.itemText}>{children}</span>
        {unread > 0 && (
          <span className={styles.unread} aria-label={`안 읽은 메시지 ${unread}개`}>
            {unread}
          </span>
        )}
      </NavLink>
    </li>
  );
}

export function SidebarPerson({ user }: { user: User }) {
  return (
    <li className={styles.memberRow}>
      <PersonRow user={user} />
    </li>
  );
}

/** 사람 한 명: 아바타 + 이름 + 상태 글자. 상태는 점과 글자를 함께 쓴다 */
export function PersonRow({ user, sub }: { user: User; sub?: string }) {
  const status = user.statusNote
    ? `${presenceLabel[user.presence]} · ${user.statusNote}`
    : presenceLabel[user.presence];
  return (
    <span className={styles.person}>
      <Avatar user={user} size='sm' showPresence />
      <span className={styles.personText}>
        <span className={styles.personName}>{user.name}</span>
        <span className={styles.personSub}>{sub ?? status}</span>
      </span>
    </span>
  );
}
