import wave from '~/assets/wave.svg';

import * as styles from './style.css';

export const Header = () => {
  return (
    <section className={styles.base}>
      <header className={styles.header}>
        <h1>
          Welcome to <span className=''>Remix</span>
        </h1>
      </header>
      <img src={wave} className={styles.wave} alt='wave' />
    </section>
  );
};
