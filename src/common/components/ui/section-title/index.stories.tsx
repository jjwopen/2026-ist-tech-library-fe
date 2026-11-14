import { SectionTitle } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SectionTitle> = {
  title: 'Common/SectionTitle',
  component: SectionTitle,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SectionTitle>;

export const Default: Story = {
  args: { title: 'My books' },
};

export const WithAction: Story = {
  args: {
    title: 'Most popular this week',
    action: <button className="text-caption text-muted hover:text-ink">See all</button>,
  },
};
