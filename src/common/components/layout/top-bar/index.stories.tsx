import { TopBar } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof TopBar> = {
  title: 'Common/Layout/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  argTypes: { children: { control: false }, trailing: { control: false } },
};

export default meta;
type Story = StoryObj<typeof TopBar>;

export const Title: Story = {
  args: {
    children: (
      <>
        <span className="font-num text-[28px]/7 font-bold">3F</span>
        <span className="text-subtitle">단행본</span>
      </>
    ),
  },
};

export const WithoutBorder: Story = {
  args: { bordered: false, children: <span className="text-h2">추천</span> },
};
