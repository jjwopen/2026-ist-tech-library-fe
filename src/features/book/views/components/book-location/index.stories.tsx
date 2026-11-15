import { type Book } from '../../../viewmodels';
import { withPrimo } from '../../styles/with-primo';

import { BookLocation } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const book: Book = {
  id: 'alma991003491172303286',
  title: '딥러닝에 목마른 사람들을 위한 PyTorch',
  authors: '장지수',
  isbn: '9791190014366',
  callNumber: 'Q325.5 .장78 2019',
  publisher: '비제이퍼블릭',
  year: '2019',
  description: null,
  coverUrl: null,
  coverColor: '#233552',
  loan: 'available',
  location: {
    floor: '3F',
    shelf: '335',
    side: 'A',
    slot: 3,
    column: 5,
    position: 'middle',
    mapElementId: '_3F-335',
  },
};

const meta: Meta<typeof BookLocation> = {
  title: 'Book/BookLocation',
  component: BookLocation,
  decorators: [withPrimo],
  args: { book, floorMap: null, recommendations: [] },
};

export default meta;
type Story = StoryObj<typeof BookLocation>;

export const WithoutPlan: Story = {};
