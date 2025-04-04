import { NavLink, Link } from "@remix-run/react";
import { BsBell, BsChatLeftText, BsPeople } from "react-icons/bs";
import { RiLogoutCircleLine } from "react-icons/ri";
import { routes } from "~/constant/routes";
import { Separator } from "~/components/";
import * as styles from './appNavigation.css'

const listItems = [
    { icon: <BsBell/>, to: routes.app.notification },
    { icon: <BsChatLeftText/>, to: routes.app.chat },
    { icon: <BsPeople/>, to: routes.app.teams }
];

export const AppNavigation = () => {
    return (
        <nav className={styles.navContainer}>
            <img src='./app/assets/logo.svg' className={styles.logo}/>
            <Separator/>
            <ul className={styles.listContainer}>
                {listItems.map((item) => (
                    <li key={item.to} className={styles.listItem}>
                        <NavLink to={item.to} className={({ isActive }) => isActive ? styles.activeLink : ""}>
                            {item.icon}
                        </NavLink>
                    </li>
                ))}
                <li key={routes.home} className={styles.listItem}>
                    <Link to={routes.home}>
                        <RiLogoutCircleLine/>
                    </Link>
                </li>
            </ul>
        </nav>
    )
};