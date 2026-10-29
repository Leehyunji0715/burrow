import { useState } from 'react';
import { LuPaperclip, LuSearch } from 'react-icons/lu';
import { Link, useParams } from 'react-router';
import { channels, firstUnreadSeq, me, members, messages, userById } from '~/mocks/data';
import type { Message } from '~/model';

import { ChatView } from '~/components/chat/ChatView';
import * as shell from '~/components/layout/shell.css';
import { IconButton } from '~/components/ui/IconButton';
import * as iconButton from '~/components/ui/IconButton/styles.css';

import { paths } from '~/constant/routes';

export default function ChannelPage() {
  const { projectId = '', channelId = '' } = useParams();
  const channel = channels.find((c) => c.id === channelId && c.projectId === projectId);
  if (!channel) return <p className={shell.empty}>채널을 찾을 수 없어요</p>;

  // key 로 채널마다 화면 상태(보낸 메시지)를 새로 시작한다
  return (
    <ChannelChat
      key={channel.id}
      projectId={projectId}
      channelId={channel.id}
      name={channel.name}
    />
  );
}

function ChannelChat({
  projectId,
  channelId,
  name,
}: {
  projectId: string;
  channelId: string;
  name: string;
}) {
  const [list, setList] = useState<Message[]>(messages[channelId] ?? []);
  const projectMembers = members[projectId] ?? [];
  const online = projectMembers.filter((m) => m.presence === 'online').length;

  // 목업: 화면에만 붙인다. 서버·WebSocket 연결 후에는 전송 결과(seq)로 목록을 갱신한다
  const handleSend = (text: string) => {
    setList((prev) => [
      ...prev,
      {
        id: `local-${prev.length + 1}`,
        seq: (prev.at(-1)?.seq ?? 0) + 1,
        authorId: me.id,
        text,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  return (
    <ChatView
      title={`# ${name}`}
      subtitle={`멤버 ${projectMembers.length}명 · 지금 온라인 ${online}명`}
      actions={
        <>
          <IconButton label='대화 검색'>
            <LuSearch />
          </IconButton>
          <Link
            to={paths.files(projectId)}
            aria-label='공유된 파일'
            title='공유된 파일'
            className={iconButton.root}
          >
            <LuPaperclip />
          </Link>
        </>
      }
      messages={list}
      firstUnreadSeq={firstUnreadSeq[channelId]}
      meId={me.id}
      findUser={userById}
      composerPlaceholder={`#${name}에 메시지 보내기`}
      onSend={handleSend}
    />
  );
}
