import { useState } from 'react';
import { LuCloudUpload, LuDownload, LuSearch, LuTrash2, LuUpload } from 'react-icons/lu';
import { useSearchParams } from 'react-router';
import type { FileKind, ProjectFile, User } from '~/model';

import { PageHeader } from '~/components/layout/PageHeader';
import { Button } from '~/components/ui/Button';
import { Dialog } from '~/components/ui/Dialog';
import { IconButton } from '~/components/ui/IconButton';

import * as styles from './styles.css';

type Props = {
  projectName: string;
  files: ProjectFile[];
  findUser: (id: string) => User | undefined;
  onUpload: () => void;
  onDelete: (fileId: string) => void;
};

const filters: { value: FileKind | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'doc', label: '문서' },
  { value: 'image', label: '이미지' },
  { value: 'design', label: '디자인' },
];

const dateLabel = (iso: string) =>
  new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(
    new Date(iso),
  );

const isKind = (v: string | null): v is FileKind =>
  filters.some((f) => f.value !== 'all' && f.value === v);

export function FilesView({ projectName, files, findUser, onUpload, onDelete }: Props) {
  // 종류·검색어는 URL 에 둔다 — 새로고침하거나 링크를 공유해도 같은 목록이 보인다
  const [params, setParams] = useSearchParams();
  const kindParam = params.get('kind');
  const kind: FileKind | 'all' = isKind(kindParam) ? kindParam : 'all';
  const query = params.get('q') ?? '';
  const [deleting, setDeleting] = useState<ProjectFile | null>(null);

  const updateParam = (key: string, value: string) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value && value !== 'all') next.set(key, value);
        else next.delete(key);
        return next;
      },
      // 글자를 칠 때마다 뒤로 가기 기록이 쌓이지 않게 현재 기록을 바꾼다
      { replace: true },
    );

  const visible = files
    .filter((f) => kind === 'all' || f.kind === kind)
    .filter((f) => f.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className={styles.page}>
      <PageHeader
        title='파일'
        description={`${projectName}에서 공유한 파일`}
        action={
          <Button onClick={onUpload}>
            <LuUpload aria-hidden='true' /> 업로드
          </Button>
        }
      />

      <div className={styles.toolbar}>
        <div role='group' aria-label='파일 종류' className={styles.filters}>
          {filters.map((f) => (
            <button
              key={f.value}
              type='button'
              aria-pressed={kind === f.value}
              className={kind === f.value ? styles.filterOn : styles.filter}
              onClick={() => updateParam('kind', f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className={styles.search}>
          <LuSearch aria-hidden='true' className={styles.searchIcon} />
          <span className={styles.srOnly}>파일 검색</span>
          <input
            type='search'
            placeholder='파일 이름 검색'
            className={styles.searchInput}
            value={query}
            onChange={(e) => updateParam('q', e.target.value)}
          />
        </label>
      </div>

      <div className={styles.dropzone}>
        <LuCloudUpload aria-hidden='true' className={styles.dropIcon} />
        파일을 여기로 끌어다 놓아도 올라가요 · 최대 50MB
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope='col'>이름</th>
              <th scope='col'>크기</th>
              <th scope='col' className={styles.optionalCol}>
                올린 사람
              </th>
              <th scope='col' className={styles.optionalCol}>
                날짜
              </th>
              <th scope='col'>
                <span className={styles.srOnly}>작업</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((f) => (
              <tr key={f.id}>
                <td className={styles.nameTd}>
                  <span className={styles.nameCell}>
                    <span className={styles.ext}>{f.ext}</span>
                    {/* 긴 이름은 한 줄로 자르고, 마우스를 올리면 전체 이름을 보여준다 */}
                    <span className={styles.fileName} title={f.name}>
                      {f.name}
                    </span>
                  </span>
                </td>
                <td className={styles.num}>{f.size}</td>
                <td className={styles.optionalCol}>{findUser(f.uploaderId)?.name}</td>
                <td className={[styles.num, styles.optionalCol].join(' ')}>
                  {dateLabel(f.createdAt)}
                </td>
                <td>
                  <span className={styles.rowActions}>
                    <IconButton label={`${f.name} 다운로드`}>
                      <LuDownload />
                    </IconButton>
                    <IconButton label={`${f.name} 삭제`} onClick={() => setDeleting(f)}>
                      <LuTrash2 />
                    </IconButton>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length === 0 && <p className={styles.empty}>조건에 맞는 파일이 없어요</p>}
      </div>

      {/* 지운 파일은 되돌릴 수 없으므로 한 번 더 묻는다 */}
      <Dialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title='파일을 삭제할까요?'
        description={
          deleting ? `${deleting.name} 파일이 프로젝트에서 지워지고 되돌릴 수 없어요.` : undefined
        }
      >
        <div className={styles.confirmActions}>
          <Button variant='ghost' onClick={() => setDeleting(null)}>
            취소
          </Button>
          <Button
            variant='danger'
            onClick={() => {
              if (deleting) onDelete(deleting.id);
              setDeleting(null);
            }}
          >
            삭제
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
