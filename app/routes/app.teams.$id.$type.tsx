import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ id: params.id, type: params.type });
};

export default function AppContent() {
  const { id = '', type = '' } = useLoaderData<typeof loader>();
  return (
    <>
      {id}-{type}
    </>
  );
}
