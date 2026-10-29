import { describe, expect, it } from 'vitest';
import type { Message } from '~/model';

import { groupMessages } from './groupMessages';

const msg = (seq: number, authorId: string, createdAt: string): Message => ({
  id: `m${seq}`,
  seq,
  authorId,
  text: `메시지 ${seq}`,
  createdAt,
});

describe('groupMessages', () => {
  it('날짜가 바뀌는 곳마다 날짜 구분선을 넣는다', () => {
    const rows = groupMessages([
      msg(1, 'a', '2026-10-21T10:00:00+09:00'),
      msg(2, 'a', '2026-10-22T10:00:00+09:00'),
    ]);
    expect(rows.map((r) => r.kind)).toEqual(['date', 'message', 'date', 'message']);
  });

  it('같은 사람이 5분 안에 이어 보내면 continued 로 표시한다', () => {
    const rows = groupMessages([
      msg(1, 'a', '2026-10-22T10:00:00+09:00'),
      msg(2, 'a', '2026-10-22T10:03:00+09:00'),
      msg(3, 'a', '2026-10-22T10:20:00+09:00'),
      msg(4, 'b', '2026-10-22T10:21:00+09:00'),
    ]);
    const continued = rows.flatMap((r) => (r.kind === 'message' ? [r.continued] : []));
    expect(continued).toEqual([false, true, false, false]);
  });

  it('처음 안 읽은 메시지 앞에 새 메시지 구분선을 넣고, 그 메시지는 이어 보내기로 묶지 않는다', () => {
    const rows = groupMessages(
      [msg(1, 'a', '2026-10-22T10:00:00+09:00'), msg(2, 'a', '2026-10-22T10:01:00+09:00')],
      2,
    );
    expect(rows.map((r) => r.kind)).toEqual(['date', 'message', 'unread', 'message']);
    const last = rows.at(-1);
    expect(last?.kind === 'message' && last.continued).toBe(false);
  });
});
