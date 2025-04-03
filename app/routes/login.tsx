import { Link } from '@remix-run/react';
import { LoginForm } from '~/components/';
import * as styles from './login.css';

export default function Login() {
    return <div className={styles.page}>
        <div className={styles.container}>
            <Link to='/' style={{ textAlign: 'center' }}>
                <img src='./app/assets/logo.svg' className={styles.logo}/>
            </Link>
            <LoginForm/>
        </div>
    </div>;
}