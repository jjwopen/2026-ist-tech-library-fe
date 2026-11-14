import { Avatar } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Avatar> = {
  title: 'Common/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: { src: 'https://i.pravatar.cc/120?img=12', name: 'George Martin' },
};

export const Fallback: Story = {
  args: { name: 'George Martin' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar size="sm" name="J. K. Rowling" src="https://i.pravatar.cc/120?img=5" />
      <Avatar size="md" name="J. K. Rowling" src="https://i.pravatar.cc/120?img=5" />
      <Avatar size="lg" name="J. K. Rowling" src="https://i.pravatar.cc/120?img=5" />
    </div>
  ),
};
