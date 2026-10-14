import { Link } from 'react-router';

import { LoginForm } from '~/components/home';

import * as styles from '~/styles/login.css';

export default function Login() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to='/' className='text-center'>
          <img src='./app/assets/logo.svg' className={styles.logo} alt='logo' />
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
