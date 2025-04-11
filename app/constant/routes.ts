export const routes = {
  home: '/',
  app: {
    base: '/app',
    chat: 'chat',
    myChat: 'my-chat',
    teams: 'teams',
  },
};

export const isChat = (pathname: string) => {
  return pathname.includes(`/${routes.app.chat}`);
};

export const isTeams = (pathname: string) => {
  return pathname.includes(`/${routes.app.teams}`);
};