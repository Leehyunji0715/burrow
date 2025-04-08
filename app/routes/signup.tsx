import { Link } from '@remix-run/react';

import { SignUpForm } from '~/components/home';

import * as styles from './login.css';

export default function SignUp() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to='/' style={{ textAlign: 'center' }}>
          <img src='./app/assets/logo.svg' className={styles.logo} />
        </Link>
        <SignUpForm />
      </div>
    </div>
  );
}
