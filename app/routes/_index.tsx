import type { MetaFunction } from '@remix-run/node';
import { Button, Header } from '~/components';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App222222' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex flex-col items-center gap-16'>
        <Header />
      </div>
    </div>
  );
}
