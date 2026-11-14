import { PlayButton } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof PlayButton> = {
  title: 'Common/PlayButton',
  component: PlayButton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
  },
};

export default meta;
type Story = StoryObj<typeof PlayButton>;

export const Medium: Story = {
  args: { label: 'Play', size: 'md' },
};

export const Small: Story = {
  args: { label: 'Play', size: 'sm' },
};
