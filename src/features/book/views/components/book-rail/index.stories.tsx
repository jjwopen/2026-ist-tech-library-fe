import { type Book } from '../../../viewmodels';
import { BookTile } from '../book-tile';

import { BookRail } from '.';

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
