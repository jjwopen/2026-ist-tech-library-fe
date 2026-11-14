import { PriceTag } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof PriceTag> = {
  title: 'Common/PriceTag',
  component: PriceTag,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['filled', 'outline'] },
  },
};

export default meta;
type Story = StoryObj<typeof PriceTag>;

export const Filled: Story = {
  args: { price: 16, variant: 'filled' },
};

export const Outline: Story = {
  args: { price: 18, variant: 'outline' },
};
