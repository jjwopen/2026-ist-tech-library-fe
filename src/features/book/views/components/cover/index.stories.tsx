import { withPrimo } from '../../styles/with-primo';

import { Cover } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Cover> = {
  title: 'Book/Cover',
  component: Cover,
  decorators: [withPrimo],
  args: {
    title: '밑바닥부터 시작하는 딥러닝',
    author: '사이토 고키',
    publisher: '한빛미디어',
    color: '#233552',
  },
  render: (args) => (
    <div style={{ width: 120 }}>
      <Cover {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof Cover>;

export const Dark: Story = {};
export const Light: Story = {
  args: { title: 'Deep Learning', author: 'Ian Goodfellow 외', color: '#E9E2D3', seed: 'deep' },
};
