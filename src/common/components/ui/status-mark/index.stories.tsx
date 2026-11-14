import { StatusMark } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof StatusMark> = {
  title: 'Common/StatusMark',
  component: StatusMark,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatusMark>;

export const Available: Story = { args: { label: '대출 가능' } };
export const OnLoan: Story = { args: { label: '대출 중 · 11/21 반납 예정', active: false } };
