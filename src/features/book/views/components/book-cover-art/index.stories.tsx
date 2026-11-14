import { BookCoverArt } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof BookCoverArt> = {
  title: 'Book/BookCoverArt',
  component: BookCoverArt,
  tags: ['autodocs'],
  argTypes: { size: { control: 'radio', options: ['sm', 'md'] }, color: { control: 'color' } },
};

export default meta;
type Story = StoryObj<typeof BookCoverArt>;

export const Small: Story = { args: { title: '밑바닥부터 시작하는 딥러닝', color: '#1f3a5f' } };
export const Medium: Story = {
  args: { title: '혼자 공부하는 머신러닝+딥러닝', color: '#2e7d5b', size: 'md' },
};
export const LightCover: Story = { args: { title: 'Deep Learning', color: '#ece7dc' } };
