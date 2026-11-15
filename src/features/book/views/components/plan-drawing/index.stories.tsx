import { useFloorMaps } from '../../../viewmodels';
import { withPrimo } from '../../styles/with-primo';

import { PlanDrawing } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof PlanDrawing> = {
  title: 'Book/PlanDrawing',
  component: PlanDrawing,
  decorators: [withPrimo],
};

export default meta;
type Story = StoryObj<typeof PlanDrawing>;

function Preview() {
  const { maps } = useFloorMaps();
  const map = maps?.['3F'];
  return map ? <PlanDrawing map={map} targetId="_3F-335" floorLabel="3층" /> : null;
}

export const Floor3: Story = { render: () => <Preview /> };
