import { withPrimo } from '../../styles/with-primo';

import { BrandMark } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof BrandMark> = {
  title: 'Book/BrandMark',
  component: BrandMark,
  decorators: [withPrimo],
};

export default meta;
type Story = StoryObj<typeof BrandMark>;

export const Mark: Story = {};
