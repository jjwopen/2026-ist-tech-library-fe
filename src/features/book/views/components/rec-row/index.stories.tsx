import { type Book } from '../../../viewmodels';

import { RecRow } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const book: Book = {
  id: 'b-0193',
  title: '밑바닥부터 시작하는 딥러닝',
  authors: '사이토 고키',
  callNumber: 'Q325.5 .S35 2017',
  coverColor: '#1f3a5f',
  level: 'intro',
  keywords: [],
  loan: { available: true },
  location: { floor: '3F', shelf: 27, side: 'front', slot: 3, distanceFromElevator: 20 },
};

const meta: Meta<typeof RecRow> = {
  title: 'Book/RecRow',
  component: RecRow,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RecRow>;

export const SameShelf: Story = {
  args: {
    recommendation: {
      rank: 1,
      kind: 'intro',
      reason: '그림으로 개념부터',
      where: { type: 'same-shelf', slot: 3 },
      book: { ...book, title: 'Do it! 딥러닝 입문', authors: '박해선', coverColor: '#e2b93b' },
    },
  },
};

export const Nearby: Story = {
  args: {
    recommendation: {
      rank: 3,
      kind: 'borrowed-together',
      reason: '같이 빌린 기록이 많은 실습서',
      where: { type: 'nearby', shelf: 34, distance: 15 },
      book: {
        ...book,
        title: '파이썬 라이브러리를 활용한 데이터 분석',
        authors: '웨스 맥키니',
        coverColor: '#7a3e3e',
      },
    },
  },
};
