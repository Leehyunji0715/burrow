import {
  type ReactNode,
  createContext,
  use,
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react';

import {
  type ResolvedTheme,
  type ThemePreference,
  applyTheme,
  darkQuery,
  readPreference,
  resolveTheme,
  writePreference,
} from './theme';

type ThemeContextValue = {
  preference: ThemePreference;
  resolved: ResolvedTheme;
  setPreference: (preference: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

// OS 다크 모드 설정을 React 바깥의 저장소처럼 구독한다.
// "system" 을 고른 상태에서 OS 설정이 바뀌면 새로고침 없이 따라간다.
function subscribeSystem(onChange: () => void) {
  const media = matchMedia(darkQuery);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}
const getSystemDark = () => matchMedia(darkQuery).matches;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState(readPreference);
  const systemDark = useSyncExternalStore(subscribeSystem, getSystemDark);
  const resolved = resolveTheme(preference, systemDark);

  useEffect(() => {
    applyTheme(resolved);
  }, [resolved]);

  const setPreference = (next: ThemePreference) => {
    writePreference(next);
    setPreferenceState(next);
  };

  return <ThemeContext value={{ preference, resolved, setPreference }}>{children}</ThemeContext>;
}

export function useTheme() {
  const value = use(ThemeContext);
  if (!value) throw new Error('useTheme 은 ThemeProvider 안에서만 쓴다');
  return value;
}
