import { Rating } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Rating> = {
  title: 'Common/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 5, step: 0.1 } },
    variant: { control: 'radio', options: ['stars', 'compact'] },
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Stars: Story = {
  args: { value: 4, variant: 'stars' },
};

export const Compact: Story = {
  args: { value: 4.9, variant: 'compact' },
};
