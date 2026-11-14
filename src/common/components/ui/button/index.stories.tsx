import { Button } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'outline', 'rec', 'rec-outline', 'text'] },
    size: { control: 'radio', options: ['md', 'lg'] },
  },
  args: { children: '서가 보기 →' },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'primary', size: 'lg' } };
export const Outline: Story = { args: { variant: 'outline', children: '찾는 책 보기' } };
export const Rec: Story = { args: { variant: 'rec', children: '추천 목록 →' } };
export const RecOutline: Story = { args: { variant: 'rec-outline', children: '추천 4' } };
export const Text: Story = { args: { variant: 'text', children: '위치 보기 →' } };
