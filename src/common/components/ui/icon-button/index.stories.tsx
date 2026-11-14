import { Search, Settings, ShoppingBasket } from 'lucide-react';

import { IconButton } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof IconButton> = {
  title: 'Common/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: false },
    variant: { control: 'radio', options: ['solid', 'surface', 'ghost'] },
    size: { control: 'radio', options: ['sm', 'md'] },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Solid: Story = {
  args: { icon: ShoppingBasket, label: 'Cart', variant: 'solid' },
};

export const SolidWithBadge: Story = {
  args: { icon: ShoppingBasket, label: 'Cart', variant: 'solid', badge: true },
};

export const Surface: Story = {
  args: { icon: Search, label: 'Search', variant: 'surface', size: 'sm' },
  decorators: [
    (Story) => (
      <div className="bg-surface-alt p-4">
        <Story />
      </div>
    ),
  ],
};

export const Ghost: Story = {
  args: { icon: Settings, label: 'Settings', variant: 'ghost' },
};
