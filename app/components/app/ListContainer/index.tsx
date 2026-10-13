import { ReactNode } from 'react';

import * as styles from './style.css';

type Props = {
  children?: ReactNode;
};

const Header = ({ children }: { children: ReactNode }) => {
  return <div className={styles.heading}>{children}</div>;
};

export const ListContainer = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

ListContainer.Header = Header;
