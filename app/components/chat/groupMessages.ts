import type { Message } from '~/model';

/** 같은 사람이 이 시간 안에 이어서 보내면 이름·아바타를 한 번만 보여준다 */
const CONTINUATION_MS = 5 * 60 * 1000;

export type MessageRow =
  | { kind: 'date'; key: string; label: string }
  | { kind: 'unread'; key: string }
  | { kind: 'message'; key: string; message: Message; continued: boolean };

const dateLabel = (iso: string) =>
  new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' }).format(
    new Date(iso),
  );

const dayKey = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

/**
 * 메시지 목록을 화면에 그릴 줄 목록으로 바꾼다.
 * 날짜가 바뀌는 곳에 날짜 구분선, 처음 안 읽은 메시지 앞에 "여기부터 새 메시지"를 끼운다.
 */
export function groupMessages(messages: Message[], firstUnreadSeq?: number): MessageRow[] {
  const rows: MessageRow[] = [];
  let prev: Message | undefined;

  for (const message of messages) {
    const newDay = !prev || dayKey(prev.createdAt) !== dayKey(message.createdAt);
    if (newDay) {
      rows.push({ kind: 'date', key: `date-${message.id}`, label: dateLabel(message.createdAt) });
    }

    const isFirstUnread = message.seq === firstUnreadSeq;
    if (isFirstUnread) rows.push({ kind: 'unread', key: `unread-${message.id}` });

    const continued =
      !!prev &&
      !newDay &&
      !isFirstUnread &&
      prev.authorId === message.authorId &&
      new Date(message.createdAt).getTime() - new Date(prev.createdAt).getTime() < CONTINUATION_MS;

    rows.push({ kind: 'message', key: message.id, message, continued });
    prev = message;
  }

  return rows;
}
