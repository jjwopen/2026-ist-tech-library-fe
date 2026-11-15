import { withPrimo } from '../../styles/with-primo';

import { BookRow } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof BookRow> = {
  title: 'Book/BookRow',
  component: BookRow,
  decorators: [withPrimo],
  render: (args) => (
    <ul className="p-rows">
      <BookRow {...args} />
    </ul>
  ),
};

export default meta;
type Story = StoryObj<typeof BookRow>;

export const Similar: Story = {
  args: {
    title: 'Do it! 딥러닝 입문',
    color: '#C9A23F',
    why: '그림으로 개념부터 잡고 싶을 때',
    meta: '335번 서가 · 앞면 3단 6칸',
  },
};
