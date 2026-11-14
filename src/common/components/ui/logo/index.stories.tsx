import { Logo } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Logo> = {
  title: 'Common/Logo',
  component: Logo,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {};

export const Large: Story = {
  args: { className: 'h-16 w-12' },
};
