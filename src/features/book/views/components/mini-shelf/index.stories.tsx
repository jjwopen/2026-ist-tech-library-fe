import { MiniShelf } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof MiniShelf> = {
  title: 'Book/MiniShelf',
  component: MiniShelf,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MiniShelf>;

export const ThirdSlot: Story = { args: { slot: 3 } };
