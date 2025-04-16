import { Box, Flex } from '@radix-ui/themes';
import { Comment } from '~/model/dashboard';
import { convertToFormattedDate } from '~/utils/datetime';

import { TeamAvatar } from '../TeamAvatar';
import * as styles from './userComment.css';

type Props = {
  data: Comment;
};

export const UserComment = ({ data }: Props) => {
  return (
    <Flex gap='4' align='center'>
      <TeamAvatar src={data.imageUrl} fallback={data.name} radius='full' size='2' />
      <Flex direction='column' gap='1'>
        <Flex gap='3' align='center'>
          <span>{data.name}</span>
          <span className={styles.commentsDate}>{convertToFormattedDate(data.datetime)}</span>
        </Flex>
        <Box as='div'>{data.content}</Box>
      </Flex>
    </Flex>
  );
};
