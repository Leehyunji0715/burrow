// ESLint flat config (ESLint 9+)
//
// 이전 .eslintrc.cjs 와의 차이는 docs/notes/eslint-flat-config.md 참조.
// 핵심: 중첩 overrides 대신 "설정 객체의 배열"이며, 각 객체가 files 로 적용 범위를 정한다.
// 배열은 위에서 아래로 병합되므로 뒤에 오는 것이 앞을 덮는다.
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // ── 1. 검사 대상에서 제외 ───────────────────────────────────────────
  // flat config 에서는 .eslintignore 가 아니라 여기에 적는다.
  {
    ignores: [
      'build/**',
      'node_modules/**',
      '.react-router/**', // 생성된 라우트 타입
      'generated/**', // Prisma 생성 클라이언트
    ],
  },

  // ── 2. 모든 파일 공통: JS 권장 규칙 ─────────────────────────────────
  js.configs.recommended,

  // ── 3. TypeScript — 타입 인식(type-aware) 린팅 ──────────────────────
  // recommendedTypeChecked 는 타입 정보를 사용하는 규칙까지 켠다.
  // 이전 설정은 타입 없는 recommended 만 썼기 때문에
  // no-floating-promises 같은 규칙이 동작하지 않았다.
  ...tseslint.configs.recommendedTypeChecked.map((c) => ({
    ...c,
    files: ['**/*.{ts,tsx}'],
  })),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        // 타입 인식 린팅의 핵심. 프로젝트의 tsconfig 를 읽어 타입을 가져온다.
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // ── 비동기 관련 (실시간 코드의 핵심) ──────────────────────────
      // Promise 를 await 없이 버리는 실수를 잡는다.
      // 빠뜨린 Promise 는 조용히 유실된다 — 에러도 안 뜨고 실패도 모른다.
      '@typescript-eslint/no-floating-promises': 'error',

      // Promise 를 boolean 자리에 쓰는 실수. if (asyncFn()) 는 항상 truthy 다.
      // 이벤트 핸들러에 async 함수를 넘기는 경우도 잡는다.
      '@typescript-eslint/no-misused-promises': 'error',

      // Promise 아닌 것에 await 를 붙인 경우 (오해를 드러낸다)
      '@typescript-eslint/await-thenable': 'error',

      // reject 에는 Error 를 넘긴다 (스택 트레이스 보존)
      '@typescript-eslint/prefer-promise-reject-errors': 'error',

      // ── 일반 ──────────────────────────────────────────────────────
      // 쓰지 않는 변수. _ 로 시작하면 의도적인 것으로 보고 넘어간다.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // ── 4. React ────────────────────────────────────────────────────────
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: { react, 'react-hooks': reactHooks, 'jsx-a11y': jsxA11y },
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: {
      react: { version: 'detect' },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules, // import React 불필요
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  },

  // ── 5. Node 환경 설정 파일 ──────────────────────────────────────────
  {
    files: ['*.config.{js,ts}', 'vitest.config.ts', 'react-router.config.ts'],
    languageOptions: { globals: { ...globals.node } },
  },

  // ── 6. 테스트 파일 ──────────────────────────────────────────────────
  {
    files: ['**/*.test.{ts,tsx}'],
    languageOptions: { globals: { ...globals.node } },
    rules: {
      // 테스트에서는 any 사용이 불가피한 경우가 있다
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // ── 7. Prettier (반드시 마지막) ─────────────────────────────────────
  // 포매팅 관련 규칙을 전부 끈다. 포매팅은 Prettier 단독 책임.
  // 마지막에 와야 앞의 설정을 덮을 수 있다.
  prettier,
);
