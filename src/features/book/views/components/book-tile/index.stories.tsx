import { type Book } from '../../../viewmodels';

import { BookTile } from '.';

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
