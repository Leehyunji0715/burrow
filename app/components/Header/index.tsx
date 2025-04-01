import wave from '~/assets/wave.svg';

import { Button } from '../Button';
import * as styles from './style.css';

export const Header = () => {
  return (
    <section className={styles.base}>
      <header className={styles.header}>
        <div className={styles.messageContainer}>
          <h1 className={styles.mainMessage}>Welcome</h1>
          <span className={styles.subMessage}>for our future</span>
        </div>
        <Button>START</Button>
      </header>
      <img src={wave} className={styles.wave} alt='wave' />
    </section>
  );
};
