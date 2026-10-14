# 진행 상황

> **세션 시작 시**: 이 파일을 먼저 읽는다. **세션 종료 시**: 이 파일을 갱신하고 커밋한다.
> 그래야 다른 노트북에서 `git pull` 만으로 이어서 작업할 수 있다.

- **기간**: 2026-10-13 시작, 10주 (목표 ~2026-12-22)
- **주당 가용 시간**: _(기입 필요)_ — 8단계 전부 깊게 가려면 주 15시간 이상 필요
- **6주차 점검 예정**: 속도 보고 스코프 조정 여부 결정
- **본선 브랜치**: `develop`

## 현재 상태 요약

**UI 레이어는 상당히 진행됐고, 데이터 레이어는 비어 있다.**

| 영역                                     | 상태                                        |
| ---------------------------------------- | ------------------------------------------- |
| 채팅 UI (날짜 그룹핑·말풍선·연속 발신)   | ✅                                          |
| 채팅방·팀 목록                           | ✅                                          |
| 대시보드 + Quill 에디터 (DOMPurify 적용) | ✅                                          |
| 디자인 토큰 (contract)                   | ✅ (단 `darkTheme` 빈 값)                   |
| 로그인·회원가입                          | 폼 UI 만                                    |
| **DB**                                   | ❌ Prisma 기본 예제. Team·Message 모델 없음 |
| **데이터**                               | ❌ 전부 컴포넌트에 하드코딩                 |
| **메시지 전송·파일 업로드**              | ❌ `console.log` 에서 끝남                  |
| **인증 로직**                            | ❌ 없음                                     |

## 완료

- [x] React Router v8 마이그레이션 ([ADR-0003](decisions/0003-develop-migration.md))
      — React 19 + Vite 8 동반, `remix-utils` 10 으로 해결
- [x] casing 버그 수정 (`components/App` → `app`) — Linux/CI 빌드 실패 원인이었다
- [x] `Editor` 의 무의미한 null 체크 수정
- [x] 빈 플레이스홀더 제거 (`signIn.tsx`, `api/auth/signIn.ts`)
- [x] 품질 도구 — ESLint 9 flat config(타입 인식), Prettier, Vitest, husky, CI
- [x] Node 22.22.0 + `.nvmrc` 고정
- [x] 문서 체계 (`docs/`)

## 다음 할 일

### A. 린트 정리 — ✅ 완료 (40건 → 0건)

`verify` 통과, CI 녹색. 상세는 PR #1 과 커밋 히스토리 참조.

정리 중 **발견했지만 고치지 않은 것**:

- [ ] **`IconButton` 의 `bgType` prop 이 동작하지 않는다** —
      `Button` 과 달리 `className` 에 `styles.highlight` 가 하드코딩되어
      `getBg()` 를 호출하지 않는다. 고치면 화면 색이 바뀌므로
      디자인 의도 확인 필요. 코드에 `FIXME` 로 표시됨
- [ ] `ChatMain` React key 경고 (fragment 에 `key` 없음)
- [ ] 서비스명이 아직 `New Remix App` (`app/routes/_index.tsx` 의 `meta`)

**복기 대상** (Claude 가 작성한 부분 — 원리를 확인하고 싶으면 요청):

- `ChatMain` 의 `useRef` → `useMemo` 전환, 그룹핑 로직 순수 함수 분리
- `app.teams.$id.dashboard.tsx` 의 effect 내 setState 제거 (prevId 비교 패턴)
- `groupMessagesByDate` 는 순수 함수라 **TDD 연습 소재로 적합**

### B. DB 스키마 설계 **(B급 — 선택지 받고 직접 결정)**

**실시간 5단계(갭 복구)의 전제 조건이다.** 메시지가 저장소에 없으면 "놓친 메시지 재전송"이 성립하지 않는다.

- [ ] Postgres 로컬 연결 확인 + `.env` 설정
- [ ] Prisma 스키마 설계 — `User`, `Team`, `TeamMember`, `ChatRoom`, `Message`, `File` - **`Message` 에 `seq`(시퀀스 번호)와 `clientMsgId`(멱등키)를 넣을지가 5·6단계를 좌우한다**
- [ ] 마이그레이션 실행 (`prisma migrate dev`)
- [ ] 하드코딩 샘플 데이터 → DB 이관
- [ ] `noUncheckedIndexedAccess` 켜기 (`ChatMain` 재작성과 함께)

### C. 실시간 8단계 (메인)

> 각 단계 **구현 전에** [용어집·개념 도식](notes/realtime-glossary.md)의 해당 절을 읽는다.

**이미 채팅 UI 가 있으므로 "UI 만들기"가 아니라 "있는 UI 에 WebSocket 연결하기"로 시작한다.**

| #   | 단계                          | 주차 | 상태 | 핵심 질문                               |
| --- | ----------------------------- | ---- | ---- | --------------------------------------- |
| 1   | raw WebSocket 핸드셰이크      | 2    | ⬜   | HTTP Upgrade 는 어떻게 동작하나         |
| 2   | 룸 브로드캐스트               | 2    | ⬜   | 연결을 어디에 보관하나                  |
| 3   | 하트비트·재연결·백오프+jitter | 3    | ⬜   | 죽은 연결을 어떻게 아나 / jitter 는 왜  |
| 4   | presence                      | 4    | ⬜   | 탭 강제 종료를 어떻게 탐지하나          |
| 5   | **갭 복구 (시퀀스·커서)**     | 5-6  | ⬜   | 재연결 중 놓친 메시지를 어떻게 복구하나 |
| 6   | optimistic UI + 멱등키        | 7    | ⬜   | 낙관적 메시지와 서버 echo 중복을 어떻게 |
| 7   | **Redis pub/sub 수평 확장**   | 8    | ⬜   | 서버 2대면 왜 깨지나                    |
| 8   | 보안 마감                     | 10   | ⬜   | CSWSH 가 무엇이고 왜 CORS 로 안 막히나  |

9주차: 파일 공유(업로드·진행률·실시간 알림) + 업로드 보안
→ **파일 업로드 UI 는 이미 있다. 저장 로직과 진행률부터 시작한다.**

## 기술 결정 대기 중

- [ ] WebSocket 서버 배치 — 별도 Node 프로세스 vs 커스텀 서버 통합 (2주차)
      ⚠️ React Router 의 loader/action 은 HTTP 요청-응답이라 WS 를 품지 못한다
- [ ] 메시지 스키마에 `seq` / `clientMsgId` 설계 (B 단계)
- [ ] Redis 클라이언트 — `ioredis` vs `node-redis` (8주차)
- [ ] 파일 저장소 — 로컬 vs S3 호환(MinIO) (9주차)
- [ ] 인증 방식 — 직접 구현(학습) vs Lucia/Auth.js (10주차)
- [ ] `darkTheme` 값 채우기

## LLM 도입 (추후, 선택)

실시간이 끝난 뒤 여력이 있으면. [notes/llm-ideas.md](notes/llm-ideas.md).
1순위 후보는 **대화 요약** — 스트리밍이 기존 WebSocket 인프라와 직접 연결된다.

## 세션 로그

| 날짜       | 한 일                                                                                                      | 다음                                |
| ---------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| 2026-10-13 | `main` 위에서 RR v8 마이그레이션 + 문서·도구 체계 구축. **세션 후반에 실제 앱이 `develop` 에 있음을 발견** | develop 재분석                      |
| 2026-10-14 | `develop` 전체 분석. RR v8 마이그레이션 재적용(ADR-0003). casing 버그·null 체크 버그 수정. 도구 설정 병합  | **린트 40건 정리** → DB 스키마 설계 |
