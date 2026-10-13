# 기술 스택: 무엇을 왜 쓰는가

각 도구의 **역할 / 강점 / 이 프로젝트에 적합한 이유 / 대안과 비교**.
"왜 이걸 썼냐"는 질문에 답할 수 있게 하는 것이 이 문서의 목적이다.

## 현재 설치된 버전

| 도구                | 버전           | 역할                                |
| ------------------- | -------------- | ----------------------------------- |
| React Router        | 8.4.0          | 프레임워크 (라우팅·SSR·데이터 로딩) |
| React               | 19.3.0         | UI 런타임                           |
| TypeScript          | 5.x            | 타입                                |
| Vite                | 8.3.4          | 빌드·개발 서버                      |
| vanilla-extract     | 1.21.3         | CSS                                 |
| ESLint              | 8.57.1         | 린트 ⚠️ **구버전 — 아래 참조**      |
| Prettier            | 3.9.10         | 포매팅                              |
| Vitest              | 5.0.4          | 테스트                              |
| husky + lint-staged | 9.1.7 / 17.6.0 | git hook                            |

---

## 프레임워크

### React Router v8 (framework mode)

**역할**: 라우팅 + SSR + 데이터 로딩(loader/action)을 한 묶음으로 제공.

**강점**

- **웹 표준에 가깝다** — `Request`/`Response`, `FormData`를 그대로 쓴다.
  프레임워크 전용 추상화가 얇아서 **배운 것이 프레임워크 밖에서도 유효하다.** 학습 목적에 중요한 성질이다.
- **점진적 향상(progressive enhancement)** — `<Form>`이 JS 없이도 동작한다.
- 중첩 라우팅과 데이터 로딩이 한 모델로 통합되어 있다.

**이 프로젝트 적합성**: 적합. 단 **중요한 제약 하나** —
`loader`/`action`은 **HTTP 요청-응답 모델**이라 WebSocket 서버를 품지 못한다.
따라서 실시간은 별도 경로가 필요하다 (2주차 결정 사항).
→ 프레임워크가 HTTP를, WebSocket은 별도 프로세스가 담당하는 **역할 분리** 구조가 된다.
이 경계를 이해하는 것 자체가 학습 포인트다.

**대안 비교**

|                  | 특징                          | 왜 선택하지 않았나                                                                   |
| ---------------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| Next.js          | 생태계 최대, App Router + RSC | 추상화가 두껍다. 학습 목적엔 "왜 동작하는지"가 가려짐. 다만 **채용 시장 점유율 1위** |
| SvelteKit / Nuxt | 우수하나 React 아님           | 프론트 5년 경력(React)을 버릴 이유가 없다                                            |
| Vite + 직접 조립 | 학습량 최대                   | 라우팅/SSR을 직접 만들면 정작 WebSocket에 쓸 시간이 사라진다                         |

> 참고: 채용 공고 기준으로는 Next.js 수요가 더 많다. 다만 이 프로젝트의 차별점은
> 프레임워크가 아니라 실시간 설계이므로, 웹 표준에 가까운 쪽이 학습 효율에서 유리하다.

### React 19

v8의 peer dependency가 `>= 19.2.7`이라 **선택이 아니라 요구사항**이었다(ADR-0001).

알아둘 v19 변화: `ref`를 prop으로 직접 받을 수 있어 **`forwardRef`가 불필요**해졌다.
→ `app/components/button/index.tsx`가 아직 `forwardRef`를 쓰고 있다. 1주차 정리 대상.

---

## 스타일

### vanilla-extract

**역할**: CSS를 TypeScript로 작성 → 빌드 시 **정적 CSS 파일**로 추출.

**강점**

- **런타임 비용 0** — CSS-in-JS(styled-components 등)와 달리 브라우저에서 스타일을 계산하지 않는다.
- **타입 안전한 디자인 토큰** — 토큰 오타가 **컴파일 에러**가 된다. 이게 최대 강점이다.
- 스코프 자동 분리 (클래스명 충돌 불가)

**이 프로젝트 적합성**: 매우 적합.

- Teams류 UI는 **밀도가 높고 테마(라이트/다크)가 필수** → 토큰 체계가 본질적으로 필요하다
- "디자인 토큰을 제대로 배우고 싶다"는 목표와 정확히 맞는다.
  Tailwind는 토큰을 **숨겨주기** 때문에 배우기엔 오히려 불리하다
- Figma 토큰 → TS 토큰 매핑이 자연스럽다 (`docs/notes/figma-workflow.md`)

**대안 비교**

|                   | 왜 아닌가                                               |
| ----------------- | ------------------------------------------------------- |
| Tailwind          | 빠르지만 토큰 설계를 안 배우게 된다. 목표와 상충        |
| CSS Modules       | 타입 안전성이 없다 (클래스명 오타가 런타임 무음 실패)   |
| styled-components | 런타임 비용 + React 19/RSC 환경에서 입지 축소           |
| Panda CSS         | vanilla-extract와 유사 철학, 더 신식. 합리적 대안이었음 |

---

## 품질 도구

### TypeScript — 현재 설정

`tsconfig.json`의 핵심 항목:

| 설정               | 값                        | 의미                                                     |
| ------------------ | ------------------------- | -------------------------------------------------------- |
| `strict`           | `true`                    | **가장 중요.** null 체크, 암묵적 any 금지 등 일괄 활성화 |
| `moduleResolution` | `Bundler`                 | Vite 같은 번들러 기준으로 import 해석. 요즘 표준         |
| `isolatedModules`  | `true`                    | 파일 단위 변환 가능한 코드만 허용 (Vite가 요구)          |
| `noEmit`           | `true`                    | tsc는 **검사만** 한다. 변환은 Vite가                     |
| `paths`            | `~/* → app/*`             | 경로 alias                                               |
| `rootDirs`         | `. + .react-router/types` | 생성된 라우트 타입을 소스처럼 취급                       |

**시니어가 추가로 켜는 것들** (현재 꺼져 있음 — 1주차에 켤지 결정):

```jsonc
"noUncheckedIndexedAccess": true,  // arr[0]의 타입이 T → T | undefined. 배열 접근 버그를 잡는다
"noImplicitOverride": true,         // override 키워드 강제
"exactOptionalPropertyTypes": true, // { a?: string }에 undefined를 명시 대입 금지
"verbatimModuleSyntax": true        // import type을 명확히 구분
```

`noUncheckedIndexedAccess`는 특히 **실시간 로직에 유용하다**
(메시지 배열 인덱싱이 많고, 거기서 `undefined`를 놓치면 바로 버그).
다만 처음엔 에러가 많이 나므로 각오가 필요하다.

### ESLint 9 + flat config

**현재 상태**: ESLint **9.39.5** + `eslint.config.js` (flat config), **타입 인식 린팅 활성**.
2026-10-13 에 eslintrc 에서 이전했다 → [상세 기록](notes/eslint-flat-config.md)

주요 변경:

- `@typescript-eslint/*` 2개 → `typescript-eslint` 1개로 통합
- `eslint-plugin-import` → `eslint-plugin-import-x` (flat config 지원이 활발)
- **`recommendedTypeChecked`** 적용 → `no-floating-promises` 등 타입 기반 규칙 동작

> **ESLint 10 보류**: `jsx-a11y`(^9까지)와 `plugin-react`(^9.7까지)가 미지원.
> `--legacy-peer-deps` 강제 설치는 런타임 파손 위험이 있어 선택하지 않았다.
> flat config·타입 인식 린팅은 9에서 동일하게 동작한다.

**대안**: Biome(2.5.15), oxlint(1.87.0)가 Rust 기반으로 훨씬 빠르고 포매터까지 겸한다.
다만 ESLint 생태계(특히 `jsx-a11y`, React 플러그인)가 아직 더 넓어서,
**학습 목적으로는 ESLint가 낫다**(실무에서 만날 확률이 높다).

### Prettier 3.9.10 — 현재 설정

```jsonc
// .prettierrc.json
{
  "semi": true, // 세미콜론
  "singleQuote": false, // 쌍따옴표 (기존 코드 스타일과 일치)
  "trailingComma": "all", // 마지막 쉼표 — diff가 깨끗해진다
  "printWidth": 80,
  "tabWidth": 2,
}
```

**역할 분리가 핵심**: Prettier는 **포매팅**(줄바꿈·공백), ESLint는 **코드 품질**(버그 가능성).
둘을 겹치면 충돌하므로, 포매팅 규칙은 Prettier에만 둔다.

`trailingComma: "all"`을 쓰는 이유: 배열/객체에 항목을 추가할 때
**diff가 한 줄만 바뀐다**(마지막 줄에 쉼표를 붙이는 변경이 안 생긴다). 리뷰가 쉬워진다.

### Vitest 5.0.4

**강점**

- **Vite 설정을 그대로 재사용** — 별도 트랜스파일 설정이 필요 없다 (Jest의 최대 고충이 이것)
- ESM 네이티브, 빠름
- Jest 호환 API — `describe`/`it`/`expect`가 동일해서 Jest 지식이 그대로 쓰인다
- 타이머 모킹(`vi.useFakeTimers`)이 잘 되어 있다 → **재연결/하트비트 테스트에 필수**

**적합성**: 매우 적합. Vite 기반 프로젝트에서 Jest를 쓸 이유가 거의 없다.

### husky + lint-staged

- **husky**: git hook 관리 (`.husky/` 디렉터리를 팀원과 공유 가능)
- **lint-staged**: **스테이징된 파일만** 검사 → 커밋이 빠르다

현재 설정:

```
pre-commit → lint-staged (eslint --fix + prettier, 변경 파일만)
pre-push   → typecheck + test (느리지만 원격 보호)
```

무거운 검사를 pre-commit에 넣으면 사람들이 hook을 끈다. **단계별 분리가 실무 관행이다.**

---

## 아직 정하지 않은 것

| 항목             | 주차 | 선택지                                                                    |
| ---------------- | ---- | ------------------------------------------------------------------------- |
| WebSocket 서버   | 2    | `ws`(저수준·학습용) vs Socket.IO(편의·자동 재연결) → **학습 목적상 `ws`** |
| DB               | 5    | SQLite+Drizzle / PostgreSQL+Prisma / Drizzle+PG                           |
| Redis 클라이언트 | 8    | `ioredis` vs `node-redis`                                                 |
| 파일 저장소      | 9    | 로컬 디스크 vs MinIO(S3 호환)                                             |
| 인증             | 10   | 직접 구현(학습) vs Lucia/Auth.js                                          |

각 주차에 선택지와 트레이드오프를 정리해 결정하고 ADR로 남긴다.

> **Socket.IO를 쓰지 않는 이유**: 재연결·하트비트·룸을 전부 대신 해준다.
> 그게 바로 이 프로젝트에서 배우려는 것이므로, 라이브러리가 학습을 가로막는다.
> 단, 8단계를 끝낸 뒤 "Socket.IO가 무엇을 해주는지" 비교해보면 이해가 완성된다.
