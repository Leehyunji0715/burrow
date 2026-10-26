import { Route, Routes } from 'react-router';
import AppLayout, { AppIndex } from '~/routes/app-layout';
import BoardPage from '~/routes/board';
import ChannelPage from '~/routes/channel';
import DmsLayout, { DmPage, DmsIndex } from '~/routes/dms';
import FilesPage from '~/routes/files';
import Landing from '~/routes/landing';
import Login from '~/routes/login';
import NotFound from '~/routes/not-found';
import ProjectLayout, { ProjectIndex } from '~/routes/project-layout';
import Signup from '~/routes/signup';

// URL 의 단어는 API 경로(/api/projects/:id/channels …)와 맞춘다.
export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='app' element={<AppLayout />}>
        <Route index element={<AppIndex />} />
        <Route path='projects/:projectId' element={<ProjectLayout />}>
          <Route index element={<ProjectIndex />} />
          <Route path='channels/:channelId' element={<ChannelPage />} />
          <Route path='board' element={<BoardPage />} />
          <Route path='files' element={<FilesPage />} />
        </Route>
        <Route path='dms' element={<DmsLayout />}>
          <Route index element={<DmsIndex />} />
          <Route path=':dmId' element={<DmPage />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
