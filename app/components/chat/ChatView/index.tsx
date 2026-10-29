import { type FormEvent, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { LuDownload, LuFileText, LuImage, LuPaperclip, LuSend } from 'react-icons/lu';
import type { Message, User } from '~/model';

import { Avatar } from '~/components/ui/Avatar';
import { IconButton } from '~/components/ui/IconButton';

import { groupMessages } from '../groupMessages';
import * as styles from './styles.css';

type Props = {
  title: string;
  subtitle?: string;
  /** 헤더 오른쪽 버튼들 */
  actions?: ReactNode;
  messages: Message[];
  firstUnreadSeq?: number;
  meId: string;
  findUser: (id: string) => User | undefined;
  composerPlaceholder: string;
  onSend: (text: string) => void;
};

const timeLabel = (iso: string) =>
  new Intl.DateTimeFormat('ko-KR', { hour: 'numeric', minute: '2-digit' }).format(new Date(iso));

export function ChatView({
  title,
  subtitle,
  actions,
  messages,
  firstUnreadSeq,
  meId,
  findUser,
  composerPlaceholder,
  onSend,
}: Props) {
  const rows = useMemo(() => groupMessages(messages, firstUnreadSeq), [messages, firstUnreadSeq]);
  const endRef = useRef<HTMLDivElement>(null);

  // 새 메시지가 붙으면 맨 아래로 내린다
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages.length]);

  return (
    <section className={styles.root} aria-label={title}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </header>

      <div className={styles.scroller}>
        {rows.length === 0 && (
          <p className={styles.empty}>아직 메시지가 없어요. 첫 메시지를 보내 보세요.</p>
        )}
        {/* role=log: 새로 붙는 메시지를 스크린 리더가 읽어 준다 (기존 메시지는 다시 읽지 않는다) */}
        <ol className={styles.list} role='log' aria-label='메시지'>
          {rows.map((row) => {
            if (row.kind === 'date') {
              return (
                <li key={row.key} className={styles.divider}>
                  {row.label}
                </li>
              );
            }
            if (row.kind === 'unread') {
              return (
                <li key={row.key} className={styles.unreadDivider}>
                  여기부터 새 메시지
                </li>
              );
            }
            const { message, continued } = row;
            const author = findUser(message.authorId);
            const mine = message.authorId === meId;
            return mine ? (
              <li
                key={row.key}
                className={[styles.mine, continued && styles.tight].filter(Boolean).join(' ')}
              >
                <time className={styles.mineTime} dateTime={message.createdAt}>
                  {timeLabel(message.createdAt)}
                </time>
                <div className={styles.mineBubble}>{message.text}</div>
              </li>
            ) : (
              <li
                key={row.key}
                className={[styles.other, continued && styles.tight].filter(Boolean).join(' ')}
              >
                <span className={styles.avatarSlot}>
                  {!continued && author && <Avatar user={author} />}
                </span>
                <div className={styles.otherBody}>
                  {!continued && (
                    <div className={styles.meta}>
                      <strong className={styles.author}>{author?.name ?? '알 수 없음'}</strong>
                      <time className={styles.time} dateTime={message.createdAt}>
                        {timeLabel(message.createdAt)}
                      </time>
                    </div>
                  )}
                  {message.text && <div className={styles.otherBubble}>{message.text}</div>}
                  {message.attachment?.kind === 'file' && (
                    <div className={styles.fileCard}>
                      <span className={styles.fileIcon} aria-hidden='true'>
                        <LuFileText />
                      </span>
                      <span className={styles.fileText}>
                        <span className={styles.fileName} title={message.attachment.name}>
                          {message.attachment.name}
                        </span>
                        <span className={styles.fileSize}>{message.attachment.size}</span>
                      </span>
                      <IconButton label={`${message.attachment.name} 다운로드`}>
                        <LuDownload />
                      </IconButton>
                    </div>
                  )}
                  {message.attachment?.kind === 'image' && (
                    <div
                      className={styles.imageCard}
                      role='img'
                      aria-label={`공유된 이미지: ${message.attachment.name}`}
                    >
                      {message.attachment.name} · {message.attachment.size}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
        <div ref={endRef} />
      </div>

      <Composer placeholder={composerPlaceholder} onSend={onSend} />
    </section>
  );
}

function Composer({
  placeholder,
  onSend,
}: {
  placeholder: string;
  onSend: (text: string) => void;
}) {
  const [draft, setDraft] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    onSend(text);
    setDraft('');
  };

  return (
    <form className={styles.composerForm} onSubmit={handleSubmit}>
      <div className={styles.composer}>
        <IconButton label='파일 첨부'>
          <LuPaperclip />
        </IconButton>
        <IconButton label='이미지 첨부'>
          <LuImage />
        </IconButton>
        <input
          aria-label='메시지'
          autoComplete='off'
          className={styles.composerInput}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={placeholder}
        />
        <button type='submit' className={styles.send} aria-label='보내기' disabled={!draft.trim()}>
          <LuSend aria-hidden='true' />
        </button>
      </div>
    </form>
  );
}
