import { useRef } from 'react';
import { Form } from "@remix-run/react";
import {Avatar, TextField, IconButton} from '@radix-ui/themes';
import { PiPaperclip, PiPaperPlaneRight } from "react-icons/pi";
import * as styles from './styles.css';
import { formId } from '~/constant/forms';
import { convertToFormattedDate } from '~/utils/datetime';

type Props = {
  chatId: string;
};

type MessageType = {
  id: string;
  sender: string;
  senderImage?: string;
  message: string;
  timestamp: string;
  isCurrentUser?: boolean;
};

export const ChatMain = ({ chatId }: Props) => {
  const messageByDate = useRef<Record<string, MessageType[]>>(
    messages.reduce(
      (acc, cur) => {
        const date = new Date(cur.timestamp).toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(cur);
        return acc;
      },
      {} as Record<string, MessageType[]>
    )
  );
  const orderedDates = Object.keys(messageByDate.current).sort();
  const today = new Date(); // 오늘 날짜
  const yesterday = new Date(today); // 어제 날짜
  yesterday.setDate(today.getDate() - 1);
  const dayBeforeYesterday = new Date(today); // 그제 날짜
  dayBeforeYesterday.setDate(today.getDate() - 2);

  const dateMessage = (date: string) => {
    switch(date) {
      case today.toISOString().split('T')[0]:
        return "오늘";
      case yesterday.toISOString().split('T')[0]:
        return "어제";
      case dayBeforeYesterday.toISOString().split('T')[0]:
        return "그저께";
      default:
        return date;
    }
  };

  return (
    <div className={styles.container}>
      <div style={{ width: '100%', height: '5rem', background: 'yellow' }}>
        {chatId}
      </div>
      <div className={styles.chatContainer}>
        {orderedDates.map((date) => {
          return (
            <>
              <div className={styles.chatDate}>{dateMessage(date)}</div>
              <ul key={date} className={styles.chatSection}>
                {messageByDate.current[date].map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
              </ul>
            </>
          );
        })}
      </div>
      <Form
        id={formId.SEND_CHAT_MESSAGE}
        className={styles.inputTextContainer}
        method="post"
      >
        <input type="hidden" name="formId" value={formId.SEND_CHAT_MESSAGE} />
        <TextField.Root name='message' placeholder="메시지를 입력하세요." className={styles.inputText}>
          <TextField.Slot side='right' className={styles.inputTextSlot}>
            <IconButton type='button' variant='outline' className={styles.inputTextButton}>
              <PiPaperclip/>
            </IconButton>
          </TextField.Slot>
          <TextField.Slot side='right' className={styles.inputTextSlot}>
            <IconButton
              variant='outline' 
              className={styles.inputTextButton}
            >
              <PiPaperPlaneRight/>
            </IconButton>
          </TextField.Slot>
        </TextField.Root>
      </Form>
    </div>
  );
};

const ChatMessage = ({ message }: { message: MessageType }) => {
  return (
    <li className={message.isCurrentUser ? styles.curUserchatMessageItem : styles.chatMessageItem}>
      {!message.isCurrentUser && (
        <div className={styles.messageMetaInfo}>
          <span>{message.sender}</span>
          <span>{convertToFormattedDate(message.timestamp)}</span>
        </div>
      )}
      {!message.isCurrentUser && message.senderImage && (
        <Avatar
          src={message.senderImage}
          radius='full'
          fallback='A'
        />
      )}
      <span className={message.isCurrentUser ? styles.curUserChatMessage : styles.chatMessage}>
        {message.message}
      </span>
    </li>
  );
};

const users = [{ id: '1', name: 'John Doe', email: 'johnDoe@gmail.com' }, {}];

const messages: MessageType[] = [
  { id: '1', sender: 'John Doe', senderImage: 'https://randomuser.me/api/portraits/women/1.jpg' , message: 'Hey! How are you?', timestamp: '2025-04-04T14:00:00Z' },
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
    senderImage: 'https://randomuser.me/api/portraits/women/1.jpg',
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
    senderImage: 'https://randomuser.me/api/portraits/women/1.jpg',
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
  { id: '7', sender: 'John Doe', senderImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'Me too! Any plans?', timestamp: '2025-04-04T14:06:00Z' },
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
    senderImage: 'https://randomuser.me/api/portraits/women/1.jpg',
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
    id: '12',
    sender: 'Jane Smith',
    isCurrentUser: true,
    message: 'Long time ago...22',
    timestamp: '2025-04-01T14:12',
  },
  {
    id: '13',
    sender: 'Jane Smith',
    isCurrentUser: true,
    message: "Today's Message",
    timestamp: '2025-04-10T14:12',
  },
  {
    id: '14',
    sender: 'Jane Smith',
    isCurrentUser: true,
    message: "Yesterday's Message",
    timestamp: '2025-04-09T14:12',
  },
  { id: '15', sender: 'John Doe', senderImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'ㅋㅋ', timestamp: '2025-04-09T14:14' },
];
