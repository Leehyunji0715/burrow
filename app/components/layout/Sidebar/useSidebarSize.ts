import {
  type KeyboardEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react';

import { mobileQuery } from '~/styles/media';

export const SIDEBAR_MIN = 220;
export const SIDEBAR_MAX = 420;
const SIDEBAR_DEFAULT = 260;
/** 최소 너비보다 이만큼 더 줄이려 하면 접는다. 최소 너비에서 바로 접히면 조금만 손이 떨려도 닫혀 버린다 */
const COLLAPSE_BELOW = SIDEBAR_MIN - 60;
const KEY_STEP = 16;
const STORAGE_KEY = 'burrow-sidebar';

type SidebarState = { width: number; collapsed: boolean };

const clamp = (w: number) => Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, Math.round(w)));

function readSaved(): SidebarState {
  try {
    const saved = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? 'null',
    ) as Partial<SidebarState> | null;
    return {
      width: typeof saved?.width === 'number' ? clamp(saved.width) : SIDEBAR_DEFAULT,
      collapsed: saved?.collapsed === true,
    };
  } catch {
    return { width: SIDEBAR_DEFAULT, collapsed: false };
  }
}

function subscribeMobile(onChange: () => void) {
  const media = matchMedia(mobileQuery);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}
const getMobile = () => matchMedia(mobileQuery).matches;

/**
 * 사이드바 너비·접힘 상태. 끌기·키보드로 조절하고, 넓은 화면에서 정한 값은 기억해 둔다.
 * 좁은 화면에서는 항상 접힌 채로 시작한다 (본문 위에 덮이는 방식이라 열려 있으면 본문을 가린다).
 */
export function useSidebarSize() {
  const isMobile = useSyncExternalStore(subscribeMobile, getMobile);
  const [state, setState] = useState<SidebarState>(() =>
    getMobile() ? { ...readSaved(), collapsed: true } : readSaved(),
  );

  // 좁은 화면에서 잠깐 접은 상태가 넓은 화면의 설정을 덮어쓰지 않도록 넓을 때만 저장한다
  useEffect(() => {
    if (isMobile) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // 저장이 막혀도 이번 화면에서는 동작한다
    }
  }, [state, isMobile]);

  const collapse = useCallback(() => setState((s) => ({ ...s, collapsed: true })), []);
  const expand = useCallback(() => setState((s) => ({ ...s, collapsed: false })), []);

  const startDrag = (e: PointerEvent<HTMLElement>) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = state.width;

    const onMove = (ev: globalThis.PointerEvent) => {
      const next = startWidth + (ev.clientX - startX);
      // 접힌 뒤에도 같은 끌기 안에서 다시 오른쪽으로 끌면 펼쳐진다. 접혀도 마지막 너비는 남겨 둔다
      setState((s) =>
        next < COLLAPSE_BELOW
          ? { ...s, collapsed: true }
          : { width: clamp(next), collapsed: false },
      );
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      document.body.style.removeProperty('cursor');
      document.body.style.removeProperty('user-select');
    };

    // 끄는 동안 포인터가 손잡이를 벗어나도 따라가도록 window 에서 듣는다
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const onHandleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    const keys: Record<string, () => SidebarState> = {
      ArrowLeft: () => ({ width: clamp(state.width - KEY_STEP), collapsed: false }),
      ArrowRight: () => ({ width: clamp(state.width + KEY_STEP), collapsed: false }),
      Home: () => ({ width: SIDEBAR_MIN, collapsed: false }),
      End: () => ({ width: SIDEBAR_MAX, collapsed: false }),
      Enter: () => ({ ...state, collapsed: !state.collapsed }),
    };
    const next = keys[e.key];
    if (!next) return;
    e.preventDefault();
    setState(next());
  };

  return { ...state, isMobile, collapse, expand, startDrag, onHandleKeyDown };
}
