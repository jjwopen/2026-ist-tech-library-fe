import { useState } from 'react';

import { SearchInput } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SearchInput> = {
  title: 'Common/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  args: { placeholder: 'Search' },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <SearchInput {...args} value={value} onChange={setValue} />;
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Empty: Story = {
  args: { value: '' },
};

export const Filled: Story = {
  args: { value: 'The black kiss' },
};
