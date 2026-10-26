# ADR-0003: develop 브랜치 React Router v8 마이그레이션

- **날짜**: 2026-10-14
- **상태**: 완료 → **Superseded by [ADR-0004](0004-framework-to-spa.md)** (framework mode 를 SPA 로 대체)

## 배경

[ADR-0001](0001-remix-v2-to-react-router-v8.md)은 `main`(Remix 템플릿) 위에서 수행한 마이그레이션이었다.
그런데 **실제 앱은 `develop` 에 있었다** (커밋 51개, 소스 2,633줄).
`main` 만 보고 "greenfield 프로젝트"로 판단한 것이 오류였다.

→ **교훈**: 작업 시작 전 `git branch -a` 로 원격 브랜치를 먼저 확인한다.

따라서 같은 마이그레이션을 `develop` 에 다시 적용했다.
ADR-0001 에서 함정 4개를 이미 알고 있었으므로 두 번째는 훨씬 빨랐다.

## develop 의 실제 상태 (마이그레이션 전 조사)

예상과 달랐던 부분이 많아 기록해둔다.

| 영역                    | 상태                                                                          |
| ----------------------- | ----------------------------------------------------------------------------- |
| 채팅 UI                 | ✅ 구현됨 (날짜 그룹핑, 말풍선, 연속 발신 처리)                               |
| 채팅방·팀 목록          | ✅ 구현됨                                                                     |
| 대시보드 + Quill 에디터 | ✅ 구현됨 (DOMPurify 로 XSS 방어까지)                                         |
| 로그인·회원가입         | 폼 UI 만. **로직 없음**                                                       |
| 디자인 토큰             | ✅ `createThemeContract` 로 제대로 구성. **단 다크 테마는 빈 값**             |
| **DB**                  | ❌ Prisma 가 **기본 예제 그대로** (Post/Profile/User). Team·Message 모델 없음 |
| **데이터**              | ❌ 전부 컴포넌트 파일에 하드코딩된 샘플                                       |
| **메시지 전송**         | ❌ action 이 `console.log` 에서 끝남                                          |
| **파일 업로드**         | ❌ UI 만. 저장 로직 없음                                                      |

즉 **UI 레이어는 상당히 진행됐고, 데이터 레이어는 비어 있다.**

## 마이그레이션 내용

### 패키지

| 이전                                | 이후                                             | 비고                                            |
| ----------------------------------- | ------------------------------------------------ | ----------------------------------------------- |
| `@remix-run/{node,react,serve,dev}` | `react-router`, `@react-router/{node,serve,dev}` |                                                 |
| React 18.2                          | **19.3.0**                                       | `react-router@8` peer 가 `>=19.2.7` 요구        |
| Vite 6                              | **8.3.4**                                        | `@react-router/dev@8` peer 가 `^7 \|\| ^8` 요구 |
| `@radix-ui/themes` 3.2.1            | **3.3.0**                                        | React 19 지원 버전                              |
| `remix-utils` 7.7.0                 | **10.0.0**                                       | ⭐ **v8 지원함** (peer: `react-router: ^8.0.0`) |
| `vite-tsconfig-paths`               | **제거**                                         | Vite 8 이 tsconfig paths 네이티브 지원          |

> **`remix-utils` 가 최대 변수였는데 해소됐다.** 이름이 remix 전용이라 교체가 필요할까 우려했지만,
> 10.0.0 이 React Router v8 을 지원한다. 사용처도 `ClientOnly` 하나뿐이었다.

### 소스 코드

- **35개 import, 21개 파일**을 `react-router` 로 치환
- **`json()` 제거** — single fetch 에서는 제거된 API 다. loader 6곳이 객체를 직접 반환하도록 변경

```ts
// before
return json({ id: params.id });
// after
return { id: params.id };
```

- `RemixBrowser` → `HydratedRouter` (`react-router/dom`)
- `RemixServer` → `ServerRouter`
- `AppLoadContext` → `RouterContextProvider`
- `<ServerRouter>` 의 `abortDelay` prop 제거 (기존 `setTimeout(abort, ...)` 가 그대로 처리)

### 설정

- `react-router.config.ts` 신규 (`ssr: true`)
- `app/routes.ts` 신규 — `flatRoutes()` 로 기존 파일 규칙 유지
- `vite.config.ts` — future flag 제거, `reactRouter()` 플러그인
- `tsconfig.json` — `.react-router/types` include, `rootDirs`

## 함께 수정한 버그 2건

### 1. casing 버그 — Linux CI 에서 빌드 실패 (별도 커밋)

```
error TS1149: File name '.../components/app/index.ts' differs from
already included file name '.../components/App/index.ts' only in casing.
```

디렉터리는 `components/App/`(대문자)인데 6개 라우트가 `~/components/app`(소문자)으로 import 했다.
Windows·macOS 는 대소문자를 구분하지 않아 동작했지만 **Linux(CI)에서는 모듈 해석 실패**다.

→ 디렉터리를 소문자로 변경했다. 규칙을 명확히 한 결과:

- **그룹 폴더는 소문자** (`app`, `common`, `home`)
- **컴포넌트 폴더는 PascalCase** (`ChatMain`, `DashboardCard`)

`App` 하나만 규칙을 벗어나 있었고, import 가 이미 소문자를 기대했으므로 호출부 변경은 없었다.

`core.ignorecase=true` 환경이라 `git mv` 를 2단계(임시 이름 경유)로 했다.
직접 `App` → `app` 변경은 git 이 같은 이름으로 보고 기록하지 않는다.

> **실무 용어**: **case-sensitivity bug**. 한 OS 에서만 되는 문제라
> **works on my machine** 의 교과서적 사례다.
> `forceConsistentCasingInFileNames` 가 tsconfig 에 켜져 있어 tsc 는 잡았지만,
> Vite dev 서버는 통과시켜 **눈으로는 보이지 않았다.**

### 2. Editor 의 무의미한 null 체크

```ts
// ❌ before — container 로 체크하고 containerRef.current 를 사용
if (!container || container.hasChildNodes()) return;
containerRef.current.appendChild(editorContainer);   // 체크가 무의미

// ✅ after
container.appendChild(editorContainer);
```

TypeScript 가 `TS18047: 'containerRef.current' is possibly 'null'` 로 정확히 지적했다.
체크한 변수와 사용한 변수가 달라 **타입 좁히기(narrowing)가 적용되지 않은** 상태였다.

## 제거한 것

`app/routes/signIn.tsx` (10바이트, `// export` 주석 한 줄)
`app/routes/api/auth/signIn.ts` (0바이트)

둘 다 인증 작업을 시작하려다 만 **빈 플레이스홀더**였다.
React Router v8 은 `app/routes/` 하위 모든 파일을 라우트로 인식하므로
빈 파일이 typegen 에러(`TS2306: not a module`)를 일으켰다.

→ 삭제했다. git 히스토리에 남아 있으므로 10주차 인증 작업 때 복구 가능하다.

## 보류한 것 — `noUncheckedIndexedAccess`

[ADR-0002](0002-lint-rule-set.md)에서 채택했지만 **`develop` 에서는 보류했다.**

이유: 기존 코드에서 **에러 11건**이 발생한다. 전부 `ChatMain` 의 날짜 그룹핑 로직이다.

```ts
const date = dateTime.split('T')[0];   // string | undefined
if (!acc[date]) { ... }                // ❌ undefined 를 인덱스로 쓸 수 없음
```

판단:

- 이 로직은 **직접 구현할 핵심 로직**이고
- 메시지를 DB 로 이관할 때 **어차피 재작성된다**
- 지금 임시로 때우면 두 번 일하게 된다

→ `tsconfig.json` 에 **주석으로 남겨두고**, DB 이관 시점에 함께 켠다.
ADR-0002 의 결정은 유효하며 적용 시점만 미룬 것이다.

`no-unnecessary-condition` 도 같은 이유로 아직 넣지 않았다.

## 검증

| 항목                                                                                                                              | 결과                                          |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `npm run typecheck`                                                                                                               | ✅ **0 errors**                               |
| `npm run build`                                                                                                                   | ✅ client **1,166 모듈**, server **96 모듈**  |
| dev 서버                                                                                                                          | ✅ 기동                                       |
| 라우트 8개 (`/`, `/login`, `/signup`, `/app/chat`, `/app/chat/:id`, `/app/teams`, `/app/teams/1/dashboard`, `/app/teams/1/files`) | ✅ **전부 200**                               |
| 실제 콘텐츠 렌더                                                                                                                  | ✅ 채팅 메시지·대시보드 데이터·로그인 폼 확인 |
| `npm run lint`                                                                                                                    | ⚠️ **40건** (아래)                            |

### 린트 40건 — 마이그레이션과 무관한 기존 코드 품질

타입 인식 린팅을 켠 결과 드러난 것들이다. 분포:

| 규칙                                                   | 건수  | 성격                             |
| ------------------------------------------------------ | ----- | -------------------------------- |
| `no-unused-vars`                                       | 8     | 정리 대상                        |
| `require-await`                                        | 5     | `async` 인데 `await` 없는 loader |
| `react/display-name`                                   | 5     | `forwardRef` 컴포넌트            |
| `no-unsafe-*` (member-access/call/assignment/argument) | 8     | Quill `any` 관련                 |
| **`no-floating-promises`**                             | **3** | ⚠️ **실제 버그 가능성**          |
| `prefer-promise-reject-errors`                         | 2     |                                  |
| `unbound-method`                                       | 2     |                                  |
| `jsx-a11y/alt-text`                                    | 2     | 접근성                           |
| `react-hooks/refs`, `set-state-in-effect`              | 3     | React 19 에서 엄격해진 규칙      |

**이 커밋에서는 손대지 않았다.** 마이그레이션 커밋에 코드 품질 수정을 섞으면
무엇이 마이그레이션 때문이고 무엇이 아닌지 구분할 수 없게 된다.
별도 작업으로 다룬다 → `docs/PROGRESS.md`

특히 `no-floating-promises` 3건은 **`await` 를 빠뜨린 Promise** 로,
실시간 작업 전에 확인해야 한다.

### 추가 발견: React 19 key 경고

dev 로그에 `ChatMain` 의 key 누락 경고가 뜬다.
`<>` fragment 에 `key` 를 주지 않아서인데, React 19 에서 더 엄격해졌다.
마이그레이션과 무관한 기존 문제다.

## 요약

> Remix v2 가 EOL 이어서 React Router v8 로 이전했습니다.
> future flag 가 이미 다 켜져 있어 핵심은 import 치환이었고,
> React 19·Vite 8 동반 업그레이드가 peer dependency 로 강제됐습니다.
> 과정에서 Linux CI 에서만 터지는 casing 버그와 무의미한 null 체크를 발견해 함께 고쳤습니다.
> 타입 인식 린팅을 켜니 기존 코드에서 40건이 나왔는데, 마이그레이션 커밋에 섞지 않고 분리했습니다.
