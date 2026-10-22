import { useParams } from 'react-router';

import { ChatMain } from '~/components/app';

export default function AppContent() {
  const { id = '' } = useParams();
  return <ChatMain chatId={id} />;
}
