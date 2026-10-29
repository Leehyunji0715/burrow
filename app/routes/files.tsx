import { useState } from 'react';
import { useParams } from 'react-router';
import { files, projects, userById } from '~/mocks/data';

import { FilesView } from '~/components/files/FilesView';
import * as shell from '~/components/layout/shell.css';

export default function FilesPage() {
  const { projectId = '' } = useParams();
  const project = projects.find((p) => p.id === projectId);
  if (!project) return <p className={shell.empty}>프로젝트를 찾을 수 없어요</p>;
  return <ProjectFiles key={project.id} projectId={project.id} projectName={project.name} />;
}

function ProjectFiles({ projectId, projectName }: { projectId: string; projectName: string }) {
  const [list, setList] = useState(files[projectId] ?? []);

  return (
    <FilesView
      projectName={projectName}
      files={list}
      findUser={userById}
      // 목업: 업로드·삭제 API 가 생기면 연결한다
      onUpload={() => {}}
      onDelete={(id) => setList((prev) => prev.filter((f) => f.id !== id))}
    />
  );
}
