import type { Project } from '~/model';

import * as styles from './styles.css';

/** 프로젝트 색 + 글자 한 개. 사이드바 헤더처럼 레일 타일보다 작은 자리에 쓴다 */
export function ProjectMark({ project }: { project: Pick<Project, 'color' | 'initial'> }) {
  return (
    <span className={[styles.mark, styles.color[project.color]].join(' ')} aria-hidden='true'>
      {project.initial}
    </span>
  );
}
