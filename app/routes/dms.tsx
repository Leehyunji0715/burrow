import { useState } from 'react';
import { LuMessagesSquare } from 'react-icons/lu';
import { Navigate, Outlet, useParams } from 'react-router';
import { directChats, directMessages, me, userById } from '~/mocks/data';
import type { Message, User } from '~/model';

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
  return <DirectChatPane key={chat.partner.id} partner={chat.partner} />;
}

/**
 * 한 사람과의 1:1 대화. 개인챗 화면과, 프로젝트 화면에서 멤버를 눌렀을 때 같이 쓴다.
 * 1:1 방은 사람 기준으로 하나라 어디서 열든 같은 대화다 (프로젝트별 DM 은 만들지 않는다).
 */
export function DirectChatPane({ partner }: { partner: User }) {
  const chat = directChats.find((d) => d.partner.id === partner.id);
  // 아직 대화한 적 없는 사람은 빈 대화로 연다. 서버에서는 첫 메시지를 보낼 때 방이 생긴다
  const [list, setList] = useState<Message[]>(chat ? (directMessages[chat.id] ?? []) : []);

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
