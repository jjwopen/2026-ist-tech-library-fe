import { useFloorPlan } from '../../../viewmodels';

import { FloorMap } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof FloorMap> = {
  title: 'Book/FloorMap',
  component: FloorMap,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof FloorMap>;

function Preview({ bookId }: { bookId?: string }) {
  const { plan, target, targetSpot, ...rest } = useFloorPlan('3F', bookId);
  if (!plan) return null;
  return (
    <div className="max-w-[350px]">
      <FloorMap
        plan={plan}
        target={target && targetSpot ? { ...targetSpot, shelf: target.location.shelf } : undefined}
        {...rest}
      />
    </div>
  );
}

export const WithTarget: Story = { render: () => <Preview bookId="b-0193" /> };
export const Browse: Story = { render: () => <Preview /> };
