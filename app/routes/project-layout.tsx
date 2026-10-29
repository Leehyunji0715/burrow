import { LuFolder, LuHash, LuLayoutDashboard } from 'react-icons/lu';
import { Navigate, Outlet, useParams, useSearchParams } from 'react-router';
import { channels, me, members, projects } from '~/mocks/data';
import { DirectChatPane } from '~/routes/dms';

import {
  Sidebar,
  SidebarHeader,
  SidebarLink,
  SidebarPerson,
  SidebarPersonLink,
  SidebarSection,
} from '~/components/layout/Sidebar';
import * as shell from '~/components/layout/shell.css';
import { ProjectMark } from '~/components/ui/ProjectMark';

import { paths } from '~/constant/routes';

export default function ProjectLayout() {
  const { projectId = '' } = useParams();
  const [params] = useSearchParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) return <p className={shell.empty}>프로젝트를 찾을 수 없어요</p>;

  const projectChannels = channels.filter((c) => c.projectId === project.id);
  const projectMembers = members[project.id] ?? [];
  // ?dm=<사람 id> 가 있으면 본문 자리에 그 사람과의 1:1 대화를 연다. 나 자신과는 열지 않는다
  const dmPartner = projectMembers.find((m) => m.id === params.get('dm') && m.id !== me.id);
  // 1:1 을 덮어 연 동안에는 주소가 채널이어도 채널 선택 표시를 끈다
  const pageActive = dmPartner ? false : undefined;

  return (
    <div className={shell.content}>
      <Sidebar label={project.name}>
        <SidebarHeader
          title={project.name}
          meta={`멤버 ${projectMembers.length}명`}
          icon={<ProjectMark project={project} />}
        />
        <SidebarSection>
          <SidebarLink
            to={paths.board(project.id)}
            icon={<LuLayoutDashboard />}
            active={pageActive}
          >
            대시보드
          </SidebarLink>
          <SidebarLink to={paths.files(project.id)} icon={<LuFolder />} active={pageActive}>
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
              active={pageActive}
            >
              {c.name}
            </SidebarLink>
          ))}
        </SidebarSection>
        <SidebarSection title='멤버'>
          {projectMembers.map((m) =>
            m.id === me.id ? (
              <SidebarPerson key={m.id} user={m} sub='나' />
            ) : (
              <SidebarPersonLink key={m.id} user={m} active={m.id === dmPartner?.id} />
            ),
          )}
        </SidebarSection>
      </Sidebar>
      {dmPartner ? <DirectChatPane key={dmPartner.id} partner={dmPartner} /> : <Outlet />}
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
