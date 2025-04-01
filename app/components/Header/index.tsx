import { Button } from '~/components';

import * as styles from './style.css';

export const Header = () => {
  return (
    <header className={styles.base}>
      <h1>
        Welcome to <span className=''>Remix</span>
      </h1>
      <Button>CLICK!</Button>
    </header>
  );
};
