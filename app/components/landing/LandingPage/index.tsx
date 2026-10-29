import type { ReactNode } from 'react';
import {
  LuArrowRight,
  LuCheck,
  LuFileText,
  LuFolder,
  LuMessageCircle,
  LuUsers,
} from 'react-icons/lu';
import { Link } from 'react-router';

import { Button } from '~/components/ui/Button';
import { Logo } from '~/components/ui/Logo';

import { paths } from '~/constant/routes';

import * as styles from './styles.css';

type Feature = { icon: ReactNode; title: string; points: string[] };

const features: Feature[] = [
  {
    icon: <LuFolder />,
    title: '프로젝트에 묶인 대화',
    points: ['채널은 프로젝트 안에서만', '파일과 공지도 프로젝트별로', '끝난 프로젝트는 보관'],
  },
  {
    icon: <LuMessageCircle />,
    title: '실시간 채팅',
    points: ['채널 그룹 채팅', '1:1 개인챗', '연결이 끊겨도 놓친 메시지까지 그대로'],
  },
  {
    icon: <LuUsers />,
    title: '지금 누가 있는지',
    points: ['온라인 · 부재중 · 오프라인 표시', '공지 확인', '최근 활동순 프로젝트 정렬'],
  },
];

const steps = [
  { title: '프로젝트 만들기', desc: '프로젝트를 만들고 함께할 멤버를 초대해요.' },
  { title: '채널에서 대화하기', desc: '주제별로 채널을 열어 프로젝트 안에서 이야기해요.' },
  { title: '끝나면 보관하기', desc: '보관해도 대화와 파일은 그대로 남아요.' },
];

export function LandingPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <header className={styles.header}>
          <Link to={paths.home} aria-label='Burrow 홈'>
            <Logo withWordmark />
          </Link>
          <nav aria-label='주요 메뉴' className={styles.nav}>
            <Link to={paths.login} className={styles.loginLink}>
              로그인
            </Link>
          </nav>
        </header>

        <div className={styles.heroBody}>
          <div className={styles.heroCopy}>
            <p className={styles.badge}>프로젝트 단위 협업 툴</p>
            <h1 className={styles.heroTitle}>
              프로젝트마다,
              <br />굴 하나씩.
            </h1>
            <p className={styles.heroSub}>채팅 · 파일 · 공지, 프로젝트 하나에</p>
            <div>
              <Button asChild size='lg' pill>
                <Link to={paths.signup}>
                  시작하기 <LuArrowRight aria-hidden='true' />
                </Link>
              </Button>
            </div>
          </div>
          <ProductPreview />
        </div>
      </section>

      <section id='features' className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>FEATURES</p>
          <h2 className={styles.sectionTitle}>맥락을 지키는 세 가지</h2>
        </div>
        <ul className={styles.featureGrid}>
          {features.map((f) => (
            <li key={f.title} className={styles.featureCard}>
              <span className={styles.featureIcon} aria-hidden='true'>
                {f.icon}
              </span>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <ul className={styles.points}>
                {f.points.map((p) => (
                  <li key={p} className={styles.point}>
                    <LuCheck className={styles.check} aria-hidden='true' />
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <ol className={styles.steps}>
          {steps.map((s, i) => (
            <li key={s.title} className={styles.step}>
              <span className={styles.stepNo} aria-hidden='true'>
                {i + 1}
              </span>
              <div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.cta}>
        <h2 className={styles.sectionTitle}>첫 프로젝트를 지금 만들어 보세요</h2>
        <Button asChild variant='brand' size='lg' pill>
          <Link to={paths.signup}>시작하기</Link>
        </Button>
      </section>

      <footer className={styles.footer}>
        <span>© Burrow</span>
        <a href='https://github.com/Leehyunji0715/burrow' className={styles.footerLink}>
          GitHub
        </a>
      </footer>
    </div>
  );
}

/** 히어로 오른쪽의 앱 미리보기. 장식이라 스크린 리더에서는 숨긴다 */
function ProductPreview() {
  return (
    <div className={styles.preview} aria-hidden='true'>
      <div className={styles.previewRail}>
        <Logo size={24} />
        <span className={styles.previewTile} />
        <span className={[styles.previewTile, styles.previewTileActive].join(' ')} />
        <span className={styles.previewTile} />
      </div>
      <div className={styles.previewBody}>
        <div className={styles.previewTitle}># 프론트엔드</div>
        <div className={styles.previewRow}>
          <span className={[styles.previewAvatar, styles.previewTone1].join(' ')}>서준</span>
          <span className={styles.previewBubble}>로그인 페이지 PR 올렸어요!</span>
        </div>
        <div className={styles.previewRow}>
          <span className={[styles.previewAvatar, styles.previewTone2].join(' ')}>유나</span>
          <span className={styles.previewBubble}>
            <LuFileText className={styles.previewFileIcon} />
            디자인_v2.fig
          </span>
        </div>
        <div className={styles.previewMine}>확인했어요, 리뷰 남길게요</div>
        <div className={styles.previewComposer}>메시지 보내기…</div>
      </div>
    </div>
  );
}
