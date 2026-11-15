import { type Book } from '../../../viewmodels';

import { ShelfPanel } from '.';

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

const meta: Meta<typeof ShelfPanel> = {
  title: 'Book/ShelfPanel',
  component: ShelfPanel,
  parameters: { layout: 'padded' },
  args: { book, selected: null, onClearSelection: () => {} },
};

export default meta;
type Story = StoryObj<typeof ShelfPanel>;

export const Target: Story = {};

export const Recommendation: Story = {
  args: {
    selected: {
      rank: 1,
      title: 'JAX/Flax로 딥러닝 레벨업',
      authors: '',
      reasons: ['같은 분야'],
      explanation: '같은 서가에 있는 실습 위주의 입문서입니다.',
      coverColor: '#e2b93b',
      book: { ...book, location: { ...book.location!, column: 2 } },
    },
  },
};
