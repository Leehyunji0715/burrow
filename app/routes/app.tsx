import { AppNavigation } from '~/components';
import * as styles from './app.css';
import { Outlet } from '@remix-run/react';

export default function App() {
    return (
        <div className={styles.page}>
            <AppNavigation/>
            <div className={styles.contentContainer}>
                <Outlet/>
            </div>
        </div>
    )
};