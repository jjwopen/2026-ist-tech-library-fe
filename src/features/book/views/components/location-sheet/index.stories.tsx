import { type Book } from '../../../viewmodels';

import { LocationSheet } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const book: Book = {
  id: 'alma991003491172303286',
  title: '딥러닝에 목마른 사람들을 위한 PyTorch',
  authors: '장지수',
  isbn: '9791190014366',
  callNumber: 'Q325.5 .장78 2019',
  coverColor: '#1f3a5f',
  loan: 'available',
  location: {
    floor: '3F',
    shelf: '335',
    side: 'A',
    slot: 3,
    column: 4,
    position: 'middle',
    mapElementId: '_3F-335',
  },
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
