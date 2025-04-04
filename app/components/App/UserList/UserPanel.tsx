import { Avatar } from '@radix-ui/themes';
import * as styles from './userPanel.css'


export const UserPanel = ({src = '', username = ''}: { src: string, username: string}) => {
    return <div className={styles.container}>
        <Avatar radius='full' src={src} fallback={username[0] ?? ''} />
        <span className={styles.userName}>{username}</span>
    </div>
};