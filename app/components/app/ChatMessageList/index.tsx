import * as styles from './styles.css';

export const ChatMessageList = () => {
  return (
    <ul className={styles.container}>
      {messages.map((msg) => {
        return (
          <li key={msg.id} className={styles.item}>
            <span>{msg.message}</span>
            <span>{msg.timestamp}</span>
          </li>
        );
      })}
    </ul>
  );
};

const messages = [
  {
    id: '0',
    sender: 'John Doe',
    message: 'SIUUUUU',
    timestamp: '2025-04-02T14:00:00Z',
  },
  {
    id: '1',
    sender: 'John Doe',
    message: 'Hey! How are you?',
    timestamp: '2025-04-04T14:00:00Z',
  },
  {
    id: '2',
    sender: 'Jane Smith',
    message: "I'm good, thanks! How about you?",
    timestamp: '2025-04-04T14:01:00Z',
  },
  {
    id: '3',
    sender: 'John Doe',
    message: 'Doing well! What are you up to?',
    timestamp: '2025-04-04T14:02:00Z',
  },
  {
    id: '4',
    sender: 'Jane Smith',
    message: 'Just working on a project. You?',
    timestamp: '2025-04-04T14:03:00Z',
  },
  {
    id: '5',
    sender: 'John Doe',
    message: "Same here. It's been a busy day.",
    timestamp: '2025-04-04T14:04:00Z',
  },
  {
    id: '6',
    sender: 'Jane Smith',
    message: "Tell me about it! Can't wait for the weekend.",
    timestamp: '2025-04-04T14:05:00Z',
  },
  {
    id: '7',
    sender: 'John Doe',
    message: 'Me too! Any plans?',
    timestamp: '2025-04-04T14:06:00Z',
  },
  {
    id: '8',
    sender: 'Jane Smith',
    message: 'Thinking of going hiking. You?',
    timestamp: '2025-04-04T14:07:00Z',
  },
  {
    id: '9',
    sender: 'John Doe',
    message: 'Sounds fun! I might just relax at home and catch up on some shows.',
    timestamp: '2025-04-04T14:08:00Z',
  },
  {
    id: '10',
    sender: 'Jane Smith',
    message: 'That sounds nice too. Sometimes you just need a lazy weekend!',
    timestamp: '2025-04-04T14:09:00Z',
  },
  {
    id: '11',
    sender: 'John Doe',
    message: 'Exactly! By the way, have you seen the latest episode of that show we talked about?',
    timestamp: '2025-04-04T14:10:00Z',
  },
  {
    id: '12',
    sender: 'Jane Smith',
    message: 'Not yet! Is it good?',
    timestamp: '2025-04-04T14:11:00Z',
  },
  {
    id: '13',
    sender: 'John Doe',
    message: "It's amazing! You should watch it soon.",
    timestamp: '2025-04-04T14:12:00Z',
  },
  {
    id: '14',
    sender: 'Jane Smith',
    message: "Alright, I'll check it out tonight.",
    timestamp: '2025-04-04T14:13:00Z',
  },
  {
    id: '15',
    sender: 'John Doe',
    message: 'Cool! Let me know what you think.',
    timestamp: '2025-04-04T14:14:00Z',
  },
  {
    id: '16',
    sender: 'Jane Smith',
    message: 'Will do! Thanks for the recommendation.',
    timestamp: '2025-04-04T14:15:00Z',
  },
  {
    id: '17',
    sender: 'John Doe',
    message: 'No problem. By the way, did you finish that report?',
    timestamp: '2025-04-04T14:16:00Z',
  },
  {
    id: '18',
    sender: 'Jane Smith',
    message: 'Almost done. Just need to add a few details.',
    timestamp: '2025-04-04T14:17:00Z',
  },
  {
    id: '19',
    sender: 'John Doe',
    message: 'Great! Let me know if you need any help.',
    timestamp: '2025-04-04T14:18:00Z',
  },
  {
    id: '20',
    sender: 'Jane Smith',
    message: 'Thanks, I will!',
    timestamp: '2025-04-04T14:19:00Z',
  },
  {
    id: '21',
    sender: 'ME',
    message: 'Ha Ha',
    timestamp: '2025-04-04T14:19:50Z',
  },
];
