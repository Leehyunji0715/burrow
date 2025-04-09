import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useLocation } from '@remix-run/react';

import { ChatMain } from '~/components/app';

import { isChat } from '~/constant/routes';

import * as styles from './app.$type.css';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ id: params.id, type: params.type });
};

export default function AppContent() {
  const location = useLocation();
  const { id = '', type = '' } = useLoaderData<typeof loader>();

  if (isChat(location.pathname)) {
    return <ChatMain />;
  }

  return <div>{id}</div>;
}
