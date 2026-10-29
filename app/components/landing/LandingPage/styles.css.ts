import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/tokens.css';
import { displayFace } from '~/styles/typography.css';

const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  paddingLeft: vars.space8,
  paddingRight: vars.space8,
} as const;

export const page = style({
  minHeight: '100vh',
  background: vars.bgBright,
});

export const hero = style({
  position: 'relative',
  overflow: 'hidden',
  background: `linear-gradient(90deg, ${vars.tintStart} 0%, ${vars.tintEnd} 100%)`,
  paddingBottom: '120px',
  // 히어로 아래쪽을 물결 모양으로 자른다 (시안의 wave)
  clipPath: 'ellipse(140% 100% at 50% 0%)',
});

export const header = style({
  ...container,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space4,
  paddingTop: vars.space6,
  paddingBottom: vars.space6,
});

export const nav = style({ display: 'flex', alignItems: 'center', gap: vars.space2 });

export const loginLink = style({
  padding: '10px 16px',
  borderRadius: vars.radiusFull,
  background: vars.bgRaised,
  fontSize: '15px',
  fontWeight: 600,
});

export const heroBody = style({
  ...container,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space14,
  paddingTop: vars.space14,
});

export const heroCopy = style({
  flex: '1 1 440px',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: vars.space6,
});

export const badge = style({
  padding: '6px 14px',
  borderRadius: vars.radiusFull,
  background: vars.bgRaised,
  color: vars.brandStrong,
  fontSize: '14px',
  fontWeight: 700,
});

export const heroTitle = style({
  // 줄 길이를 고르게 맞춰 마지막 줄에 한두 글자만 남지 않게 한다
  textWrap: 'balance',
  ...displayFace,
  fontSize: 'clamp(40px, 5vw, 56px)',
  lineHeight: 1.2,
});

export const heroSub = style({ fontSize: '20px', fontWeight: 500 });

export const preview = style({
  flex: '1 1 420px',
  minWidth: 0,
  height: '340px',
  display: 'flex',
  overflow: 'hidden',
  border: '8px solid transparent',
  borderRadius: '28px',
  background: `linear-gradient(${vars.bgRaised}, ${vars.bgRaised}) padding-box, linear-gradient(135deg, ${vars.gradientStart} 0%, ${vars.gradientEnd} 100%) border-box`,
  boxShadow: '0 24px 48px rgba(110, 90, 200, 0.18)',
});

export const previewRail = style({
  width: '56px',
  background: vars.brand,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '18px',
  paddingTop: vars.space4,
});

export const previewTile = style({
  width: '22px',
  height: '4px',
  borderRadius: '2px',
  background: 'rgba(255, 255, 255, 0.5)',
});

export const previewTileActive = style({ background: vars.accent });

export const previewBody = style({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space3,
  padding: vars.space5,
  background: vars.bgBright,
  fontSize: '13px',
});

export const previewTitle = style({ fontSize: '14px', fontWeight: 700 });

export const previewRow = style({ display: 'flex', alignItems: 'flex-end', gap: '10px' });

export const previewAvatar = style({
  flex: 'none',
  width: '32px',
  height: '32px',
  borderRadius: vars.radiusFull,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.onProject,
  fontSize: '12px',
  fontWeight: 700,
});

export const previewTone1 = style({ background: vars.avatar1 });
export const previewTone2 = style({ background: vars.avatar2 });

export const previewBubble = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space2,
  padding: '10px 14px',
  border: `1px solid ${vars.line}`,
  borderRadius: '14px 14px 14px 4px',
  background: vars.bgRaised,
});

export const previewFileIcon = style({ color: vars.brand, fontSize: '16px' });

export const previewMine = style({
  alignSelf: 'flex-end',
  padding: '10px 14px',
  borderRadius: '14px 14px 4px 14px',
  background: vars.brand,
  color: vars.onBrand,
});

export const previewComposer = style({
  marginTop: 'auto',
  padding: '12px 14px',
  border: `1px solid ${vars.line}`,
  borderRadius: vars.radiusLg,
  background: vars.bgRaised,
  color: vars.inkSubtle,
});

export const section = style({
  ...container,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space10,
  paddingTop: vars.space18,
  paddingBottom: vars.space18,
});

export const sectionHead = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.space3,
  textAlign: 'center',
});

export const eyebrow = style({
  color: vars.brandText,
  fontSize: '14px',
  fontWeight: 700,
  letterSpacing: '0.08em',
});

export const sectionTitle = style({
  textWrap: 'balance',
  ...displayFace,
  fontSize: 'clamp(26px, 3vw, 36px)',
  textAlign: 'center',
});

export const featureGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: vars.space6,
});

export const featureCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space4,
  padding: vars.space8,
  border: `1px solid ${vars.line}`,
  borderRadius: vars.radius2xl,
  background: vars.bgRaised,
});

export const featureIcon = style({
  width: '52px',
  height: '52px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '14px',
  background: vars.brandSelected,
  color: vars.brand,
  fontSize: '26px',
});

export const featureTitle = style({ fontSize: '22px', fontWeight: 700 });

export const points = style({ display: 'flex', flexDirection: 'column', gap: '10px' });

export const point = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '15px',
  fontWeight: 500,
});

export const check = style({ flex: 'none', color: vars.presenceAway, fontSize: '18px' });

export const steps = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: vars.space8,
  padding: vars.space10,
  border: `1px solid ${vars.line}`,
  borderRadius: '24px',
  background: vars.bgRaised,
});

export const step = style({ display: 'flex', alignItems: 'flex-start', gap: vars.space4 });

export const stepNo = style({
  flex: 'none',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: vars.radiusFull,
  background: vars.brand,
  color: vars.onBrand,
  fontWeight: 800,
});

export const stepTitle = style({ fontSize: '18px', fontWeight: 700 });

export const stepDesc = style({ fontSize: '14px', color: vars.inkMuted });

export const cta = style({
  ...container,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.space5,
  paddingBottom: vars.space18,
});

export const footer = style({
  ...container,
  display: 'flex',
  justifyContent: 'space-between',
  gap: vars.space3,
  paddingTop: vars.space8,
  paddingBottom: vars.space8,
  borderTop: `1px solid ${vars.line}`,
  fontSize: '13px',
  color: vars.inkSubtle,
});

export const footerLink = style({ textDecoration: 'underline' });
