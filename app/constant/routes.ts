export const routes = {
  home: '/',
  app: {
    base: '/app',
    notification: 'notification',
    chat: 'chat',
    myChat: 'my-chat',
    teams: 'teams',
  },
};

export const isChat = (pathname: string) => {
  return pathname.includes(`/${routes.app.chat}`);
};
