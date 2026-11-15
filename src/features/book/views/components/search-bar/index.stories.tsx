import { withPrimo } from '../../styles/with-primo';

import { SearchBar } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SearchBar> = {
  title: 'Book/SearchBar',
  component: SearchBar,
  decorators: [withPrimo],
  args: { onSubmit: () => {} },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {};
