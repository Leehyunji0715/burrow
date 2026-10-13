# Figma → 코드 워크플로우

가지고 있는 Figma 디자인을 vanilla-extract 토큰으로 옮기는 방법.

## 원칙: "픽셀을 베끼지 말고 규칙을 추출한다"

초보와 시니어의 차이가 여기서 갈린다.

- ❌ Figma에서 `#4F46E5`를 보고 코드에 `#4F46E5`를 적는다
- ✅ Figma에서 `#4F46E5`가 **무슨 역할**인지 보고 `color.accent.default` 토큰으로 적는다

두 번째가 되면 다크모드·테마 변경·디자인 수정이 **토큰 한 줄 수정**으로 끝난다.
첫 번째는 전체 코드를 다시 훑어야 한다.

## 1단계: Figma에서 토큰 추출

Figma 파일에서 다음을 뽑아 표로 정리한다. (수작업이지만 **한 번만** 하면 된다)

| 분류   | Figma에서 볼 곳          | 추출할 것                                       |
| ------ | ------------------------ | ----------------------------------------------- |
| 색     | Local styles / Variables | 역할별 색: 배경·표면·테두리·본문·보조·강조·위험 |
| 타이포 | Text styles              | 크기 단계, 줄높이, 굵기                         |
| 간격   | 반복되는 padding/gap 값  | 4 또는 8의 배수 스케일                          |
| 라운드 | 컴포넌트 corner radius   | sm/md/lg/full                                   |
| 그림자 | Effect styles            | elevation 단계                                  |

**팁**: Figma에서 "Variables"(구 Design Tokens) 기능을 썼다면 이미 토큰화된 것이다.
안 썼다면 지금 정리하면서 **디자인의 일관성 문제도 발견**하게 된다
(같은 회색이 5가지 버전으로 쓰이고 있는 등 — 흔하다).

## 2단계: 2계층 토큰 구조

**중요한 설계 결정.** 토큰을 두 층으로 나눈다:

```
원시 토큰 (primitive)        의미 토큰 (semantic)
blue.500  = #4F46E5     →   color.accent.default
gray.900  = #111827     →   color.text.primary
gray.50   = #F9FAFB     →   color.surface.raised
```

- **원시**: 색 팔레트 그 자체. 이름에 의미가 없다
- **의미**: 쓰임새. 컴포넌트는 **의미 토큰만** 참조한다

왜 나누나: 다크모드가 **의미 토큰의 재배선**으로 끝난다.
`color.text.primary`가 라이트에선 `gray.900`, 다크에선 `gray.50`을 가리키게만 바꾸면
컴포넌트 코드는 **한 줄도 안 바뀐다.**

이것이 디자인 시스템의 핵심 아이디어고, 면접에서 설명할 수 있어야 하는 내용이다.

## 3단계: vanilla-extract로 구현

`app/styles/`의 빈 파일 3개가 각각 한 층을 담당한다:

```
variables.css.ts  → 원시 토큰 + 테마 계약(contract)
themes.css.ts     → 라이트/다크 테마 구현
global.css.ts     → 리셋 + 전역 스타일
```

사용할 vanilla-extract API:

| API                   | 용도                                                              |
| --------------------- | ----------------------------------------------------------------- |
| `createGlobalTheme`   | 전역 CSS 변수로 토큰 정의                                         |
| `createThemeContract` | 테마가 반드시 채워야 할 **토큰 형태**를 선언 (타입 안전성의 핵심) |
| `createTheme`         | 계약을 구현하는 테마 (라이트/다크)                                |
| `globalStyle`         | 리셋 등 전역 선택자                                               |

`createThemeContract`를 쓰면 **다크 테마에서 토큰 하나를 빠뜨리면 컴파일 에러**가 난다.
이게 vanilla-extract를 고른 이유다.

## 4단계: 컴포넌트 작성

```ts
// 컴포넌트는 의미 토큰만 참조한다. 원시 토큰이나 생색을 직접 쓰지 않는다.
import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/variables.css';

export const root = style({
  background: vars.color.surface.raised, // ✅
  color: vars.color.text.primary, // ✅
  // background: "#F9FAFB",                // ❌ 하드코딩
  // background: vars.color.gray[50],      // ❌ 원시 토큰 직접 참조
});
```

이 규칙을 ESLint로 강제할 수도 있다(10주차에 고려).

## Figma MCP 연동 (선택)

Figma는 MCP 서버를 제공해, Claude가 Figma 파일을 **직접 읽을** 수 있다.
연동하면 "이 프레임의 토큰을 뽑아줘" 같은 요청이 가능하다.

- Figma 데스크톱 앱 → Preferences → Enable local MCP server
- Claude Code에서 MCP 서버 등록

**다만 권장하는 방식**: 1~2단계(토큰 추출·구조 설계)는 **직접 하는 게 학습에 좋다.**
MCP는 반복적인 값 전사(수십 개 색상값 옮기기)에만 쓰는 것이 낫다.
디자인을 읽고 규칙을 뽑아내는 것 자체가 배워야 할 기술이기 때문이다.

필요해지면 설정을 도와줄 수 있다.

## 하지 말아야 할 것

- **Figma "Copy as code" 그대로 붙이기** — 절대 위치(`position: absolute`)와
  하드코딩 값이 쏟아진다. 반응형이 불가능해지고 유지보수가 지옥이 된다
- **디자인을 1px 단위로 똑같이 만들려 애쓰기** — 토큰 스케일에 맞춰 **정리하는 것**이 맞다.
  Figma에서 간격이 13px이면 12px 또는 16px로 맞춘다. 디자인의 실수를 코드가 물려받지 않는다
