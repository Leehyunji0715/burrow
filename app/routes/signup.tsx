import { Link } from 'react-router';

import { SignUpForm } from '~/components/home';

import * as styles from '~/styles/login.css';

export default function SignUp() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to='/' className='center'>
          <img src='./app/assets/logo.svg' className={styles.logo} alt='logo' />
        </Link>
        <SignUpForm />
      </div>
    </div>
  );
}
