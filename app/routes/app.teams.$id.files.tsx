import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import * as styles from './app.teams.css';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ id: params.id });
};

export default function AppContent() {
  const { id = '' } = useLoaderData<typeof loader>();
  return <div className={styles.contentContainer}>{id}-Files</div>;
}
