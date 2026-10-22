import { Route, Routes } from 'react-router';
import Home from '~/routes/_index';
import AppLayout from '~/routes/app';
import ChatLayout from '~/routes/app.chat';
import ChatRoom from '~/routes/app.chat.$id';
import ChatIndex from '~/routes/app.chat._index';
import TeamsLayout from '~/routes/app.teams';
import TeamDetail from '~/routes/app.teams.$id';
import TeamDashboard from '~/routes/app.teams.$id.dashboard';
import TeamFiles from '~/routes/app.teams.$id.files';
import Login from '~/routes/login';
import SignUp from '~/routes/signup';

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='app' element={<AppLayout />}>
        <Route path='chat' element={<ChatLayout />}>
          <Route index element={<ChatIndex />} />
          <Route path=':id' element={<ChatRoom />} />
        </Route>
        <Route path='teams' element={<TeamsLayout />}>
          <Route path=':id' element={<TeamDetail />}>
            <Route path='dashboard' element={<TeamDashboard />} />
            <Route path='files' element={<TeamFiles />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
