import { Avatar, IconButton, TextField } from '@radix-ui/themes';
import { useMemo } from 'react';
import { PiPaperPlaneRight, PiPaperclip } from 'react-icons/pi';
import { Form } from 'react-router';
import { convertToFormattedDate, getDateName } from '~/utils/datetime';

import { formId } from '~/constant/forms';

import * as styles from './styles.css';

type Props = {
  chatId: string;
};

type MessageType = {
  id: string;
  sender: string;
  senderImage?: string;
  message: string;
  timestamp: string;
} & ChatInfo;

type ChatInfo = {
  isCurrentUser?: boolean;
  isFirstMessage?: boolean;
};

/**
 * 메시지를 날짜 > 시각 > 목록 으로 묶는다.
 *
 * useRef 가 아니라 useMemo 를 쓰는 이유: ref 는 바뀌어도 리렌더를 일으키지 않아
 * 렌더에 쓰는 값을 담으면 화면이 갱신되지 않는다(react-hooks/refs).
 * 지금은 messages 가 상수라 티가 안 나지만, DB 에서 받아오면 새 메시지가
 * 화면에 나타나지 않는다.
 *
 * 또한 원본 메시지 객체를 수정하지 않고 사본에 isFirstMessage 를 넣는다.
 * 원본을 건드리면 같은 입력으로 두 번 계산할 때 결과가 달라진다.
 */
const groupMessagesByDate = (list: MessageType[]) => {
  const grouped: Record<string, Record<string, MessageType[]>> = {};

  for (const message of list) {
    const dateTime = new Date(message.timestamp).toISOString();
    const date = dateTime.split('T')[0] ?? dateTime;

    grouped[date] ??= {};
    const slot = (grouped[date][dateTime] ??= []);

    // 같은 시각에 연속으로 온 상대 메시지 중 첫 번째만 보낸이 정보를 표시한다.
    const isFirstMessage = !message.isCurrentUser && slot.every((msg) => !msg.isFirstMessage);

    slot.push({ ...message, isFirstMessage });
  }

  return grouped;
};

export const ChatMain = ({ chatId }: Props) => {
  const messageByDate = useMemo(() => groupMessagesByDate(messages), []);
  const orderedDates = Object.keys(messageByDate).sort();

  return (
    <div className={styles.container}>
      <div style={{ width: '100%', height: '5rem', background: 'yellow' }}>{chatId}</div>
      <div className={styles.chatContainer}>
        {orderedDates.map((date) => {
          const orderedDateTime = Object.keys(messageByDate[date]).sort();
          return (
            <>
              <div className={styles.chatDate}>{getDateName(date)}</div>
              <ul key={date} className={styles.chatSection}>
                {orderedDateTime.map((dateTime) => {
                  return messageByDate[date][dateTime].map((msg) => (
                    <ChatMessage
                      key={msg.id}
                      message={msg}
                      isFirstMessage={msg.isFirstMessage ?? false}
                    />
                  ));
                })}
              </ul>
            </>
          );
        })}
      </div>
      <Form id={formId.SEND_CHAT_MESSAGE} className={styles.inputTextContainer} method='post'>
        <input type='hidden' name='formId' value={formId.SEND_CHAT_MESSAGE} />
        <TextField.Root
          name='message'
          placeholder='메시지를 입력하세요.'
          className={styles.inputText}
        >
          <TextField.Slot side='right' className={styles.inputTextSlot}>
            <IconButton type='button' variant='outline' className={styles.inputTextButton}>
              <PiPaperclip />
            </IconButton>
          </TextField.Slot>
          <TextField.Slot side='right' className={styles.inputTextSlot}>
            <IconButton variant='outline' className={styles.inputTextButton}>
              <PiPaperPlaneRight />
            </IconButton>
          </TextField.Slot>
        </TextField.Root>
      </Form>
    </div>
  );
};

const ChatMessage = ({
  message,
  isFirstMessage,
}: {
  message: MessageType;
  isFirstMessage: boolean;
}) => {
  const isOtherUser = !message.isCurrentUser;
  return (
    <li className={message.isCurrentUser ? styles.curUserchatMessageItem : styles.chatMessageItem}>
      {isOtherUser && isFirstMessage && (
        <div className={styles.messageMetaInfo}>
          <span>{message.sender}</span>
          <span>{convertToFormattedDate(message.timestamp)}</span>
        </div>
      )}
      {isOtherUser && (
        <Avatar src={message.senderImage} radius='full' fallback='A' hidden={!isFirstMessage} />
      )}
      <span className={message.isCurrentUser ? styles.curUserChatMessage : styles.chatMessage}>
        {message.message}
      </span>
    </li>
  );
};

const messages: MessageType[] = [
  {
    id: '1',
    sender: 'John Doe',
    senderImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    message: 'Hey! How are you?',
    timestamp: '2025-04-04T14:00:00Z',
  },
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
  {
    id: '7',
    sender: 'John Doe',
    senderImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    message: 'Me too! Any plans?',
    timestamp: '2025-04-04T14:06:00Z',
  },
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
  {
    id: '15',
    sender: 'John Doe',
    senderImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    message: 'ㅋㅋ',
    timestamp: '2025-04-09T14:14',
  },
  {
    id: '16',
    sender: 'John Doe',
    senderImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    message: 'ㅋㅋ22',
    timestamp: '2025-04-09T14:14',
  },
];
