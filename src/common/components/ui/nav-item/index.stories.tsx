import { useState } from 'react';

import { Bookmark, BookOpen, House, Settings, UserRound } from 'lucide-react';

import { NavItem } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof NavItem> = {
  title: 'Common/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof NavItem>;

export const Active: Story = {
  args: { icon: House, label: 'Home', active: true },
};

export const Inactive: Story = {
  args: { icon: BookOpen, label: 'Library' },
};

const ITEMS = [
  { key: 'home', icon: House, label: 'Home' },
  { key: 'library', icon: BookOpen, label: 'Library' },
  { key: 'bookmarks', icon: Bookmark, label: 'Saved' },
  { key: 'my', icon: UserRound, label: 'My' },
  { key: 'settings', icon: Settings, label: 'Settings' },
];

export const TabBar: Story = {
  parameters: { layout: 'fullscreen' },
  render: function Render() {
    const [active, setActive] = useState('home');
    return (
      <div className="border-line bg-surface flex border-t">
        {ITEMS.map((item) => (
          <NavItem
            key={item.key}
            icon={item.icon}
            label={item.label}
            active={item.key === active}
            onClick={() => setActive(item.key)}
          />
        ))}
      </div>
    );
  },
};
