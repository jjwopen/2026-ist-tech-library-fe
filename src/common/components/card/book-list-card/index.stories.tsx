import { useState } from 'react';

import { mockCover } from '../../../../../.storybook/mocks';

import { BookListCard } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof BookListCard> = {
  title: 'Common/Card/BookListCard',
  component: BookListCard,
  tags: ['autodocs'],
  argTypes: {
    priceVariant: { control: 'radio', options: ['filled', 'outline'] },
  },
  args: {
    coverSrc: mockCover('El gran regreso de carrie soto'),
    title: 'El gran regreso de carrie soto',
    author: 'Taylor Jenkins Reid',
    rating: 4.9,
    price: 16,
    bookmarkLabel: 'Bookmark',
  },
  render: function Render(args) {
    const [bookmarked, setBookmarked] = useState(args.bookmarked);
    return <BookListCard {...args} bookmarked={bookmarked} onBookmarkToggle={setBookmarked} />;
  },
};

export default meta;
type Story = StoryObj<typeof BookListCard>;

export const Filled: Story = {
  args: { bookmarked: false, priceVariant: 'filled' },
};

export const OutlineBookmarked: Story = {
  args: {
    coverSrc: mockCover('Domingo'),
    title: 'Domingo',
    author: 'Natalia Ginzburg',
    rating: 4.7,
    price: 19,
    bookmarked: true,
    priceVariant: 'outline',
  },
};
