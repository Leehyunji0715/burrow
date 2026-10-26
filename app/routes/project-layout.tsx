import { LuFolder, LuHash, LuLayoutDashboard } from 'react-icons/lu';
import { Navigate, Outlet, useParams } from 'react-router';
import { channels, members, projects } from '~/mocks/data';

import {
  Sidebar,
  SidebarHeader,
  SidebarLink,
  SidebarPerson,
  SidebarSection,
} from '~/components/layout/Sidebar';
import * as shell from '~/components/layout/shell.css';

import { paths } from '~/constant/routes';

export default function ProjectLayout() {
  const { projectId = '' } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) return <p className={shell.empty}>프로젝트를 찾을 수 없어요</p>;

  const projectChannels = channels.filter((c) => c.projectId === project.id);
  const projectMembers = members[project.id] ?? [];

  return (
    <div className={shell.content}>
      <Sidebar label={project.name}>
        <SidebarHeader title={project.name} meta={`멤버 ${projectMembers.length}명`} />
        <SidebarSection>
          <SidebarLink to={paths.board(project.id)} icon={<LuLayoutDashboard />}>
            대시보드
          </SidebarLink>
          <SidebarLink to={paths.files(project.id)} icon={<LuFolder />}>
            파일
          </SidebarLink>
        </SidebarSection>
        <SidebarSection title='채널'>
          {projectChannels.map((c) => (
            <SidebarLink
              key={c.id}
              to={paths.channel(project.id, c.id)}
              icon={<LuHash />}
              unread={c.unread}
            >
              {c.name}
            </SidebarLink>
          ))}
        </SidebarSection>
        <SidebarSection title='멤버'>
          {projectMembers.map((m) => (
            <SidebarPerson key={m.id} user={m} />
          ))}
        </SidebarSection>
      </Sidebar>
      <Outlet />
    </div>
  );
}

/** 프로젝트에 들어오면 첫 채널을 연다 */
export function ProjectIndex() {
  const { projectId = '' } = useParams();
  const channel = channels.find((c) => c.projectId === projectId);
  return (
    <Navigate
      to={channel ? paths.channel(projectId, channel.id) : paths.board(projectId)}
      replace
    />
  );
}
