// 목업 데이터. 서버가 생기면 이 파일 대신 API 응답을 쓴다 — 화면 컴포넌트는 props 만 받으므로 바꿀 필요가 없다.
import type {
  Channel,
  DirectChat,
  Message,
  Post,
  Project,
  ProjectFile,
  ProjectMember,
  User,
} from '~/model';

export const me: User = {
  id: 'u-haneul',
  name: '김하늘',
  initials: '하늘',
  tone: 3,
  presence: 'online',
};

const seojun: User = {
  id: 'u-seojun',
  name: '박서준',
  initials: '서준',
  tone: 1,
  presence: 'online',
};
const yuna: User = { id: 'u-yuna', name: '최유나', initials: '유나', tone: 2, presence: 'online' };
const minho: User = {
  id: 'u-minho',
  name: '정민호',
  initials: '민호',
  tone: 5,
  presence: 'away',
  statusNote: '오후 3시 복귀',
};
const jiwoo: User = {
  id: 'u-jiwoo',
  name: '한지우',
  initials: '지우',
  tone: 4,
  presence: 'offline',
};

export const users: User[] = [me, seojun, yuna, minho, jiwoo];

export const projects: Project[] = [
  { id: 'p-login', name: '로그인 · 회원가입 개편', color: 'lilac', initial: '로', archived: false },
  { id: 'p-mobile', name: '모바일 앱 출시', color: 'mint', initial: '모', archived: false },
  { id: 'p-brand', name: '브랜드 리뉴얼', color: 'pink', initial: '브', archived: false },
];

export const members: Record<string, ProjectMember[]> = {
  'p-login': [
    { ...me, role: 'member' },
    { ...seojun, role: 'owner' },
    { ...yuna, role: 'member' },
    { ...minho, role: 'member' },
  ],
  'p-mobile': [
    { ...me, role: 'owner' },
    { ...jiwoo, role: 'member' },
    { ...seojun, role: 'member' },
  ],
  'p-brand': [
    { ...yuna, role: 'owner' },
    { ...me, role: 'member' },
  ],
};

export const channels: Channel[] = [
  { id: 'c-general', projectId: 'p-login', name: '일반', unread: 0 },
  { id: 'c-frontend', projectId: 'p-login', name: '프론트엔드', unread: 0 },
  { id: 'c-design', projectId: 'p-login', name: '디자인', unread: 4 },
  { id: 'c-qa', projectId: 'p-login', name: 'QA', unread: 0 },
  { id: 'c-m-general', projectId: 'p-mobile', name: '일반', unread: 2 },
  { id: 'c-m-release', projectId: 'p-mobile', name: '출시-체크리스트', unread: 0 },
  { id: 'c-b-general', projectId: 'p-brand', name: '일반', unread: 0 },
];

/** 이 메시지부터 안 읽음 (대화방별 마지막으로 읽은 seq 의 다음) */
export const firstUnreadSeq: Record<string, number> = { 'c-frontend': 3 };

export const messages: Record<string, Message[]> = {
  'c-frontend': [
    {
      id: 'm1',
      seq: 1,
      authorId: 'u-seojun',
      text: '로그인 페이지 PR 올렸어요! 비밀번호 검증 쪽 위주로 리뷰 부탁드려요.',
      createdAt: '2026-10-21T17:40:00+09:00',
    },
    {
      id: 'm2',
      seq: 2,
      authorId: 'u-haneul',
      text: '내일 오전에 볼게요.',
      createdAt: '2026-10-21T17:52:00+09:00',
    },
    {
      id: 'm3',
      seq: 3,
      authorId: 'u-yuna',
      text: '로그인 화면 최종 시안 공유드려요. 피드백은 여기 남겨 주세요.',
      attachment: { kind: 'image', name: '로그인_시안.png', size: '1.2MB' },
      createdAt: '2026-10-22T10:15:00+09:00',
    },
    {
      id: 'm4',
      seq: 4,
      authorId: 'u-yuna',
      text: '',
      attachment: { kind: 'file', name: '디자인_가이드_v2.pdf', size: 'PDF · 2.4MB' },
      createdAt: '2026-10-22T10:16:00+09:00',
    },
    {
      id: 'm5',
      seq: 5,
      authorId: 'u-seojun',
      text: '가이드 v2 기준으로 입력창 테두리 색 맞춰 둘게요.',
      createdAt: '2026-10-22T10:18:00+09:00',
    },
    {
      id: 'm6',
      seq: 6,
      authorId: 'u-haneul',
      text: '확인했어요. 오후에 리뷰 남길게요.',
      createdAt: '2026-10-22T10:20:00+09:00',
    },
  ],
};

export const directChats: DirectChat[] = [
  { id: 'd-seojun', partner: seojun, unread: 1, lastMessage: '리뷰 코멘트 남겼어요' },
  { id: 'd-yuna', partner: yuna, unread: 0, lastMessage: '시안 확인 부탁드려요!' },
  { id: 'd-minho', partner: minho, unread: 0, lastMessage: 'QA 일정 공유드려요' },
];

export const directMessages: Record<string, Message[]> = {
  'd-seojun': [
    {
      id: 'dm1',
      seq: 1,
      authorId: 'u-haneul',
      text: '서준님, 로그인 PR 리뷰 끝났어요.',
      createdAt: '2026-10-22T14:02:00+09:00',
    },
    {
      id: 'dm2',
      seq: 2,
      authorId: 'u-seojun',
      text: '리뷰 코멘트 남겼어요',
      createdAt: '2026-10-22T14:10:00+09:00',
    },
  ],
};

export const posts: Record<string, Post[]> = {
  'p-login': [
    {
      id: 'post1',
      authorId: 'u-seojun',
      title: '이번 스프린트 코드 커밋 마감 안내',
      bodyHtml:
        '<p>금요일 오후 6시까지 각자 브랜치에 커밋 부탁드려요. 이후에는 리뷰 일정이 다음 주로 밀려요.</p>',
      isNotice: true,
      ackCount: 3,
      ackedByMe: false,
      createdAt: '2026-10-22T09:00:00+09:00',
      edited: false,
    },
    {
      id: 'post2',
      authorId: 'u-yuna',
      title: '디자인 가이드 v2 공유',
      bodyHtml:
        '<p>버튼, 입력창, 색상 토큰을 정리했어요. <strong>파일</strong> 메뉴에 PDF로 올려 뒀어요.</p>',
      isNotice: true,
      ackCount: 4,
      ackedByMe: true,
      createdAt: '2026-10-21T15:30:00+09:00',
      edited: true,
    },
    {
      id: 'post3',
      authorId: 'u-minho',
      title: '회원가입 QA 체크리스트',
      bodyHtml:
        '<p>아이디 중복 확인, 비밀번호 조건, 약관 동의 순서로 확인할게요. 빠진 항목 있으면 댓글 대신 채널에 알려 주세요.</p>',
      isNotice: false,
      ackCount: 0,
      ackedByMe: false,
      createdAt: '2026-10-20T11:05:00+09:00',
      edited: false,
    },
  ],
};

export const files: Record<string, ProjectFile[]> = {
  'p-login': [
    {
      id: 'f1',
      name: '디자인_가이드_v2.pdf',
      kind: 'doc',
      ext: 'PDF',
      size: '2.4MB',
      uploaderId: 'u-yuna',
      createdAt: '2026-10-22T10:16:00+09:00',
    },
    {
      id: 'f2',
      name: '로그인_시안.png',
      kind: 'image',
      ext: 'PNG',
      size: '1.2MB',
      uploaderId: 'u-yuna',
      createdAt: '2026-10-22T10:15:00+09:00',
    },
    {
      id: 'f3',
      name: '로그인_플로우.fig',
      kind: 'design',
      ext: 'FIG',
      size: '8.7MB',
      uploaderId: 'u-yuna',
      createdAt: '2026-10-21T16:20:00+09:00',
    },
    {
      id: 'f4',
      name: '스프린트_회의록_1020.docx',
      kind: 'doc',
      ext: 'DOC',
      size: '340KB',
      uploaderId: 'u-haneul',
      createdAt: '2026-10-20T18:00:00+09:00',
    },
    {
      id: 'f5',
      name: '회원가입_흐름.png',
      kind: 'image',
      ext: 'PNG',
      size: '860KB',
      uploaderId: 'u-seojun',
      createdAt: '2026-10-20T13:40:00+09:00',
    },
  ],
};

export const userById = (id: string) => users.find((u) => u.id === id);
