# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 이 프로젝트는 무엇인가

팀 협업 도구. 파일 공유/관리와 실시간 채팅을 제공한다. 핵심 기술은 **실시간 WebSocket**이다.

이 저장소는 **학습 주도 개발(learning-driven development)** 방식으로 작업한다.
속도보다 원리 이해를 우선하며, 모든 기술 결정은 `docs/decisions/`에 근거를 남긴다.

### 작업 규칙 (반드시 지킬 것)

코드를 학습 가치로 등급을 나눠 역할을 분담한다.

| 등급  | 범위                                                       | 담당                                                |
| ----- | ---------------------------------------------------------- | --------------------------------------------------- |
| **A** | 재연결·백오프, presence, 갭 복구, optimistic UI, 보안 판단 | **개발자가 직접 구현.** Claude는 코드를 쓰지 않는다 |
| **B** | 디자인 토큰 구조, 메시지 스키마, 라우트 설계               | Claude가 선택지 제시 → 개발자가 결정·구현           |
| **C** | 설정 파일, import 치환, 반복 CRUD, 타입 선언               | Claude가 작성 (단, 끝나고 이유를 설명)              |

**A급 작업 방식 — 빈칸 스캐폴드:**
Claude는 구조·타입·테스트만 만들고 핵심 함수 본문은 `// TODO: 당신이 구현`으로 비워둔다.
막혔다고 하면 **답이 아니라 힌트**를 준다. 테스트는 먼저 작성해 즉시 검증 가능하게 한다.

**단계가 끝나면:**

1. `docs/decisions/`에 결정 기록 (왜 이렇게 했나 / 무엇을 버렸나)
2. **Claude가 리뷰어 역할로 압박 질문을 던진다** → 막히는 지점이 곧 아직 안 익혀진 부분.
   설계 의도를 말로 설명할 수 있을 때까지 반복한다 (rubber duck + 코드 리뷰 방어)

금지: A급 코드를 Claude가 대신 쓰기, 설명 없이 C급 처리하기.

### 설명 방식 (중요)

개발자는 **프론트엔드 5년 경력**이지만 디자인 토큰·보안·CI/CD·TDD·브랜치 전략 등
인프라와 기초 설계 영역은 실무에서 접할 기회가 없었다. 경력 부족이 아니라 **노출 부족**이다.

따라서 **시니어가 주니어를 가이딩하는 방식**으로 설명한다:

- **개념 → 왜 필요한가 → 이 프로젝트의 실제 설정** 순서로 설명한다.
  도구 사용법만 알려주면 다음에 또 모른다. 그 도구가 **없던 시절의 문제**를 먼저 말한다
- 설정값을 던지지 않고 **그 값을 고른 이유**를 함께 적는다
  (예: `trailingComma: "all"` → diff가 한 줄만 바뀌어 리뷰가 쉬워진다)
- 대안을 함께 제시하고 **왜 그것을 선택하지 않았는지**까지 말한다
- 실무 관행을 명시한다 — "보통 회사에서는 이렇게 한다"
- 흔한 오해를 선제적으로 짚는다 (예: CD의 두 가지 뜻, `npm ci` vs `npm install`)

#### 실무 용어를 적극적으로 쓴다

개념에 **실무에서 쓰는 이름이 있으면 반드시 그 이름을 알려준다.** 설명만 하고 이름을 빼면
개발자는 그 개념을 **말로 꺼낼 수 없다.** 시니어와의 대화는 용어로 이루어진다.

- 용어는 **굵게 + 원어**로 표기한다 (예: **merge hell**, **fail fast**, **blast radius**)
- 한국 개발 현장에서도 영어 그대로 쓰는 말이 많으므로 **번역어보다 원어를 우선**한다
  (예: "표류"보다 **drift**)
- 동의어·별칭도 알려준다 (**merge hell** = **integration hell**)
- 농담·관용구도 포함한다 (**works on my machine**, **yak shaving**, **bikeshedding**) —
  실제 대화에서 나오고, 모르면 대화가 끊긴다
- 문서에는 **용어집 섹션**을 분류별로 둔다 (예: `docs/CICD.md` 8절)

#### 줄글보다 그림과 예시 (가장 중요)

개발자는 **줄글보다 도식과 구체적 예시로 더 빨리 이해한다.** 설명이 세 문단을 넘기면
그림이나 예시로 바꿀 수 있는지 먼저 검토한다.

**1) 흐름·구조·순서는 Mermaid 다이어그램으로 그린다.**

````mermaid 코드블록은 **GitHub에서 자동으로 그림으로 렌더링**되고, VS Code에서도 미리보기된다.
텍스트이므로 git diff도 된다. 설명 대상에 맞는 종류를 고른다:

| 설명할 것 | 다이어그램 종류 |
|---|---|
| 시간 순 주고받음 (클라↔서버, 재연결, 핸드셰이크) | `sequenceDiagram` |
| 상태 전이 (presence, 연결 상태) | `stateDiagram-v2` |
| 구조·관계 (아키텍처, 데이터 흐름) | `flowchart` |
| 브랜치 흐름 | `gitGraph` |

**2) 추상적 설명 뒤에는 반드시 구체적 예시를 붙인다.**

나쁜 예: "지수 백오프는 재시도 간격을 점진적으로 늘리는 전략이다"
좋은 예: 위 설명 + 실제 숫자 표

| 시도 | 지연 |
|---|---|
| 1회 | 1초 |
| 2회 | 2초 |
| 3회 | 4초 |
| 4회 | 8초 (상한) |

**3) 코드는 before/after 또는 ❌/✅ 대조로 보여준다.** 설명만 하지 않고 실물을 보여준다.

**4) 실제 출력을 붙인다.** 명령어를 알려줄 때는 "이렇게 나온다"를 실제 터미널 출력으로 보여준다.

**5) 타임라인이 중요한 버그는 시간축으로 그린다.** 실시간 디버깅의 대부분이 타이밍 문제이므로,
"무엇이 언제 일어났나"를 글로 쓰지 않고 축으로 그린다.

목표는 명령어를 외우는 것이 아니라 **시니어와 같은 어휘로 대화 가능한 상태**가 되는 것이다.

## 브랜치

**`develop` 이 본선이다.** `main` 은 초기 Remix 템플릿 상태로 방치되어 있다.
작업은 `develop` 에서 분기한다 (`feat/...`, `fix/...`).

세션 시작 시 `git branch -a` 로 원격 브랜치를 확인할 것.

## 진행 상황

진행 추적은 세 곳으로 나뉜다. **세션을 시작할 때 이 순서로 읽는다.**

| 파일               | 역할                                                       |
| ------------------ | ---------------------------------------------------------- |
| `docs/PROGRESS.md` | **현재 위치.** 주차별 체크리스트, 지금 하는 일, 다음 할 일 |
| `docs/decisions/`  | 기술 결정 기록 (ADR). 왜 그렇게 했는지의 근거              |
| `docs/notes/`      | 학습 노트·디버깅 로그. 삽질과 해결 과정                    |

이 세 디렉터리는 git에 커밋되므로 **어느 노트북에서든 `git pull`로 진행 상황이 동기화된다.**
작업을 마칠 때 `docs/PROGRESS.md`를 갱신하는 것이 세션 종료 절차다.

## 명령어

```sh
npm run dev        # 개발 서버
npm run build      # 프로덕션 빌드 -> build/client + build/server
npm start          # 빌드 결과 서브
npm run typecheck  # react-router typegen && tsc
npm run lint       # eslint
````

전체 검사는 `npm run verify` (typecheck + lint + format:check + test). CI 와 같은 명령이다.
테스트는 Vitest — `npm test`, TDD 중에는 `npm run test:watch`.

**Node 버전**: `.nvmrc` 에 고정(22.22.0). 다른 머신에서는 `nvm use` 로 맞춘다.
CI 도 `.nvmrc` 를 읽으므로 버전 출처가 한 곳이다.

⚠️ 현재 `npm run lint` 는 **에러 40건**이 있다(기존 코드 품질, 마이그레이션과 무관).
그래서 `verify` 가 통과하지 않는다. 정리 전까지 커밋은 `--no-verify` 가 필요할 수 있다.

## 아키텍처

React Router v8 (framework mode) + React 19 + TypeScript strict + Vite 8.

- **라우팅**: `app/routes.ts`가 진입점. `flatRoutes()`로 `app/routes/` 파일 규칙을 사용한다.
  명시적 라우트 선언으로 바꾸려면 이 파일을 수정한다.
- **셸**: `app/root.tsx`의 `Layout` export가 `<html>` 전체를 소유한다. default export는 `<Outlet />`뿐.
- **프레임워크 설정**: `react-router.config.ts` (`ssr: true`). Vite 플러그인 옵션이 아니다.
- **타입 생성**: `react-router typegen`이 `.react-router/types/`에 라우트 타입을 생성한다.
  `tsconfig.json`의 `rootDirs`가 이걸 연결한다. 커밋하지 않는다.
- **경로 alias**: `~/*` → `app/*`. Vite 8이 tsconfig paths를 네이티브 지원하므로
  (`resolve.tsconfigPaths: true`) 별도 플러그인이 없다.
- **서버/클라이언트 분리**: `.server/` / `.client/` 디렉터리로 경계를 강제한다.
  WebSocket 클라이언트 코드는 `.client/`에 둔다.

### 스타일: vanilla-extract

CSS를 TypeScript로 작성한다(`*.css.ts`). 생성된 클래스명을 namespace로 import:

```ts
// style.css.ts
export const root = style({ ... });
// index.tsx
import * as styles from "./style.css";   // ".ts" 없이 import
<button className={styles.root} />
```

**디렉터리 네이밍 규칙** (깨지면 Linux/CI 에서만 빌드 실패 — [ADR-0003](docs/decisions/0003-develop-migration.md)):

- **그룹 폴더는 소문자** — `app/`, `common/`, `home/`
- **컴포넌트 폴더는 PascalCase** — `ChatMain/`, `DashboardCard/`
- 각 컴포넌트 폴더에 `index.tsx` + `*.css.ts` 쌍

**디자인 토큰** (`app/styles/`):

- `variables.css.ts` — `createGlobalTheme` 으로 spacing·fontSize
- `themes.css.ts` — `createThemeContract` + `lightTheme`. **`darkTheme` 은 빈 값이다**
- `global.css.ts` — 리셋. `root.tsx` 에서 import 중

Radix UI(`@radix-ui/themes`)를 함께 쓴다. `root.tsx` 가 `<Theme>` 로 감싸고,
`<html>` 에 `lightTheme` 클래스를 붙인다.

## 현재 알려진 문제

상세는 [docs/PROGRESS.md](docs/PROGRESS.md). 요약:

- **데이터 레이어가 비어 있다** — Prisma 스키마가 기본 예제(Post/Profile/User)이고
  Team·ChatRoom·Message 모델이 없다. `app/` 에서 Prisma 사용처가 0건이다
- **모든 데이터가 하드코딩된 샘플** — 메시지·유저·팀이 컴포넌트 파일 안에 들어 있다
- **메시지 전송·파일 업로드가 `console.log` 에서 끝난다** — action 은 있지만 저장이 없다
- **인증 로직이 없다** — 로그인·회원가입 폼 UI 만 있다
- **린트 40건** — 특히 `no-floating-promises` 3건은 실제 버그 가능성이 있다
- `darkTheme` 이 빈 값이다
- `noUncheckedIndexedAccess` 보류 중 — `ChatMain` 날짜 그룹핑 재작성 시 함께 켠다
- `ChatMain` 에 React key 누락 경고 (fragment 에 key 없음)
- `npm audit`에 high 취약점이 보고된다. 10주차 보안 작업에서 함께 다룬다(학습 소재).
