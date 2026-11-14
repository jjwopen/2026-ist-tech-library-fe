import { useShelfView } from '../../../viewmodels';

import { ShelfFront } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ShelfFront> = {
  title: 'Book/ShelfFront',
  component: ShelfFront,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ShelfFront>;

function Preview() {
  const { shelf, selected, select } = useShelfView('b-0193');
  if (!shelf) return null;
  return (
    <div className="max-w-[350px]">
      <ShelfFront shelf={shelf} selectedRank={selected?.rank} onSelectRec={select} />
    </div>
  );
}

export const Shelf27: Story = { render: () => <Preview /> };
