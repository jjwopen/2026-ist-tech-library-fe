import { type Book } from '../../../viewmodels';

import { LocationSheet } from '.';

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

const meta: Meta<typeof LocationSheet> = {
  title: 'Book/LocationSheet',
  component: LocationSheet,
  tags: ['autodocs'],
  args: { book },
};

export default meta;
type Story = StoryObj<typeof LocationSheet>;

export const Default: Story = {};
