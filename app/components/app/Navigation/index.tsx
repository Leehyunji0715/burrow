import { BsChatLeftText, BsPeople } from 'react-icons/bs';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { Link, NavLink } from 'react-router';
import logo from '~/assets/logo.svg';

import { Separator } from '~/components/';

import { routes } from '~/constant/routes';

import * as styles from './appNavigation.css';

const listItems = [
  { icon: <BsChatLeftText />, to: routes.app.chat },
  { icon: <BsPeople />, to: routes.app.teams },
];

export const AppNavigation = () => {
  return (
    <nav className={styles.navContainer}>
      <img src={logo} className={styles.logo} alt='로고' />
      <Separator />
      <ul className={styles.listContainer}>
        {listItems.map((item) => (
          <li key={item.to} className={styles.listItem}>
            <NavLink to={item.to} className={({ isActive }) => (isActive ? styles.activeLink : '')}>
              {item.icon}
            </NavLink>
          </li>
        ))}
        <li key={routes.home} className={styles.listItem}>
          <Link to={routes.home}>
            <RiLogoutCircleLine />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
