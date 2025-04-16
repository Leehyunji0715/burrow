import { Avatar, Box, Container, Flex, Text } from '@radix-ui/themes';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { DashboardItem } from '~/model/dashboard';

import * as styles from './styles.css';

type Props = {
  data: DashboardItem;
};

export const DashboardCard = ({ data }: Props) => {
  const dateTime = new Date(data.datetime).toISOString().split('T')[0];
  return (
    <Flex direction='column' className={styles.container}>
      <Box className={styles.contentContainer} minHeight='17rem' maxHeight='30rem'>
        <Flex align='center' gap='5'>
          <Avatar src={data.authorImage} fallback={data.author} radius='full' />
          <Text as='div' size='4' className={styles.title}>
            {data.title}
          </Text>
          <Text size='2' color='gray'>
            {dateTime ?? ''}
          </Text>
          <BsThreeDotsVertical />
        </Flex>
        <Container size='1' align='left'>
          {data.content}
        </Container>
      </Box>
      {data.comments?.length && (
        <ul className={styles.commentsContainer}>
          {data.comments.map((comment, i) => (
            <li key={i} className={styles.commentsListItem}>
              {comment.content}
            </li>
          ))}
        </ul>
      )}
    </Flex>
  );
};
