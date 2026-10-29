import { type ReactNode, useEffect } from 'react';
import { LuPanelLeftClose, LuPanelLeftOpen } from 'react-icons/lu';
import { Link, NavLink, useLocation } from 'react-router';
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
  // 이동할 때마다 바뀌는 값. 경로가 같고 쿼리(?dm=)만 바뀌는 이동도 잡는다
  const { key: locationKey } = useLocation();

  // 좁은 화면에서는 본문을 덮고 있으므로, 목록에서 무언가를 고르면 닫는다
  useEffect(() => {
    if (isMobile) collapse();
  }, [locationKey, isMobile, collapse]);

  if (collapsed) {
    return (
      <div className={styles.collapsedStrip}>
        <button
          type='button'
          className={styles.stripButton}
          aria-label={`${label} 목록 펼치기`}
          title={`${label} 목록 펼치기`}
          onClick={expand}
        >
          <LuPanelLeftOpen aria-hidden='true' />
          <span className={styles.stripLabel} aria-hidden='true'>
            {label}
          </span>
        </button>
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
  end?: boolean; /** 주소와 무관하게 선택 표시를 정할 때 (예: 개인챗을 덮어 연 동안 채널 선택 표시를 끈다) */
  active?: boolean;
};

export function SidebarLink({ to, icon, children, unread = 0, end = true, active }: ItemProps) {
  return (
    <li>
      <NavLink
        to={to}
        end={end}
        // active 를 직접 넘기면 주소 일치 여부 대신 그 값을 따른다
        aria-current={active === false ? false : undefined}
        className={({ isActive }) =>
          [styles.item, unread > 0 && styles.itemUnread, (active ?? isActive) && styles.itemActive]
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

export function SidebarPerson({ user, sub }: { user: User; sub?: string }) {
  return (
    <li className={styles.memberRow}>
      <PersonRow user={user} sub={sub} />
    </li>
  );
}

/**
 * 누르면 그 사람과의 1:1 대화를 본문에 연다. 경로는 그대로 두고 ?dm= 만 바꾼다 —
 * 새로고침·뒤로 가기·링크 공유가 동작하고, 채널을 누르면 ?dm 이 빠지며 채널로 돌아간다.
 */
export function SidebarPersonLink({
  user,
  active,
  isMe = false,
}: {
  user: User;
  active: boolean;
  isMe?: boolean;
}) {
  return (
    <li>
      <Link
        to={{ search: `?dm=${user.id}` }}
        aria-current={active ? 'true' : undefined}
        aria-label={isMe ? '나와의 대화 (메모)' : `${user.name} 님과 1:1 대화`}
        className={[styles.item, styles.personLink, active && styles.itemActive]
          .filter(Boolean)
          .join(' ')}
      >
        <PersonRow user={user} sub={isMe ? '나' : undefined} />
      </Link>
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
