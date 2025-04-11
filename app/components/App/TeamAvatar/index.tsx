import { Avatar } from '@radix-ui/themes';

import * as styles from './styles.css';

type Props = {
  src: string;
  fallback: string;
};

export const TeamAvatar = ({ src, fallback }: Props) => {
  return (
    <Avatar
      src={src || '/app/assets/logo.svg'}
      fallback={fallback}
      className={styles.avatarContainer}
    />
  );
};
