import { DropdownMenu, Tooltip } from 'radix-ui';
import type { ReactNode } from 'react';
import { LuLogOut, LuMessagesSquare, LuMonitor, LuMoon, LuPlus, LuSun } from 'react-icons/lu';
import { Link, NavLink } from 'react-router';
import type { Project, User } from '~/model';
import { useTheme } from '~/theme/ThemeProvider';
import type { ThemePreference } from '~/theme/theme';

import { Avatar } from '~/components/ui/Avatar';
import { Logo } from '~/components/ui/Logo';

import { paths } from '~/constant/routes';

import * as styles from './styles.css';

type Props = {
  me: User;
  projects: Project[];
  /** 개인챗 안 읽은 수 합계 */
  dmUnread: number;
  onCreateProject: () => void;
  onLogout: () => void;
};

/**
 * 앱 맨 왼쪽 레일. 위는 '나' 영역(개인챗), 구분선 아래는 프로젝트 타일.
 * 개인챗과 프로젝트를 다른 급으로 보여 주는 것이 기획의 핵심이다 (잡담이 업무와 같은 급으로 보이지 않게).
 */
export function Rail({ me, projects, dmUnread, onCreateProject, onLogout }: Props) {
  return (
    <nav aria-label='앱 메뉴' className={styles.rail}>
      <Link to={paths.home} aria-label='Burrow 홈' className={styles.home}>
        <Logo size={34} />
      </Link>

      <NavLink
        to={paths.dms}
        className={({ isActive }) =>
          [styles.menu, isActive && styles.menuActive].filter(Boolean).join(' ')
        }
      >
        <span className={styles.menuIcon}>
          <LuMessagesSquare aria-hidden='true' />
          {dmUnread > 0 && (
            <span className={styles.badge} aria-label={`안 읽은 메시지 ${dmUnread}개`}>
              {dmUnread}
            </span>
          )}
        </span>
        개인챗
      </NavLink>

      <span className={styles.divider} aria-hidden='true' />
      <span className={styles.groupLabel}>프로젝트</span>

      <ul className={styles.tiles}>
        {projects.map((p) => (
          <li key={p.id}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <NavLink
                  to={paths.project(p.id)}
                  aria-label={p.name}
                  className={({ isActive }) =>
                    [styles.tile, styles.tileColor[p.color], isActive && styles.tileActive]
                      .filter(Boolean)
                      .join(' ')
                  }
                >
                  {p.initial}
                </NavLink>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content side='right' sideOffset={10} className={styles.tooltip}>
                  {p.name}
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </li>
        ))}
        <li>
          <button
            type='button'
            className={styles.addTile}
            aria-label='새 프로젝트 만들기'
            onClick={onCreateProject}
          >
            <LuPlus aria-hidden='true' />
          </button>
        </li>
      </ul>

      <ProfileMenu me={me} onLogout={onLogout} />
    </nav>
  );
}

const themeOptions: { value: ThemePreference; label: string; icon: ReactNode }[] = [
  { value: 'light', label: '라이트', icon: <LuSun /> },
  { value: 'dark', label: '다크', icon: <LuMoon /> },
  { value: 'system', label: '시스템 설정', icon: <LuMonitor /> },
];

function ProfileMenu({ me, onLogout }: { me: User; onLogout: () => void }) {
  const { preference, setPreference } = useTheme();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={styles.profile} aria-label='내 프로필 메뉴'>
        <Avatar user={me} size='sm' showPresence />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content side='right' align='end' sideOffset={10} className={styles.menuPanel}>
          <DropdownMenu.Label className={styles.menuLabel}>{me.name}</DropdownMenu.Label>
          <DropdownMenu.Separator className={styles.menuSeparator} />
          <DropdownMenu.Label className={styles.menuSubLabel}>화면 테마</DropdownMenu.Label>
          <DropdownMenu.RadioGroup
            value={preference}
            onValueChange={(v) => setPreference(v as ThemePreference)}
          >
            {themeOptions.map((o) => (
              <DropdownMenu.RadioItem key={o.value} value={o.value} className={styles.menuItem}>
                <span className={styles.menuItemIcon} aria-hidden='true'>
                  {o.icon}
                </span>
                {o.label}
                <DropdownMenu.ItemIndicator className={styles.menuCheck}>
                  ●
                </DropdownMenu.ItemIndicator>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
          <DropdownMenu.Separator className={styles.menuSeparator} />
          <DropdownMenu.Item className={styles.menuItem} onSelect={onLogout}>
            <span className={styles.menuItemIcon} aria-hidden='true'>
              <LuLogOut />
            </span>
            로그아웃
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
