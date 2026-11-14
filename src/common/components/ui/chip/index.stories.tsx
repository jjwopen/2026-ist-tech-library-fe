import { useState } from 'react';

import { Chip } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Chip> = {
  title: 'Common/Chip',
  component: Chip,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: { label: 'Journey' },
};

export const Selected: Story = {
  args: { label: 'Journey', selected: true },
};

const CATEGORIES = ['Journey', 'Biography', 'Business', 'Romance'];

export const Group: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<string>();
    return (
      <div className="scrollbar-hidden flex gap-2 overflow-x-auto">
        {CATEGORIES.map((category) => (
          <Chip
            key={category}
            label={category}
            selected={selected === category}
            onClick={() => setSelected(selected === category ? undefined : category)}
          />
        ))}
      </div>
    );
  },
};
