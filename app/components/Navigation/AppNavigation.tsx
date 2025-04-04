import { Separator } from "radix-ui";
import { BsBell, BsChatLeftText, BsPeople } from "react-icons/bs";
import { RiLogoutCircleLine } from "react-icons/ri";
import * as styles from './appNavigation.css'
import { Link } from "@remix-run/react";

const listItems = [
    { icon: <BsBell/>, to: 'notification' },
    { icon: <BsChatLeftText/>, to: 'chat' },
    { icon: <BsPeople/>, to: 'teams' },
    { icon: <RiLogoutCircleLine/>, to: '/' }
];

export const AppNavigation = () => {
    return (
        <nav className={styles.navContainer}>
            <img src='./app/assets/logo.svg' className={styles.logo}/>
            <Separator.Root className={styles.separator}/>
            <ul className={styles.listContainer}>
                {listItems.map((item, index) => (
                    <li key={index} className={styles.listItem}>
                        <Link to={item.to}>
                            {item.icon}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
};