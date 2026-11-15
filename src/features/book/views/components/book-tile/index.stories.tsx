import { type HomeBook } from '../../../viewmodels';

import { BookTile } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const book: HomeBook = {
  title: '밑바닥부터 시작하는 딥러닝',
  coverColor: '#1f3a5f',
  floor: '3F',
  shelf: '27',
};

const meta: Meta<typeof BookTile> = {
  title: 'Book/BookTile',
  component: BookTile,
  tags: ['autodocs'],
  args: { book },
};

export default meta;
type Story = StoryObj<typeof BookTile>;

export const Rank: Story = { args: { badge: 1 } };
export const NewArrival: Story = { args: { badge: '11.12', badgeVariant: 'date' } };
