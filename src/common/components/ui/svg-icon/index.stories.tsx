import { ICONS } from '@/common/assets';

import { SvgIcon } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SvgIcon> = {
  title: 'Common/SvgIcon',
  component: SvgIcon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SvgIcon>;

export const Search: Story = { args: { src: ICONS.search, size: 24 } };

export const All: Story = {
  render: () => (
    <div className="text-ink flex items-center gap-4">
      {Object.entries(ICONS).map(([name, src]) => (
        <SvgIcon key={name} src={src} size={24} label={name} />
      ))}
    </div>
  ),
};
