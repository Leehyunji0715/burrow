import * as styles from './styles.css';

type MessageType = {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isCurrentUser?: boolean;
};

const ChatMessage = ({ message }: { message: MessageType }) => {
  return (
    <li className={message.isCurrentUser ? styles.curUserchatMessageItem : styles.chatMessageItem}>
      <span className={message.isCurrentUser ? styles.curUserChatMessage : styles.chatMessage}>
        {message.message}
      </span>
    </li>
  );
};

export const ChatMain = () => {
  const messageByDate = messages.reduce(
    (acc, cur) => {
      const date = new Date(cur.timestamp).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(cur);
      return acc;
    },
    {} as Record<string, MessageType[]>
  );
  const orderedDates = Object.keys(messageByDate).sort();
  return (
    <div className={styles.container}>
      {orderedDates.map((date) => {
        return (
          <ul key={date} className={styles.chatSection}>
            {messageByDate[date].map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
          </ul>
        );
      })}
    </div>
  );
};

const users = [{ id: '1', name: 'John Doe', email: 'johnDoe@gmail.com' }, {}];

const messages: MessageType[] = [
  { id: '0', sender: 'John Doe', message: 'SIUUUUU', timestamp: '2025-04-02T14:00:00Z' },
  { id: '1', sender: 'John Doe', message: 'Hey! How are you?', timestamp: '2025-04-04T14:00:00Z' },
  {
    id: '2',
    sender: 'Jane Smith',
    isCurrentUser: true,
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
    isCurrentUser: true,
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
    isCurrentUser: true,
    message: "Tell me about it! Can't wait for the weekend.",
    timestamp: '2025-04-04T14:05:00Z',
  },
  { id: '7', sender: 'John Doe', message: 'Me too! Any plans?', timestamp: '2025-04-04T14:06:00Z' },
  {
    id: '8',
    sender: 'Jane Smith',
    isCurrentUser: true,
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
    isCurrentUser: true,
    message: 'That sounds nice too. Sometimes you just need a lazy weekend!',
    timestamp: '2025-04-04T14:09',
  },
  {
    id: '11',
    sender: 'Jane Smith',
    isCurrentUser: true,
    message: 'Long time ago...',
    timestamp: '2025-04-01T14:09',
  },
  {
    id: '11',
    sender: 'Jane Smith',
    isCurrentUser: true,
    message: 'Long time ago...22',
    timestamp: '2025-04-01T14:12',
  },
];
