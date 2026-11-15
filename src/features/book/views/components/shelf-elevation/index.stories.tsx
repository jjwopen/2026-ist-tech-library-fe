import { withPrimo } from '../../styles/with-primo';

import { ShelfElevation } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ShelfElevation> = {
  title: 'Book/ShelfElevation',
  component: ShelfElevation,
  decorators: [withPrimo],
  args: {
    shelf: '335',
    side: 'A',
    fresh: true,
    marks: [
      {
        id: 'target',
        title: '밑바닥부터 시작하는 딥러닝',
        target: true,
        location: { side: 'A', slot: 3, column: 5 },
      },
      { id: 'rec', title: 'Do it! 딥러닝 입문', location: { side: 'A', slot: 3, column: 6 } },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof ShelfElevation>;

export const Front: Story = {};
export const SelectedRecommendation: Story = { args: { selectedId: 'rec' } };
