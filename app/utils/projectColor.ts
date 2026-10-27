// 토큰 파일(*.css.ts)은 vanilla-extract 빌드 안에서만 실행된다. 여기서는 타입만 가져와야
// 테스트(Vitest)처럼 플러그인이 없는 환경에서도 이 함수를 쓸 수 있다.
import type { ProjectColor } from '~/styles/tokens.css';

/** 팔레트 순서 (디자인 시스템 README "프로젝트 팔레트" 표의 순서) */
export const projectColors = [
  'lilac',
  'mint',
  'pink',
  'sky',
  'periwinkle',
  'aqua',
  'mauve',
  'sage',
] as const satisfies readonly ProjectColor[];

/**
 * 새 프로젝트에 줄 색을 고른다.
 * 디자인 시스템 규칙: 완전 랜덤보다 내 프로젝트들과 겹치지 않는 색을 순서대로 주는 게 가장 구분이 잘 된다.
 * 8색을 다 쓰고 있으면 처음부터 다시 돌린다.
 */
export function pickProjectColor(taken: readonly ProjectColor[]): ProjectColor {
  const unused = projectColors.find((c) => !taken.includes(c));
  if (unused) return unused;
  return projectColors[taken.length % projectColors.length] ?? 'lilac';
}
