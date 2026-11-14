import { useFloorPlan, useFloorTarget } from '../../../viewmodels';

import { FloorMap } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof FloorMap> = {
  title: 'Book/FloorMap',
  component: FloorMap,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof FloorMap>;

function TargetPreview() {
  const { plan, book: _book, ...rest } = useFloorTarget('3F', 'b-0193');
  return <div className="max-w-[350px]">{plan && <FloorMap plan={plan} {...rest} />}</div>;
}

function BrowsePreview() {
  const { plan } = useFloorPlan('3F');
  return <div className="max-w-[350px]">{plan && <FloorMap plan={plan} />}</div>;
}

export const WithTarget: Story = { render: () => <TargetPreview /> };
export const Browse: Story = { render: () => <BrowsePreview /> };
