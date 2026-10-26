import { Link } from 'react-router';

import * as shell from '~/components/layout/shell.css';
import { Button } from '~/components/ui/Button';

import { paths } from '~/constant/routes';

export default function NotFound() {
  return (
    <main className={shell.notFound}>
      <h1 className={shell.notFoundTitle}>페이지를 찾을 수 없어요</h1>
      <Button asChild variant='brand'>
        <Link to={paths.home}>처음으로</Link>
      </Button>
    </main>
  );
}
