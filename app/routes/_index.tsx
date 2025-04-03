import type { MetaFunction } from '@remix-run/node';
import { Button, Header, Navigation } from '~/components';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App222222' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  return (
    <>
      <Navigation type='homeNavigation'/>
      <Header />
      <div style={{height: '50rem'}}></div>
    </>
  );
}
