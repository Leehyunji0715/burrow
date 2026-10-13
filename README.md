# Team Manage Service

팀 협업 도구. 파일 공유/관리와 실시간 채팅을 제공한다.

핵심 기술은 **실시간 통신(WebSocket)** 이며, 재연결·presence·메시지 갭 복구·수평 확장을
직접 설계하는 것에 중점을 둔다.

## 기술 스택

| 영역       | 선택                                                 |
| ---------- | ---------------------------------------------------- |
| 프레임워크 | React Router v8 (framework mode, SSR)                |
| UI         | React 19, Radix UI Themes                            |
| 언어       | TypeScript (strict)                                  |
| 빌드       | Vite 8                                               |
| 스타일     | vanilla-extract (타입 안전 디자인 토큰)              |
| DB         | PostgreSQL + Prisma                                  |
| 에디터     | Quill                                                |
| 테스트     | Vitest                                               |
| 품질       | ESLint 9 (flat config, 타입 인식) · Prettier · husky |

각 선택의 근거와 대안 비교는 [docs/STACK.md](docs/STACK.md) 참조.

## 시작하기

**요구사항**: Node 22.22.0 이상 (`.nvmrc` 에 고정 — `nvm use` 로 맞출 수 있다)

```sh
npm install
```

### DB 설정

1. `.env.copy` 를 `.env` 로 복사한다
2. `DATABASE_URL` 에 PostgreSQL 연결 정보를 입력한다
3. 마이그레이션을 실행한다

```sh
npx prisma migrate dev --name init
```

### 개발 서버

```sh
npm run dev
```

## 명령어

```sh
npm run dev            # 개발 서버
npm run build          # 프로덕션 빌드
npm start              # 빌드 결과 서브

npm run typecheck      # 타입 검사 (typegen 포함)
npm run lint           # 린트
npm run format         # 포매팅 적용
npm test               # 테스트
npm run test:watch     # 테스트 watch (TDD)
npm run verify         # 전체 검사 (CI 와 동일)
```

## 문서

| 문서                                                               | 내용                        |
| ------------------------------------------------------------------ | --------------------------- |
| [docs/PROGRESS.md](docs/PROGRESS.md)                               | 진행 상황·로드맵            |
| [docs/WORKFLOW.md](docs/WORKFLOW.md)                               | TDD·브랜치 전략·품질 게이트 |
| [docs/STACK.md](docs/STACK.md)                                     | 기술 선택 근거              |
| [docs/CICD.md](docs/CICD.md)                                       | CI/CD 개념과 설정           |
| [docs/notes/realtime-glossary.md](docs/notes/realtime-glossary.md) | 실시간 용어집 + 개념 도식   |
| [docs/decisions/](docs/decisions/)                                 | 기술 결정 기록 (ADR)        |
| [docs/notes/](docs/notes/)                                         | 학습 노트·디버깅 로그       |

## 프로젝트 구조

```
app/
  routes.ts            # 라우트 설정 (flatRoutes)
  root.tsx             # HTML 셸 (Layout export) + Radix Theme
  entry.client.tsx     # 클라이언트 하이드레이션
  entry.server.tsx     # SSR 스트리밍
  routes/              # 파일 기반 라우트
  components/
    app/               # 앱 내부 (채팅·팀·대시보드)
    common/            # 공통 (Button, InputText, Editor...)
    home/              # 랜딩·인증 폼
  styles/              # 디자인 토큰 + 라우트별 스타일
  model/               # 데이터 타입 (현재 샘플 데이터)
  constant/            # 라우트·폼 ID 상수
  utils/               # 유틸
prisma/schema.prisma   # DB 스키마
docs/                  # 문서 (위 표 참조)
```

**네이밍 규칙**: 그룹 폴더는 소문자(`app`, `common`, `home`),
컴포넌트 폴더는 PascalCase(`ChatMain`, `DashboardCard`).

## 브랜치

`develop` 이 본선이다. 작업은 여기서 분기한다 (`feat/...`, `fix/...`).
자세한 내용은 [docs/WORKFLOW.md](docs/WORKFLOW.md).
