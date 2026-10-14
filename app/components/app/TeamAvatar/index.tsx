import { Avatar } from '@radix-ui/themes';
import { AvatarProps } from '@radix-ui/themes';

import * as styles from './styles.css';

type Props = AvatarProps;

export const TeamAvatar = ({ src, fallback, ...props }: Props) => {
  return (
    <Avatar
      {...props}
      src={src || '/app/assets/logo.svg'}
      fallback={fallback}
      className={src ? '' : styles.avatarContainer}
    />
  );
};
