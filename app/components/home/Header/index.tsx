import wave from '~/assets/wave.svg';

import { Button } from '../../common/Button';
import * as styles from './style.css';

export const Header = () => {
  return (
    <section className={styles.base}>
      <header className={styles.header}>
        <div className={styles.mainContainer}>
          <div className={styles.messageContainer}>
            <h1 className={styles.mainMessage}>Welcome</h1>
            <span className={styles.subMessage}>for team success</span>
          </div>
          <a href='/app'>
            <Button bgType='highlight' className={styles.headButton}>START</Button>
          </a>
        </div>
      </header>
      <img src={wave} className={styles.wave} alt='wave' />
    </section>
  );
};
