import { CountBadge } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof CountBadge> = {
  title: 'Common/CountBadge',
  component: CountBadge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CountBadge>;

export const Default: Story = {
  args: { count: 8 },
};

export const TwoDigits: Story = {
  args: { count: 68 },
};

export const WithoutDot: Story = {
  args: { count: 13, dot: false },
};
