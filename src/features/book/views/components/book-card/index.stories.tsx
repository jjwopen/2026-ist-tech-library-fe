import { withPrimo } from '../../styles/with-primo';

import { BookCard, BookStatus } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof BookCard> = {
  title: 'Book/BookCard',
  component: BookCard,
  decorators: [withPrimo],
  args: { title: '밑바닥부터 시작하는 딥러닝', author: '사이토 고키', color: '#233552' },
  render: (args) => (
    <div style={{ width: 104 }}>
      <BookCard {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof BookCard>;

export const Rank: Story = { args: { over: <b>1</b>, meta: '335번 책장' } };
export const Result: Story = {
  args: { meta: '앞면 3단 5칸', status: <BookStatus label="대출 가능" available /> },
};
export const OnLoan: Story = {
  args: {
    loan: true,
    meta: '앞면 4단 2칸',
    status: <BookStatus label="대출 중" available={false} />,
  },
};
