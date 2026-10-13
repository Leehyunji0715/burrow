import type { MetaFunction } from 'react-router';

import { Header, HomeNavigation } from '~/components/home';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  return (
    <>
      <HomeNavigation />
      <Header />
      <div style={{ height: '50rem' }}></div>
    </>
  );
}
