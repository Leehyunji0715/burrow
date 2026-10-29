import { useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';
import { channels, createMockProject, directChats, me, projects } from '~/mocks/data';

import { Rail } from '~/components/layout/Rail';
import * as shell from '~/components/layout/shell.css';
import { CreateProjectDialog } from '~/components/project/CreateProjectDialog';

import { paths } from '~/constant/routes';

export default function AppLayout() {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const activeProjects = projects.filter((p) => !p.archived);
  const dmUnread = directChats.reduce((sum, d) => sum + d.unread, 0);

  return (
    <div className={shell.app}>
      {/* 키보드 사용자가 매번 레일 전체를 지나가지 않도록. Tab 을 처음 누르면 보인다 */}
      <a href='#main' className={shell.skipLink}>
        본문으로 건너뛰기
      </a>
      <Rail
        me={me}
        projects={activeProjects}
        dmUnread={dmUnread}
        onCreateProject={() => setCreating(true)}
        onLogout={() => void navigate(paths.login)}
      />
      {/* tabIndex -1: 건너뛰기 링크로 왔을 때 포커스가 실제로 본문으로 옮겨지게 한다 */}
      <main id='main' tabIndex={-1} className={shell.main}>
        <Outlet />
      </main>

      <CreateProjectDialog
        open={creating}
        onOpenChange={setCreating}
        takenColors={activeProjects.map((p) => p.color)}
        onCreate={(name, color) => {
          // 목업: 프로젝트 생성 API 가 생기면 응답으로 받은 프로젝트로 이동한다
          const project = createMockProject(name, color);
          setCreating(false);
          void navigate(paths.project(project.id));
        }}
      />
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
