import { type ReactNode, useEffect } from 'react';
import { LuPanelLeftClose, LuPanelLeftOpen } from 'react-icons/lu';
import { NavLink, useLocation } from 'react-router';
import type { User } from '~/model';

import { Avatar, presenceLabel } from '~/components/ui/Avatar';
import { IconButton } from '~/components/ui/IconButton';

import * as styles from './styles.css';
import { SIDEBAR_MAX, SIDEBAR_MIN, useSidebarSize } from './useSidebarSize';

/**
 * 레일 오른쪽 목록 열의 틀. 프로젝트 화면과 개인챗 화면이 같이 쓴다.
 * 오른쪽 손잡이로 너비를 바꾸고, 최소 너비보다 더 줄이면 접힌다.
 */
export function Sidebar({ label, children }: { label: string; children: ReactNode }) {
  const { width, collapsed, isMobile, collapse, expand, startDrag, onHandleKeyDown } =
    useSidebarSize();
  const { pathname } = useLocation();

  // 좁은 화면에서는 본문을 덮고 있으므로, 목록에서 다른 화면으로 이동하면 닫는다
  useEffect(() => {
    if (isMobile) collapse();
  }, [pathname, isMobile, collapse]);

  if (collapsed) {
    return (
      <div className={styles.collapsedStrip}>
        <IconButton label={`${label} 목록 펼치기`} onClick={expand}>
          <LuPanelLeftOpen />
        </IconButton>
      </div>
    );
  }

  return (
    <>
      {isMobile && (
        <button
          type='button'
          className={styles.backdrop}
          aria-label={`${label} 목록 닫기`}
          tabIndex={-1}
          onClick={collapse}
        />
      )}
      <aside
        aria-label={label}
        className={styles.sidebar}
        // 좁은 화면에서는 CSS 가 정한 덮개 너비를 쓴다
        style={isMobile ? undefined : { width }}
      >
        <div className={styles.scroll}>{children}</div>
        <span className={styles.closeButton}>
          <IconButton label={`${label} 목록 접기`} onClick={collapse}>
            <LuPanelLeftClose />
          </IconButton>
        </span>
        {!isMobile && (
          // WAI-ARIA "Window Splitter" 패턴: 포커스를 받는 separator 는 조작 가능한 요소다.
          // jsx-a11y 는 separator 를 항상 비조작 요소로 보므로 이 두 규칙만 이 요소에서 끈다.
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <div
            role='separator'
            aria-orientation='vertical'
            aria-label={`${label} 목록 너비 조절`}
            aria-valuenow={width}
            aria-valuemin={SIDEBAR_MIN}
            aria-valuemax={SIDEBAR_MAX}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- 위와 같은 이유
            tabIndex={0}
            className={styles.handle}
            onPointerDown={startDrag}
            onKeyDown={onHandleKeyDown}
          />
        )}
      </aside>
    </>
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
