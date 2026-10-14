import { type RouteConfig } from '@react-router/dev/routes';
import { flatRoutes } from '@react-router/fs-routes';

// 기존 Remix v2 파일 규칙(app.chat.$id.tsx 등)을 그대로 유지한다.
// 명시적 라우트 선언으로 바꾸려면 이 파일을 수정한다.
// https://reactrouter.com/start/framework/routing
export default flatRoutes() satisfies RouteConfig;
