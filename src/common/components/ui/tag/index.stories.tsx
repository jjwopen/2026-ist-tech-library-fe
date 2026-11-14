import { Tag } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Tag> = {
  title: 'Common/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['outline', 'accent', 'rec', 'rec-outline'] },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Outline: Story = { args: { children: '입문' } };
export const Accent: Story = { args: { variant: 'accent', children: '찾는 책' } };
export const Rec: Story = { args: { variant: 'rec', children: '추천 1 · 입문' } };
export const RecOutline: Story = { args: { variant: 'rec-outline', children: '함께 빌린' } };
