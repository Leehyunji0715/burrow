import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useLocation } from '@remix-run/react';

import { ChatMain } from '~/components/app';

import { isChat } from '~/constant/routes';

import { formId as _formId } from '~/constant/forms';
import * as styles from './app.$type.css';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ id: params.id, type: params.type });
};

export const action = async ({
  params, request
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formId = formData.get("formId");
  switch(formId) {
    case _formId.SEND_CHAT_MESSAGE:
      const data = Object.fromEntries(formData);
      console.log({ params, formId, ...data });
      break;
    default:
      console.log("그 외...");
  }
  return null;
};


export default function AppContent() {
  const location = useLocation();
  const { id = '', type = '' } = useLoaderData<typeof loader>();

  return renderContent(location.pathname, id);
}

const renderContent = (pathname: string, id: string) => {
  if (isChat(pathname)) {
    return <ChatMain />;
  }
  return <div>{id}</div>;
};
