import { ProgressBar } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ProgressBar> = {
  title: 'Common/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
  decorators: [
    (Story) => (
      <div className="w-36">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: { value: 45 },
};

export const Empty: Story = {
  args: { value: 0 },
};

export const Complete: Story = {
  args: { value: 100 },
};
