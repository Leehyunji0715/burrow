import type { Presence, User } from '~/model';

import * as styles from './styles.css';

export const presenceLabel: Record<Presence, string> = {
  online: '온라인',
  away: '부재중',
  offline: '오프라인',
};

type Props = {
  user: Pick<User, 'name' | 'initials' | 'tone'> & { presence?: Presence };
  size?: keyof typeof styles.size;
  /** 상태 점을 보여줄지. 상태는 색만으로 구분하지 않으므로 옆에 글자도 함께 둔다 */
  showPresence?: boolean;
};

export function Avatar({ user, size = 'md', showPresence = false }: Props) {
  return (
    <span className={[styles.root, styles.size[size], styles.tone[user.tone]].join(' ')}>
      <span aria-hidden='true'>{user.initials}</span>
      {showPresence && user.presence && (
        <span
          className={[styles.dot, styles.presence[user.presence]].join(' ')}
          role='img'
          aria-label={presenceLabel[user.presence]}
        />
      )}
    </span>
  );
}
