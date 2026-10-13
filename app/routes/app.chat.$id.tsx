import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { useLoaderData } from 'react-router';

import { ChatMain } from '~/components/app';

import { formId as _formId } from '~/constant/forms';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return { id: params.id, type: params.type };
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formId = formData.get('formId');
  const data = Object.fromEntries(formData);
  switch (formId) {
    case _formId.SEND_CHAT_MESSAGE:
      console.log({ params, formId, ...data });
      break;
    default:
      break;
  }
  return null;
};

export default function AppContent() {
  const { id = '' /* , type = '' */ } = useLoaderData<typeof loader>();

  return <ChatMain chatId={id} />;
}
