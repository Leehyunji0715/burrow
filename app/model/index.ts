// 화면이 받는 데이터의 모양. 서버 응답 타입이 정해지면 이 타입에 맞춰 변환하거나 이 타입을 고친다.
import type { ProjectColor } from '~/styles/tokens.css';

export type Presence = 'online' | 'away' | 'offline';

/** 아바타 바탕 팔레트 번호 (tokens: avatar-1 ~ avatar-5) */
export type AvatarTone = 1 | 2 | 3 | 4 | 5;

export type User = {
  id: string;
  name: string;
  /** 아바타에 쓰는 두 글자 */
  initials: string;
  tone: AvatarTone;
  presence: Presence;
  /** 부재중일 때 보여줄 안내 (예: 오후 3시 복귀) */
  statusNote?: string;
};

export type ProjectRole = 'owner' | 'member';

export type ProjectMember = User & { role: ProjectRole };

export type Project = {
  id: string;
  name: string;
  color: ProjectColor;
  /** 레일의 프로젝트 타일에 보여줄 한 글자 */
  initial: string;
  archived: boolean;
};

export type Channel = {
  id: string;
  projectId: string;
  name: string;
  unread: number;
};

export type DirectChat = {
  id: string;
  partner: User;
  unread: number;
  lastMessage: string;
};

export type Attachment =
  { kind: 'file'; name: string; size: string } | { kind: 'image'; name: string; size: string };

export type Message = {
  id: string;
  /** 대화방 안에서 서버가 매기는 순번 */
  seq: number;
  authorId: string;
  text: string;
  attachment?: Attachment;
  /** ISO 8601 */
  createdAt: string;
};

export type Post = {
  id: string;
  authorId: string;
  title: string;
  /** Quill 이 만든 HTML. 렌더링할 때 DOMPurify 로 정리한다 */
  bodyHtml: string;
  isNotice: boolean;
  /** 공지 확인을 누른 멤버 수 */
  ackCount: number;
  ackedByMe: boolean;
  createdAt: string;
  edited: boolean;
};

export type FileKind = 'doc' | 'image' | 'design' | 'etc';

export type ProjectFile = {
  id: string;
  name: string;
  kind: FileKind;
  /** 확장자 표시용 (PDF, PNG …) */
  ext: string;
  size: string;
  uploaderId: string;
  createdAt: string;
};
