import { Link } from '@remix-run/react';
import * as styles from './homeNavigation.css';

export const HomeNavigation = () => {
    return (
        <nav className={styles.container}>
            <Link to='/'>
                <img src="./app/assets/logo.svg" className={styles.logo}/>
            </Link>
            <ul className={styles.navContainer}>
                <li className={styles.navItem}>
                    <Link to='/login'>Login</Link>
                </li>
            </ul>
        </nav>
    );
};