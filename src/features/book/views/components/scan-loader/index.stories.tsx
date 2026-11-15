import { withPrimo } from '../../styles/with-primo';

import { ScanLoader } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ScanLoader> = {
  title: 'Book/ScanLoader',
  component: ScanLoader,
  decorators: [withPrimo],
  args: { query: '딥러닝 입문' },
};

export default meta;
type Story = StoryObj<typeof ScanLoader>;

export const Searching: Story = {};
