import { useState } from 'react';

import { BookmarkButton } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof BookmarkButton> = {
  title: 'Common/BookmarkButton',
  component: BookmarkButton,
  tags: ['autodocs'],
  args: { label: 'Bookmark' },
  render: function Render(args) {
    const [bookmarked, setBookmarked] = useState(args.bookmarked);
    return <BookmarkButton {...args} bookmarked={bookmarked} onToggle={setBookmarked} />;
  },
};

export default meta;
type Story = StoryObj<typeof BookmarkButton>;

export const Default: Story = {
  args: { bookmarked: false },
};

export const Bookmarked: Story = {
  args: { bookmarked: true },
};
