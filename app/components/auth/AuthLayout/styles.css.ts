import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/tokens.css';
import { displayFace } from '~/styles/typography.css';

export const page = style({
  minHeight: '100vh',
  display: 'flex',
  flexWrap: 'wrap',
  background: vars.bgBright,
});

export const brandPanel = style({
  position: 'relative',
  isolation: 'isolate',
  overflow: 'hidden',
  flex: '1 1 480px',
  minHeight: '360px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: vars.space10,
  padding: `48px ${vars.space14}`,
  background: `linear-gradient(90deg, ${vars.tintStart} 0%, ${vars.tintEnd} 100%)`,
});

const orb = {
  position: 'absolute',
  zIndex: -1,
  borderRadius: vars.radiusFull,
} as const;

// 브랜드 그라데이션은 장식에만 쓰고 그 위에 글자를 올리지 않는다 (디자인 시스템 규칙)
export const orbLarge = style({
  ...orb,
  right: '-140px',
  bottom: '-160px',
  width: '460px',
  height: '460px',
  background: `linear-gradient(135deg, ${vars.gradientStart} 0%, ${vars.gradientEnd} 100%)`,
});

export const orbSmall = style({
  ...orb,
  right: '72px',
  top: '96px',
  width: '96px',
  height: '96px',
  background: `linear-gradient(135deg, ${vars.gradientEnd} 0%, ${vars.gradientStart} 100%)`,
});

export const brandBody = style({
  maxWidth: '440px',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space6,
});

export const motto = style({
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.28em',
});

export const formArea = style({
  flex: '1 1 480px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `48px ${vars.space6}`,
});

export const brandTitle = style({
  ...displayFace,
  fontSize: '40px',
  lineHeight: 1.3,
});

export const brandText = style({ fontSize: '17px', lineHeight: 1.7 });

export const brandSteps = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  fontSize: '16px',
});

export const brandStep = style({ display: 'flex', alignItems: 'center', gap: vars.space3 });

export const brandStepNo = style({
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: vars.radiusFull,
  background: vars.bgRaised,
  color: vars.brandStrong,
  fontSize: '13px',
  fontWeight: 700,
});

// ── 폼 공통 ────────────────────────────────────────────────
export const form = style({
  width: '100%',
  maxWidth: '420px',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space5,
});

export const formHead = style({ display: 'flex', flexDirection: 'column', gap: vars.space2 });

export const formTitle = style({ ...displayFace, fontSize: '32px' });

export const formSub = style({ fontSize: '15px', color: vars.inkMuted });

export const inlineLink = style({ color: vars.brandText, fontWeight: 700 });

export const optionsRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const rules = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px 14px',
  fontSize: '13px',
});

export const rule = style({ color: vars.inkSubtle });
export const ruleOk = style({ color: vars.successText });
