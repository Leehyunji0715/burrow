import { Button } from '~/components';

export const Header = () => {
  return (
    <header className='flex flex-col items-center gap-9'>
      <h1>
        Welcome to <span className=''>Remix</span>
      </h1>
      <Button>CLICK!</Button>
    </header>
  );
};
