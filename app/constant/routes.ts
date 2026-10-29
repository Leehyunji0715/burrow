// 화면 URL. 단어는 API 경로(/api/projects/:id/channels …)와 맞춘다.
export const paths = {
  home: '/',
  login: '/login',
  signup: '/signup',
  app: '/app',
  project: (projectId: string) => `/app/projects/${projectId}`,
  channel: (projectId: string, channelId: string) =>
    `/app/projects/${projectId}/channels/${channelId}`,
  board: (projectId: string) => `/app/projects/${projectId}/board`,
  files: (projectId: string) => `/app/projects/${projectId}/files`,
  dms: '/app/dms',
  dm: (dmId: string) => `/app/dms/${dmId}`,
};
