import { AuthorCard } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof AuthorCard> = {
  title: 'Common/Card/AuthorCard',
  component: AuthorCard,
  tags: ['autodocs'],
  argTypes: {
    rating: { control: { type: 'range', min: 0, max: 5, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof AuthorCard>;

export const Default: Story = {
  args: {
    avatarSrc: 'https://i.pravatar.cc/120?img=60',
    name: 'George Martin',
    rating: 4,
    bookCount: 8,
  },
};

export const List: Story = {
  render: () => (
    <div className="divide-line flex flex-col divide-y *:py-5">
      <AuthorCard
        avatarSrc="https://i.pravatar.cc/120?img=60"
        name="George Martin"
        rating={4}
        bookCount={8}
      />
      <AuthorCard
        avatarSrc="https://i.pravatar.cc/120?img=5"
        name="J. K. Rowling"
        rating={4}
        bookCount={13}
      />
    </div>
  ),
};
