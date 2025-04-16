export type DashboardItem = {
  id: string;
  title: string;
  author: string;
  authorImage: string;
  content: string;
  datetime: string;
  comments?: Comment[];
};

export type Comment = {
  name: string;
  content: string;
  imageUrl: string;
};

export const fetchAllDashboardItems = (): Promise<DashboardItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataList);
    }, 500);
  });
};

const dataList: DashboardItem[] = [
  {
    id: '1',
    title:
      'A very very very very very very very very very very very very very very very very very very very very long title',
    author: 'User 1',
    authorImage: 'https://randomuser.me/api/portraits/men/10.jpg',
    content: '내일까지 작업 마감 부탁드립니다.',
    datetime: '2025-04-12T13:29:43.374Z',
    comments: [
      { name: 'User1', content: '넵!', imageUrl: '' },
      { name: 'User2', content: '넵!2222', imageUrl: '' },
    ],
  },
  {
    id: '2',
    title: 'Title 2',
    author: 'User2',
    authorImage: 'https://randomuser.me/api/portraits/men/10.jpg',
    content: '내일은 휴일입니다.',
    datetime: '2025-04-15T13:29:43.374Z',
  },
  {
    id: '3',
    title: 'Title 2',
    author: 'User2',
    authorImage: 'https://randomuser.me/api/portraits/men/10.jpg',
    content: '내일은 휴일입니다.',
    datetime: '2025-04-15T13:29:43.374Z',
  },
  {
    id: '4',
    title: 'Title 4',
    author: 'User2',
    authorImage: 'https://randomuser.me/api/portraits/men/10.jpg',
    content: '내일은 휴일입니다.',
    datetime: '2025-04-15T13:29:43.374Z',
  },
  {
    id: '5',
    title: 'Title 2',
    author: 'User2',
    authorImage: 'https://randomuser.me/api/portraits/men/10.jpg',
    content: '내일은 휴일입니다.',
    datetime: '2025-04-15T13:29:43.374Z',
  },
];
