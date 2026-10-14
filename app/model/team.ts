export type Team = {
  id: string;
  name: string;
  image?: string;
};

export const sampleTeams: Team[] = [
  { id: '1', name: 'Team1' },
  { id: '2', name: 'Team2' },
];

// DB 연결 전 임시 구현. 호출부가 Promise 를 기대하므로 형태를 맞춰둔다.
// 실제 조회는 동기 연산이라 await 할 대상이 없어 Promise.resolve 로 감싼다.
// TODO: Prisma 로 교체할 때 async/await 로 바꾼다.
export const sampleGetMyTeam = (id: string): Promise<Team | undefined> => {
  return Promise.resolve(sampleTeams.find((team) => team.id === id));
};
