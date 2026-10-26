import { type FormEvent, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';
import { channels, directChats, me, projects } from '~/mocks/data';

import { Rail } from '~/components/layout/Rail';
import * as shell from '~/components/layout/shell.css';
import { Button } from '~/components/ui/Button';
import { Dialog } from '~/components/ui/Dialog';
import { TextField } from '~/components/ui/TextField';

import { paths } from '~/constant/routes';

export default function AppLayout() {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const activeProjects = projects.filter((p) => !p.archived);
  const dmUnread = directChats.reduce((sum, d) => sum + d.unread, 0);

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    // 목업: 프로젝트 생성 API 가 생기면 만든 프로젝트로 이동한다
    setCreating(false);
  };

  return (
    <div className={shell.app}>
      <Rail
        me={me}
        projects={activeProjects}
        dmUnread={dmUnread}
        onCreateProject={() => setCreating(true)}
        onLogout={() => void navigate(paths.login)}
      />
      <Outlet />

      <Dialog
        open={creating}
        onOpenChange={setCreating}
        title='새 프로젝트'
        description='프로젝트를 만들면 #일반 채널이 함께 생겨요. 멤버는 만든 뒤에 초대할 수 있어요.'
      >
        <form className={shell.dialogForm} onSubmit={handleCreate}>
          <TextField label='프로젝트 이름' name='name' placeholder='예: 로그인 · 회원가입 개편' />
          <div className={shell.dialogActions}>
            <Button variant='ghost' onClick={() => setCreating(false)}>
              취소
            </Button>
            <Button type='submit'>만들기</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

/** /app 으로 들어오면 첫 프로젝트의 첫 채널로 보낸다 */
export function AppIndex() {
  const first = projects.find((p) => !p.archived);
  if (!first) return null;
  const channel = channels.find((c) => c.projectId === first.id);
  return (
    <Navigate to={channel ? paths.channel(first.id, channel.id) : paths.board(first.id)} replace />
  );
}
