import { describe, expect, it } from 'vitest';

import { pickProjectColor, projectColors } from './projectColor';

describe('pickProjectColor', () => {
  it('프로젝트가 없으면 팔레트 첫 색을 준다', () => {
    expect(pickProjectColor([])).toBe('lilac');
  });

  it('이미 쓰는 색을 건너뛰고 순서대로 다음 색을 준다', () => {
    expect(pickProjectColor(['lilac', 'mint'])).toBe('pink');
    expect(pickProjectColor(['mint'])).toBe('lilac');
  });

  it('8색을 다 쓰면 처음부터 다시 돌린다', () => {
    expect(pickProjectColor([...projectColors])).toBe('lilac');
    expect(pickProjectColor([...projectColors, 'lilac'])).toBe('mint');
  });
});
