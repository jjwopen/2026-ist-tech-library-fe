import { ShelfGrid } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ShelfGrid> = {
  title: 'Book/ShelfGrid',
  component: ShelfGrid,
  parameters: { layout: 'padded' },
  args: {
    location: {
      floor: '3F',
      shelf: '335',
      side: 'A',
      slot: 3,
      column: 4,
      position: 'middle',
      mapElementId: '_3F-335',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShelfGrid>;

export const Estimated: Story = {};

export const WithRecommendations: Story = {
  args: {
    recMarkers: [
      { rank: 1, slot: 3, column: 2 },
      { rank: 2, slot: 2, column: 6 },
    ],
  },
};
