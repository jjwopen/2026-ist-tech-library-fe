import { type HomeBook } from '../../../viewmodels';
import { BookTile } from '../book-tile';

import { BookRail } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const book: HomeBook = {
  title: '밑바닥부터 시작하는 딥러닝',
  coverColor: '#1f3a5f',
  floor: '3F',
  shelf: '27',
};

const meta: Meta<typeof BookRail> = {
  title: 'Book/BookRail',
  component: BookRail,
  tags: ['autodocs'],
  argTypes: { children: { control: false }, action: { control: false } },
};

export default meta;
type Story = StoryObj<typeof BookRail>;

export const Popular: Story = {
  args: {
    title: '이달의 인기 있는 책',
    caption: '11월 · 대출 많은 순',
    action: '전체 →',
    children: [1, 2, 3, 4].map((rank) => <BookTile key={rank} book={book} badge={rank} />),
  },
};
