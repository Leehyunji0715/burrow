import type { MetaFunction } from '@remix-run/node';
import { Header, HomeNavigation } from '~/components';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App222222' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  return (
    <>
      <HomeNavigation/>
      <Header />
      <div style={{height: '50rem'}}></div>
    </>
  );
}
