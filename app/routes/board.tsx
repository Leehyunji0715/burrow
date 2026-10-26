import type Quill from 'quill';
import { type FormEvent, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { members, posts, projects, userById } from '~/mocks/data';
import type { Post } from '~/model';

import { BoardView } from '~/components/board/BoardView';
import * as shell from '~/components/layout/shell.css';
import { Button } from '~/components/ui/Button';
import { Checkbox } from '~/components/ui/Checkbox';
import { Dialog } from '~/components/ui/Dialog';
import { Editor } from '~/components/ui/Editor';
import { TextField } from '~/components/ui/TextField';

const emptyDelta: [] = [];

export default function BoardPage() {
  const { projectId = '' } = useParams();
  const project = projects.find((p) => p.id === projectId);
  if (!project) return <p className={shell.empty}>프로젝트를 찾을 수 없어요</p>;
  return <Board key={project.id} projectId={project.id} projectName={project.name} />;
}

function Board({ projectId, projectName }: { projectId: string; projectName: string }) {
  const [list, setList] = useState<Post[]>(posts[projectId] ?? []);
  const [writing, setWriting] = useState(false);
  const quillRef = useRef<Quill>(null);

  // 목업: 공지 확인 API 가 생기면 응답으로 바꾼다
  const handleAck = (postId: string) =>
    setList((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, ackedByMe: true, ackCount: p.ackCount + 1 } : p)),
    );

  const handleWrite = (e: FormEvent) => {
    e.preventDefault();
    // 목업: 게시글 작성 API 가 생기면 제목·본문(HTML)·공지 여부를 보낸다
    setWriting(false);
  };

  return (
    <>
      <BoardView
        projectName={projectName}
        posts={list}
        members={members[projectId] ?? []}
        findUser={userById}
        onAck={handleAck}
        onWrite={() => setWriting(true)}
      />
      <Dialog open={writing} onOpenChange={setWriting} title='새 글 작성'>
        <form className={shell.dialogForm} onSubmit={handleWrite}>
          <TextField label='제목' name='title' maxLength={100} />
          <Editor
            ref={quillRef}
            readOnly={false}
            defaultValue={emptyDelta}
            onTextChange={() => {}}
            onSelectionChange={() => {}}
          />
          <Checkbox name='isNotice'>공지로 올리기</Checkbox>
          <div className={shell.dialogActions}>
            <Button variant='ghost' onClick={() => setWriting(false)}>
              취소
            </Button>
            <Button type='submit'>올리기</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
