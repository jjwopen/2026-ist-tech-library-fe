import { type Book } from '../../../viewmodels';
import { withPrimo } from '../../styles/with-primo';

import { BookInfo } from '.';

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

const meta: Meta<typeof BookInfo> = {
  title: 'Book/BookInfo',
  component: BookInfo,
  decorators: [withPrimo],
  args: {
    book,
    intro: {
      synopsis: '파이토치로 딥러닝을 처음부터 실습하는 입문서. 예시 문구예요.',
      recommendedFor: ['코드로 먼저 이해하고 싶을 때', '다음엔 같은 서가의 비슷한 책'],
    },
    recommendations: [],
    recsLoading: false,
    onSelectSimilar: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof BookInfo>;

export const Default: Story = {};
export const LoadingSimilar: Story = { args: { recsLoading: true } };
