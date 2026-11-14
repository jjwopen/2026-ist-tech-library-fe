import { mockCover } from '../../../../../.storybook/mocks';

import { BookProgressCard } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof BookProgressCard> = {
  title: 'Common/Card/BookProgressCard',
  component: BookProgressCard,
  tags: ['autodocs'],
  argTypes: {
    progress: { control: { type: 'range', min: 0, max: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof BookProgressCard>;

export const Default: Story = {
  args: {
    coverSrc: mockCover('The black kiss'),
    title: 'The black kiss',
    author: 'Colleen Hoover',
    progress: 48,
    playLabel: 'Play',
  },
};

export const LongTitle: Story = {
  args: {
    coverSrc: mockCover('The Love Prescription'),
    title: 'The Love Prescription: Seven Days to More Intimacy',
    author: 'John Gottman',
    progress: 12,
    playLabel: 'Play',
  },
};
