import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { ChatMain } from '~/components/app';

import { formId as _formId } from '~/constant/forms';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ id: params.id, type: params.type });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formId = formData.get('formId');
  switch (formId) {
    case _formId.SEND_CHAT_MESSAGE:
      const data = Object.fromEntries(formData);
      console.log({ params, formId, ...data });
      break;
    default:
      break;
  }
  return null;
};

export default function AppContent() {
  const { id = '', type = '' } = useLoaderData<typeof loader>();

  return <ChatMain chatId={id} />;
}
