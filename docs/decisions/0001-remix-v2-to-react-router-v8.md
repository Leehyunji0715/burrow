# ADR-0001: Remix v2 → React Router v8 마이그레이션

- **날짜**: 2026-10-13
- **상태**: 완료
- **등급**: C (기계적 작업이므로 Claude가 수행, 이유는 아래 기록)

## 배경

프로젝트는 Remix v2.16.3으로 시작했다. 당시 Remix는 널리 쓰이는 선택이었다.
이후 Remix 팀은 **"Remix v3로 출시하려던 것을 React Router v7로 출시한다"**고 발표했고,
Remix v2는 EOL이 되었다. 현재 후속 버전은 React Router v8이다.

Remix는 세 갈래로 갈라졌으므로 혼동하지 않아야 한다:

|                      | 정체                                                           |
| -------------------- | -------------------------------------------------------------- |
| Remix v2             | 마지막 독립 Remix. **EOL**                                     |
| React Router v7 → v8 | Remix v2의 **실질적 후속**                                     |
| Remix 3              | React를 버리고 Preact 포크 기반. **후속이 아닌 별개 프로젝트** |

## 결정

**React Router v8로 이전한다.** Remix 3은 React 기반 앱의 마이그레이션 대상이 아니므로 제외했다.

## 왜 비용이 낮았나

`vite.config.ts`에 **future flag가 이미 전부 켜져 있었다**:
`v3_fetcherPersist`, `v3_relativeSplatPath`, `v3_throwAbortReason`, `v3_singleFetch`, `v3_lazyRouteDiscovery`.

공식 가이드가 말하는 "non-breaking 마이그레이션"의 전제 조건이 바로 이것이다.
future flag는 **파괴적 변경을 미리 opt-in 해두는 장치**이므로, 켜둔 상태라면
메이저 업그레이드가 사실상 import 치환으로 끝난다.

즉 과거에 flag를 켜둔 선택이 지금의 비용을 낮췄다.

## 실제로 한 일

1. 패키지 교체: `@remix-run/node` → `@react-router/node`, `@remix-run/react` → `react-router`,
   `@remix-run/serve` → `@react-router/serve`, `@remix-run/dev` → `@react-router/dev`
2. 스크립트: `remix vite:build` → `react-router build`, `typecheck`에 `react-router typegen` 추가
3. `vite.config.ts`의 `remix()` → `reactRouter()`, future flag 제거
4. 설정 분리: `react-router.config.ts` 신규 (`ssr: true`)
5. `app/routes.ts` 신규 — v8은 라우트 설정 파일이 필수. `flatRoutes()`로 기존 파일 규칙 유지
6. 엔트리: `RemixBrowser` → `HydratedRouter`(`react-router/dom`), `RemixServer` → `ServerRouter`
7. `tsconfig.json`: `.react-router/types/**/*` include, `rootDirs` 추가, types를 `@react-router/node`로
8. `.gitignore`에 `.react-router/` 추가

## 가이드에 없던 문제 3개 (직접 부딪혀 해결)

공식 마이그레이션 가이드는 **v7 기준**이어서 v8의 추가 변경이 빠져 있었다.
전부 `npm run typecheck`와 `npm install`이 잡아냈다.

**1) React 19 강제**
`react-router@8`의 peer dependency가 `react >= 19.2.7`. v7은 React 18을 허용했지만 v8은 아니다.
→ React/react-dom/@types 를 19.3.0 으로 올렸다.

**2) Vite 7+ 강제**
`@react-router/dev@8`의 peer가 `vite ^7 || ^8`.
→ Vite 8.3.4로 올렸다. `@vanilla-extract/vite-plugin`은 5.2.6이 Vite 8을 지원해 충돌 없었다.
→ 부수 효과: **Vite 8이 tsconfig paths를 네이티브 지원**하므로 `vite-tsconfig-paths` 플러그인을 제거하고
`resolve.tsconfigPaths: true`로 대체했다. 의존성이 하나 줄었다.

**3) `AppLoadContext` 제거 / `abortDelay` 제거**

- `AppLoadContext` 타입이 v8에서 사라지고 `RouterContextProvider`로 대체되었다.
- `<ServerRouter>`가 `abortDelay` prop을 더 이상 받지 않는다.
  타입 정의를 직접 확인한 결과 v8의 props는 `context`, `url`, `nonce` 뿐이다.
  → prop만 제거했다. 기존 `setTimeout(abort, ABORT_DELAY)`가 그대로 중단을 처리하므로 동작은 동일하다.

**4) lockfile 충돌**
`package-lock.json`이 구 `@remix-run` 트리(react-router 6.30.0)를 고정하고 있어 ERESOLVE가 발생했다.
→ lockfile을 재생성했다. `--legacy-peer-deps`로 덮지 않았다 —
peer 경고를 무시하면 런타임에 두 버전이 섞여 더 어려운 버그가 된다.

## 검증

| 항목                      | 결과                                  |
| ------------------------- | ------------------------------------- |
| `npm run typecheck`       | 통과 (에러 0)                         |
| `npm run lint`            | 통과 (exit 0)                         |
| `npm run build`           | 통과 — client 97 모듈, server 6 모듈  |
| `npm run dev` + 실제 요청 | **HTTP 200**, SSR HTML 정상 렌더 확인 |

## 남은 이슈

- **Node 버전**: RR8은 Node > 22.22.0 요구. 로컬은 v22.21.1 이라 경고가 뜬다(동작은 함).
  `nvm install 22.22.0` 으로 해소할 것.
- `npm audit`에 high 취약점 보고 → 10주차 보안 작업에서 학습 소재로 다룸.

## 요약

> Remix v2로 시작했는데 프레임워크가 EOL이 됐습니다. 후속인 React Router v8로 이전했고,
> future flag를 미리 켜둔 덕에 핵심 변경은 import 치환으로 끝났습니다.
> 다만 공식 가이드가 v7 기준이어서 v8의 추가 제약(React 19, Vite 7+ 강제)과
> 제거된 API(`AppLoadContext`, `abortDelay`)는 타입 정의를 직접 확인해 해결했습니다.
> lockfile 충돌은 `--legacy-peer-deps`로 덮지 않고 재생성했습니다. 버전이 섞이면 런타임 버그가 되니까요.
