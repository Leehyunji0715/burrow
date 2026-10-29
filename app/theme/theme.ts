// index.html 의 인라인 스크립트와 같은 키·규칙을 쓴다. 한쪽만 바꾸면 새로고침 직후 테마가 어긋난다.
export const THEME_STORAGE_KEY = 'burrow-theme';

/** 사용자가 고른 값. system 은 OS 설정을 따른다 */
export type ThemePreference = 'light' | 'dark' | 'system';
/** 실제로 화면에 적용되는 값 */
export type ResolvedTheme = 'light' | 'dark';

export const darkQuery = '(prefers-color-scheme: dark)';

export function readPreference(): ThemePreference {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'light' || saved === 'dark' ? saved : 'system';
  } catch {
    return 'system';
  }
}

export function writePreference(preference: ThemePreference) {
  try {
    // system 은 저장하지 않는다 — 키가 없으면 system 으로 읽히므로 상태가 하나로 유지된다.
    if (preference === 'system') localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // 저장이 막혀도 이번 세션의 화면 전환은 동작한다.
  }
}

export function resolveTheme(preference: ThemePreference, systemDark: boolean): ResolvedTheme {
  if (preference === 'system') return systemDark ? 'dark' : 'light';
  return preference;
}

export function applyTheme(theme: ResolvedTheme) {
  document.documentElement.dataset.theme = theme;
}
