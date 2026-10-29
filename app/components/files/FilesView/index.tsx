import { useState } from 'react';
import { LuCloudUpload, LuDownload, LuSearch, LuTrash2, LuUpload } from 'react-icons/lu';
import type { FileKind, ProjectFile, User } from '~/model';

import { PageHeader } from '~/components/layout/PageHeader';
import { Button } from '~/components/ui/Button';
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

export function FilesView({ projectName, files, findUser, onUpload, onDelete }: Props) {
  // 종류·검색어는 화면 안에서만 쓰는 상태라 여기서 들고 있는다 (서버로 보내지 않는다)
  const [kind, setKind] = useState<FileKind | 'all'>('all');
  const [query, setQuery] = useState('');

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
              onClick={() => setKind(f.value)}
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
            onChange={(e) => setQuery(e.target.value)}
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
              <th scope='col'>올린 사람</th>
              <th scope='col'>날짜</th>
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
                <td>{findUser(f.uploaderId)?.name}</td>
                <td className={styles.num}>{dateLabel(f.createdAt)}</td>
                <td>
                  <span className={styles.rowActions}>
                    <IconButton label={`${f.name} 다운로드`}>
                      <LuDownload />
                    </IconButton>
                    <IconButton label={`${f.name} 삭제`} onClick={() => onDelete(f.id)}>
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
    </div>
  );
}
