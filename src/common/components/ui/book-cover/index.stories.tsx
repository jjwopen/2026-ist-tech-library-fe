import { mockCover } from '../../../../../.storybook/mocks';

import { BookCover } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof BookCover> = {
  title: 'Common/BookCover',
  component: BookCover,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
  },
};

export default meta;
type Story = StoryObj<typeof BookCover>;

export const Medium: Story = {
  args: {
    src: mockCover('The black kiss'),
    title: 'The black kiss',
    size: 'md',
  },
};

export const Small: Story = {
  args: { src: mockCover('Jane Eyre'), title: 'Jane Eyre', size: 'sm' },
};

export const Placeholder: Story = {
  args: { title: 'No cover' },
};
