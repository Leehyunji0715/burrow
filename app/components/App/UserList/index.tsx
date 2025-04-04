import { Separator } from '~/components/Separator';
import * as styles from './style.css';
import { UserPanel } from './UserPanel';

export const UserList = () => {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                새 채팅 만들기, 채팅방 필터, 채팅 추가
            </div>
            <Separator/>
            <ul className={styles.listContainer}>
                <li className={styles.listItem}>
                    <UserPanel src='' username='나'/>
                </li>
                {userData.map(user => (
                    <li key={user.uid} className={styles.listItem}>
                        <UserPanel src={user.profilePicture} username={user.name}/>
                    </li>
                ))}
                {/* <Avatar radius='full' fallback="나" /> */}
            </ul>
        </div>
    );
};

const userData = [
    // {
    //   name: "John Doe",
    //   profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    // },
    // {
    //   name: "Jane Smith",
    //   profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
    // },
    // {
    //   name: "Michael Brown",
    //   profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
    // },
    // {
    //   name: "Emily Davis",
    //   profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
    // },
    // {
    //   name: "Chris Johnson",
    //   profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
    // },
    // {
    //   name: "Emma Wilson",
    //   profilePicture: "https://randomuser.me/api/portraits/women/6.jpg",
    // },
    // {
    //   name: "David Martinez",
    //   profilePicture: "https://randomuser.me/api/portraits/men/7.jpg",
    // },
    // {
    //   name: "Sophia Garcia",
    //   profilePicture: "https://randomuser.me/api/portraits/women/8.jpg",
    // },
    // {
    //   name: "James Anderson",
    //   profilePicture: "https://randomuser.me/api/portraits/men/9.jpg",
    // },
    // {
    //   name: "Olivia Thomas",
    //   profilePicture: "https://randomuser.me/api/portraits/women/10.jpg",
    // },
    {
        uid: 'vVsgm1hGf',
        email: 'john.doe@example.com',
        name: 'John Doe',
        profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg',
      },
      {
        uid: 'sTZ2dotjz',
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
        profilePicture: 'https://randomuser.me/api/portraits/men/2.jpg',
      },
      {
        uid: 'Jz333uTXal',
        email: 'michael.brown@sample.org',
        name: 'Michael Brown',
        profilePicture: 'https://randomuser.me/api/portraits/women/3.jpg',
      },
      {
        uid: 'i69DiuUO',
        email: 'emily.davis@sample.org',
        name: 'Emily Davis',
        profilePicture: 'https://randomuser.me/api/portraits/men/4.jpg',
      },
      {
        uid: '5F8MoEo1',
        email: 'chris.johnson@sample.org',
        name: 'Chris Johnson',
        profilePicture: 'https://randomuser.me/api/portraits/women/5.jpg',
      },
      {
        uid: 'gRr5oo8n',
        email: 'emma.wilson@test.com',
        name: 'Emma Wilson',
        profilePicture: 'https://randomuser.me/api/portraits/men/6.jpg',
      },
      {
        uid: 'Mn8nxQOm',
        email: 'david.martinez@sample.org',
        name: 'David Martinez',
        profilePicture: 'https://randomuser.me/api/portraits/women/7.jpg',
      },
      {
        uid: '1s8JZ3P0r',
        email: 'sophia.garcia@sample.org',
        name: 'Sophia Garcia',
        profilePicture: 'https://randomuser.me/api/portraits/men/8.jpg',
      },
      {
        uid: 'UoIF74C3D',
        email: 'james.anderson@example.com',
        name: 'James Anderson',
        profilePicture: 'https://randomuser.me/api/portraits/women/9.jpg',
      },
      {
        uid: 'vGUdP5aGj',
        email: 'olivia.thomas@sample.org',
        name: 'Olivia Thomas',
        profilePicture: 'https://randomuser.me/api/portraits/men/10.jpg',
      },
      {
        uid: 'g7a4saey',
        email: 'liam.miller@sample.org',
        name: 'Liam Miller',
        profilePicture: 'https://randomuser.me/api/portraits/women/11.jpg',
      },
      {
        uid: '5BZOTVTc',
        email: 'isabella.moore@sample.org',
        name: 'Isabella Moore',
        profilePicture: 'https://randomuser.me/api/portraits/men/12.jpg',
      },
      {
        uid: 'yStLj3jw',
        email: 'ethan.taylor@example.com',
        name: 'Ethan Taylor',
        profilePicture: 'https://randomuser.me/api/portraits/women/13.jpg',
      },
      {
        uid: 'GndsmgJP',
        email: 'ava.harris@example.com',
        name: 'Ava Harris',
        profilePicture: 'https://randomuser.me/api/portraits/men/14.jpg',
      },
      {
        uid: 'zBEzRd4Zw',
        email: 'mason.clark@example.com',
        name: 'Mason Clark',
        profilePicture: 'https://randomuser.me/api/portraits/women/15.jpg',
      },
      {
        uid: 'fanCB3p1s',
        email: 'mia.lewis@sample.org',
        name: 'Mia Lewis',
        profilePicture: 'https://randomuser.me/api/portraits/men/16.jpg',
      },
      {
        uid: 'tdcY9587e',
        email: 'lucas.walker@sample.org',
        name: 'Lucas Walker',
        profilePicture: 'https://randomuser.me/api/portraits/women/17.jpg',
      },
      {
        uid: 'HU196NQBf',
        email: 'charlotte.hall@test.com',
        name: 'Charlotte Hall',
        profilePicture: 'https://randomuser.me/api/portraits/men/18.jpg', 
      },
      {
        uid:"zBEzRdZw",
        email:"mason.clark@example.com",
        name:"Mason Clark",
        profilePicture:"https://randomuser.me/api/portraits/women/13.jpg"
    },
    {
        uid:"fanCB44p1s",
        email:"mia.lewis@sample.org",
        name:"Mia Lewis",
        profilePicture:"https://randomuser.me/api/portraits/men/14.jpg"
    },
    {
        uid:"tdcY94487e",
        email:"lucas.walker@sample.org",
        name:"Lucas Walker",
        profilePicture:"https://randomuser.me/api/portraits/women/15.jpg"
    },
    {
        uid:"HU193NQBf",
        email:"charlotte.hall@test.com",
        name:"Charlotte Hall",
        profilePicture:"https://randomuser.me/api/portraits/men/16.jpg"
    },
    {
        uid:"kLx9rT3234p",
        email:"amelia.young@example.com",
        name:"Amelia Young",
        profilePicture:"https://randomuser.me/api/portraits/women/17.jpg"
    },
    {
        uid:"XqL9P8Qr",
        email:"logan.king@example.com",
        name:"Logan King",
        profilePicture:"https://randomuser.me/api/portraits/men/18.jpg"
    },
    {
        uid:"pT9aX2347Jq",
        email:"harper.scott@sample.org",
        name:"Harper Scott",
        profilePicture:"https://randomuser.me/api/portraits/women/19.jpg"
    },
    {
        uid:"sLq2349P7Qx",
        email:"elijah.green@sample.org",
        name:"Elijah Green",
        profilePicture:"https://randomuser.me/api/portraits/men/20.jpg"
    }
  ];