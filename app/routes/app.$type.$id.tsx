import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useLocation } from '@remix-run/react';

import { isChat } from '~/constant/routes';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ id: params.id, type: params.type });
};

export default function AppContent() {
  const location = useLocation();
  const { id = '', type = '' } = useLoaderData<typeof loader>();

  if (isChat(location.pathname)) {
    return <div>Chat: {id}</div>;
  }

  return <div>{id}</div>;
}
