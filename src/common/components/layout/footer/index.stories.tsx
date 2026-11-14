import { Footer } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Footer> = {
  title: 'Common/Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    selected: { control: 'radio', options: ['search', 'map'] },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const SearchSelected: Story = {
  args: { selected: 'search' },
};

export const MapSelected: Story = {
  args: { selected: 'map' },
};
