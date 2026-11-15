import { useFloorMap, useFloorTarget } from '../../../viewmodels';

import { FloorMap } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof FloorMap> = {
  title: 'Book/FloorMap',
  component: FloorMap,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof FloorMap>;

function BrowsePreview() {
  const { map } = useFloorMap('3F');
  return <div className="max-w-[350px]">{map && <FloorMap map={map} />}</div>;
}

function TargetPreview() {
  const { map, target, recShelfIds, sameShelfCount, recMarkers } =
    useFloorTarget('alma991003491172303286');
  return (
    <div className="max-w-[350px]">
      {map && (
        <FloorMap
          map={map}
          target={target}
          recShelfIds={recShelfIds}
          sameShelfCount={sameShelfCount}
          recMarkers={recMarkers}
        />
      )}
    </div>
  );
}

export const Browse: Story = { render: () => <BrowsePreview /> };
export const WithTarget: Story = { render: () => <TargetPreview /> };
