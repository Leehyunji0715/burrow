# ADR-0002: 린트 규칙 세트 — "권장" 수준 채택

- **날짜**: 2026-10-13
- **상태**: 적용 완료
- **등급**: B (트레이드오프가 있어 개발자가 선택)

## 배경

[ADR-0001](0001-remix-v2-to-react-router-v8.md) 이후 ESLint 9 + flat config 로 이전하면서
**타입 인식 린팅**이 가능해졌다 ([이전 기록](../notes/eslint-flat-config.md)).

어떤 규칙까지 켤지는 **비용과 이득의 트레이드오프**가 있어 선택이 필요했다.
규칙을 많이 켜면 버그를 더 잡지만 코드가 장황해지고 거짓 양성이 늘어난다.

## 선택지

|                                | ① 보수적 | **② 권장 (채택)** | ③ 엄격 |
| ------------------------------ | -------- | ----------------- | ------ |
| `no-floating-promises`         | ✅       | ✅                | ✅     |
| `no-misused-promises`          | —        | ✅                | ✅     |
| `await-thenable`               | —        | ✅                | ✅     |
| `prefer-promise-reject-errors` | —        | ✅                | ✅     |
| `no-unnecessary-condition`     | —        | ✅                | ✅     |
| `noUncheckedIndexedAccess`     | —        | ✅                | ✅     |
| `noImplicitOverride`           | —        | ✅                | ✅     |
| `strict-boolean-expressions`   | —        | —                 | ✅     |
| `exactOptionalPropertyTypes`   | —        | —                 | ✅     |

## 결정

**② 권장 수준을 채택한다.**

### 왜 ② 인가

**1) 비동기 규칙이 이 프로젝트의 핵심 위험을 덮는다**

실시간 코드는 비동기가 지배적이고, 비동기 실수는 **조용히 실패한다**:

```ts
// ❌ 이 실수는 에러도 안 뜨고 실패도 알 수 없다
socket.send(message); // Promise 를 버렸다
saveToDatabase(msg); // 저장 실패를 아무도 모른다

// ✅
await socket.send(message);
void saveToDatabase(msg); // 의도적으로 기다리지 않을 때는 void 로 명시
```

`no-misused-promises` 는 특히 React 에서 자주 나는 실수를 잡는다:

```ts
// ❌ onClick 에 async 함수 — 에러가 처리되지 않는다
<button onClick={async () => { await send(); }} />

// ❌ 항상 truthy — 조건이 의미 없다
if (checkConnection()) { ... }   // checkConnection 이 async 라면
```

**2) `noUncheckedIndexedAccess` 가 5단계(갭 복구)의 버그를 선제적으로 막는다**

배열 인덱싱 결과를 `T | undefined` 로 만든다:

```ts
const messages: Message[] = [...];
const last = messages[messages.length - 1];
// ① 타입: Message             → last.text 바로 접근 (런타임 크래시 가능)
// ② 타입: Message | undefined → 체크를 강제
```

갭 복구 구현에서 `messages[seq]`, `buffer[i]` 같은 접근이 쏟아질 예정이다.
거기서 `undefined` 를 놓치면 전형적인 버그가 되고, **수동 테스트로는 재현이 어렵다**
(특정 타이밍에만 발생). 타입이 막아주는 편이 훨씬 싸다.

**3) 지금 켜는 비용이 0 이었다**

적용 결과 **타입 에러 0건, 린트 에러 0건**.
라우트 1개·컴포넌트 1개 상태라 고칠 것이 없었다.

→ 코드가 쌓인 뒤에 켜면 수십~수백 건을 한꺼번에 치워야 한다.
**지금이 가장 싼 시점이었고, 실제로 공짜였다.**

### 왜 ③ 이 아닌가

`strict-boolean-expressions` 는 `if (str)` 을 금지하고 명시적 비교를 강제한다:

```ts
// ③ 에서는 이렇게 써야 한다
if (str !== "") { ... }        // if (str) 불가
if (arr.length > 0) { ... }    // if (arr.length) 불가
```

버그를 잡아주기는 하지만:

- 코드가 장황해지고 **호불호가 크다** (실무에서도 안 켜는 팀이 많다)
- 거짓 양성이 늘어 `eslint-disable` 주석이 늘어나는 역효과가 흔하다
- 규칙에 대한 피로가 생기면 **다른 중요한 경고까지 무시하게 된다**

`exactOptionalPropertyTypes` 는 `{ a?: string }` 에 `undefined` 를 명시 대입하는 것을 막는데,
서드파티 타입과 자주 충돌해 실익 대비 비용이 크다.

**필요해지면 나중에 켤 수 있다.** 반대로 ② 를 지금 안 켜면 비용이 계속 올라간다.

## 검증 — 규칙이 실제로 동작하는가

"에러 0건 통과"만으로는 **규칙이 켜졌는지 알 수 없다** (꺼져 있어도 0건이다).
그래서 의도적으로 위반 코드를 작성해 확인했다 (`app/_ruletest/probe.ts`, 확인 후 삭제).

결과 — **5개 전부 발화**:

| 규칙                       | 테스트한 코드                       | 잡혔나           |
| -------------------------- | ----------------------------------- | ---------------- |
| `no-floating-promises`     | `save();` (await 누락)              | ✅               |
| `no-misused-promises`      | `if (save())`                       | ✅               |
| `no-unnecessary-condition` | `if (save())`, `s != null` (string) | ✅ (2건)         |
| `await-thenable`           | `await getText()` (non-Promise)     | ✅               |
| `noUncheckedIndexedAccess` | `arr[0].toUpperCase()`              | ✅ (tsc: TS2532) |

마지막 항목은 ESLint 가 아니라 **tsc** 가 잡는다 (tsconfig 옵션이므로).
`Object is possibly 'undefined'` 가 정확히 의도한 동작이다.

## 적용 내용

**`tsconfig.json`**

```jsonc
"noUncheckedIndexedAccess": true,  // 배열 인덱싱 → T | undefined
"noImplicitOverride": true,         // override 키워드 강제
```

**`eslint.config.js`** — TypeScript 블록에 5개 규칙 추가 (비동기 4 + 무의미 조건 1).
각 규칙에 **왜 켰는지** 주석을 달아두었다.

## 앞으로

- 2주차부터 비동기 코드가 늘어나면 `no-floating-promises` 가 실제로 일하기 시작한다.
  **경고가 뜨면 `void` 로 덮기 전에 "정말 기다리지 않아도 되는가"를 먼저 묻는다.**
- `void` 를 쓸 때는 의도를 주석으로 남긴다 (예: fire-and-forget 로깅)
- ③ 수준은 6주차 점검에서 재검토. 그때 코드 규모를 보고 판단한다

## 용어

| 용어                   | 뜻                                                         |
| ---------------------- | ---------------------------------------------------------- |
| **type-aware linting** | 타입 정보를 사용하는 린팅. tsconfig 를 읽어야 한다         |
| **floating promise**   | await/catch 없이 버려진 Promise                            |
| **fire-and-forget**    | 의도적으로 결과를 기다리지 않는 호출                       |
| **false positive**     | 문제가 없는데 경고가 뜨는 것                               |
| **rule fatigue**       | 경고가 너무 많아 무시하게 되는 현상                        |
| **escape hatch**       | 규칙을 의도적으로 우회하는 수단 (`eslint-disable`, `void`) |
