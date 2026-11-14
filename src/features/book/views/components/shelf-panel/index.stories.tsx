import { useShelfView } from '../../../viewmodels';

import { ShelfPanel } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ShelfPanel> = {
  title: 'Book/ShelfPanel',
  component: ShelfPanel,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ShelfPanel>;

function Preview({ rank }: { rank?: number }) {
  const { shelf, recommendations } = useShelfView('b-0193');
  if (!shelf) return null;
  const selected = recommendations.find((rec) => rec.rank === rank) ?? null;
  return (
    <div className="max-w-[350px]">
      <ShelfPanel shelf={shelf} selected={selected} onClearSelection={() => {}} />
    </div>
  );
}

export const Target: Story = { render: () => <Preview /> };
export const Recommendation: Story = { render: () => <Preview rank={1} /> };
