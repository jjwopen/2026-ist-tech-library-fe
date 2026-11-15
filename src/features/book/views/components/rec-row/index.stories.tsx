import { type Book } from '../../../viewmodels';

import { RecRow } from '.';

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

const meta: Meta<typeof RecRow> = {
  title: 'Book/RecRow',
  component: RecRow,
  tags: ['autodocs'],
  args: { target: book },
};

export default meta;
type Story = StoryObj<typeof RecRow>;

export const SameShelf: Story = {
  args: {
    recommendation: {
      rank: 1,
      title: 'JAX/Flax로 딥러닝 레벨업',
      authors: '',
      reasons: ['같은 분야', '더 쉬운 난이도'],
      explanation: '같은 서가에 있는 실습 위주의 입문서입니다.',
      coverColor: '#e2b93b',
      book: { ...book, id: 'alma991003810747303286', title: 'JAX/Flax로 딥러닝 레벨업' },
    },
  },
};

export const NotInLibrary: Story = {
  args: {
    recommendation: {
      rank: 3,
      title: 'Deep Learning',
      authors: 'Ian Goodfellow, Yoshua Bengio',
      reasons: ['같은 분야', '더 어려운 난이도'],
      explanation: '수식으로 원리까지 다루는 심화 교재입니다.',
      coverColor: '#7a3e3e',
      book: null,
    },
  },
};
