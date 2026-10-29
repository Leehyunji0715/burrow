import DOMPurify from 'dompurify';
import { LuCheck, LuMegaphone, LuPencil } from 'react-icons/lu';
import type { Post, ProjectMember, User } from '~/model';

import { PageHeader } from '~/components/layout/PageHeader';
import { PersonRow } from '~/components/layout/Sidebar';
import { Avatar } from '~/components/ui/Avatar';
import { Button } from '~/components/ui/Button';
import { Chip } from '~/components/ui/Chip';

import * as styles from './styles.css';

type Props = {
  projectName: string;
  posts: Post[];
  members: ProjectMember[];
  findUser: (id: string) => User | undefined;
  onAck: (postId: string) => void;
  onWrite: () => void;
};

const dateLabel = (iso: string) =>
  new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric' }).format(new Date(iso));

export function BoardView({ projectName, posts, members, findUser, onAck, onWrite }: Props) {
  const unackedNotices = posts.filter((p) => p.isNotice && !p.ackedByMe);
  const online = members.filter((m) => m.presence === 'online').length;
  const latest = posts[0];

  return (
    <div className={styles.page}>
      <PageHeader
        title='대시보드'
        description={`${projectName}의 공지와 게시글`}
        action={
          <Button variant='brand' onClick={onWrite}>
            <LuPencil aria-hidden='true' /> 새 글 작성
          </Button>
        }
      />

      {/* 디자인 시스템 3초 룰: 요약을 먼저, 급한 항목만 accent-soft */}
      <section aria-label='지금 확인할 것' className={styles.summary}>
        <a
          href={unackedNotices[0] ? `#${unackedNotices[0].id}` : undefined}
          className={[styles.card, unackedNotices.length > 0 && styles.cardUrgent]
            .filter(Boolean)
            .join(' ')}
        >
          <span className={styles.cardLabel}>확인 안 한 공지</span>
          <strong className={styles.cardValue}>{unackedNotices.length}건</strong>
          <span className={styles.cardSub}>{unackedNotices[0]?.title ?? '모두 확인했어요'}</span>
        </a>
        <div className={styles.card}>
          <span className={styles.cardLabel}>지금 온라인</span>
          <strong className={styles.cardValue}>
            {online} / {members.length}명
          </strong>
          <span className={styles.cardSub}>
            {members
              .filter((m) => m.presence === 'away')
              .map((m) => `${m.name} 님 ${m.statusNote ?? '부재중'}`)
              .join(', ') || '모두 자리에 있어요'}
          </span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>최근 글</span>
          <strong className={styles.cardValueSm}>{latest?.title ?? '아직 글이 없어요'}</strong>
          <span className={styles.cardSub}>
            {latest
              ? `${findUser(latest.authorId)?.name ?? ''} · ${dateLabel(latest.createdAt)}`
              : ''}
          </span>
        </div>
      </section>

      <div className={styles.columns}>
        <section aria-label='게시글' className={styles.posts}>
          {posts.length === 0 && (
            <p className={styles.empty}>아직 글이 없어요. 첫 공지를 올려 멤버들과 공유해 보세요.</p>
          )}
          {posts.map((post) => {
            const author = findUser(post.authorId);
            return (
              <article key={post.id} id={post.id} className={styles.post}>
                <div className={styles.postHead}>
                  {author && <Avatar user={author} />}
                  <div className={styles.postMeta}>
                    <span className={styles.postAuthor}>{author?.name}</span>
                    <span className={styles.postDate}>
                      {dateLabel(post.createdAt)}
                      {post.edited && ' · 수정됨'}
                    </span>
                  </div>
                  {post.isNotice && (
                    <Chip tone='notice'>
                      <LuMegaphone aria-hidden='true' /> 공지
                    </Chip>
                  )}
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <div
                  className={styles.postBody}
                  // 본문은 Quill 이 만든 HTML 이라 stored XSS 를 막기 위해 정리한 뒤 넣는다
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.bodyHtml) }}
                />
                {post.isNotice && (
                  <div className={styles.postFoot}>
                    <Button
                      variant={post.ackedByMe ? 'ghost' : 'outline'}
                      onClick={() => onAck(post.id)}
                      disabled={post.ackedByMe}
                    >
                      <LuCheck aria-hidden='true' />
                      {post.ackedByMe ? '확인했어요' : '확인'}
                    </Button>
                    <span className={styles.ackCount}>
                      확인 {post.ackCount} / {members.length}
                    </span>
                  </div>
                )}
              </article>
            );
          })}
        </section>

        <aside aria-label='멤버' className={styles.members}>
          <h2 className={styles.membersTitle}>멤버 {members.length}명</h2>
          <ul className={styles.memberList}>
            {members.map((m) => (
              <li key={m.id} className={styles.memberRow}>
                <PersonRow user={m} />
                {m.role === 'owner' && <Chip tone='neutral'>owner</Chip>}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
