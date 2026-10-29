import { type FormEvent, useState } from 'react';
import { pickProjectColor } from '~/utils/projectColor';

import { Button } from '~/components/ui/Button';
import { ColorPicker } from '~/components/ui/ColorPicker';
import { Dialog } from '~/components/ui/Dialog';
import { TextField } from '~/components/ui/TextField';

import type { ProjectColor } from '~/styles/tokens.css';

import * as styles from './styles.css';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 내가 속한 프로젝트들이 이미 쓰는 색. 겹치지 않는 색을 먼저 추천한다 */
  takenColors: ProjectColor[];
  onCreate: (name: string, color: ProjectColor) => void;
};

export function CreateProjectDialog({ open, onOpenChange, takenColors, onCreate }: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title='새 프로젝트'
      description='프로젝트를 만들면 #일반 채널이 함께 생겨요. 멤버는 만든 뒤에 초대할 수 있어요.'
    >
      {/* 열 때마다 폼 상태(이름·추천 색)를 새로 시작한다 */}
      {open && (
        <CreateProjectForm
          takenColors={takenColors}
          onCancel={() => onOpenChange(false)}
          onCreate={onCreate}
        />
      )}
    </Dialog>
  );
}

function CreateProjectForm({
  takenColors,
  onCancel,
  onCreate,
}: {
  takenColors: ProjectColor[];
  onCancel: () => void;
  onCreate: Props['onCreate'];
}) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(() => pickProjectColor(takenColors));
  const trimmed = name.trim();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!trimmed) return;
    onCreate(trimmed, color);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        label='프로젝트 이름'
        name='name'
        maxLength={40}
        placeholder='예: 로그인 · 회원가입 개편'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <ColorPicker label='색' value={color} onChange={setColor} />
      <div className={styles.actions}>
        <Button variant='ghost' onClick={onCancel}>
          취소
        </Button>
        <Button type='submit' disabled={!trimmed}>
          만들기
        </Button>
      </div>
    </form>
  );
}
