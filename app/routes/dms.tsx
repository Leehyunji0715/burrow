import { useState } from 'react';
import { LuMessagesSquare } from 'react-icons/lu';
import { Navigate, Outlet, useParams } from 'react-router';
import { directChats, directMessages, me, userById } from '~/mocks/data';
import type { DirectChat, Message } from '~/model';

import { ChatView } from '~/components/chat/ChatView';
import {
  PersonRow,
  Sidebar,
  SidebarHeader,
  SidebarLink,
  SidebarSection,
} from '~/components/layout/Sidebar';
import * as shell from '~/components/layout/shell.css';
import { presenceLabel } from '~/components/ui/Avatar';

import { paths } from '~/constant/routes';

/** 개인챗: 프로젝트와 다른 급의 공간. 사람 기준으로 1:1 대화방이 하나씩 있다 */
export default function DmsLayout() {
  return (
    <div className={shell.content}>
      <Sidebar label='개인챗'>
        <SidebarHeader
          title='개인챗'
          meta='1:1 대화'
          icon={<LuMessagesSquare aria-hidden='true' />}
        />
        <SidebarSection>
          {directChats.map((d) => (
            <SidebarLink key={d.id} to={paths.dm(d.id)} unread={d.unread}>
              <PersonRow user={d.partner} sub={d.lastMessage} />
            </SidebarLink>
          ))}
        </SidebarSection>
      </Sidebar>
      <Outlet />
    </div>
  );
}

export function DmsIndex() {
  const first = directChats[0];
  return first ? (
    <Navigate to={paths.dm(first.id)} replace />
  ) : (
    <p className={shell.empty}>아직 대화가 없어요</p>
  );
}

export function DmPage() {
  const { dmId = '' } = useParams();
  const chat = directChats.find((d) => d.id === dmId);
  if (!chat) return <p className={shell.empty}>대화를 찾을 수 없어요</p>;
  return <DmChat key={chat.id} chat={chat} />;
}

function DmChat({ chat }: { chat: DirectChat }) {
  const [list, setList] = useState<Message[]>(directMessages[chat.id] ?? []);
  const { partner } = chat;

  // 목업: 화면에만 붙인다
  const handleSend = (text: string) =>
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

  return (
    <ChatView
      title={partner.name}
      subtitle={
        partner.statusNote
          ? `${presenceLabel[partner.presence]} · ${partner.statusNote}`
          : presenceLabel[partner.presence]
      }
      messages={list}
      meId={me.id}
      findUser={userById}
      composerPlaceholder={`${partner.name} 님에게 메시지 보내기`}
      onSend={handleSend}
    />
  );
}
