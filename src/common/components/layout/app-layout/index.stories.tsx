import { useState } from 'react';

import { Bookmark, BookOpen, House, ShoppingBasket, UserRound } from 'lucide-react';

import { AuthorCard, BookListCard, BookProgressCard } from '@/common/components/card';
import {
  Avatar,
  Chip,
  IconButton,
  Logo,
  NavItem,
  SearchInput,
  SectionTitle,
} from '@/common/components/ui';
import { cn } from '@/common/utils';

import { mockCover } from '../../../../../.storybook/mocks';

import { AppLayout } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof AppLayout> = {
  title: 'Common/Layout/AppLayout',
  component: AppLayout,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    header: { control: false },
    bottomBar: { control: false },
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof AppLayout>;

function Placeholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        'border-track text-caption text-muted flex items-center justify-center rounded-lg border border-dashed',
        className,
      )}
    >
      {label}
    </div>
  );
}

export const Default: Story = {
  args: {
    header: <Placeholder label="Header" className="h-9 w-full" />,
    bottomBar: <Placeholder label="Bottom bar" className="m-2 h-14" />,
    children: (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 8 }, (_, index) => (
          <Placeholder key={index} label={`Content ${index + 1}`} className="h-32" />
        ))}
      </div>
    ),
  },
};

export const ContentOnly: Story = {
  args: {
    children: <Placeholder label="Content" className="h-96" />,
  },
};

const NAV_ITEMS = [
  { key: 'home', icon: House, label: 'Home' },
  { key: 'library', icon: BookOpen, label: 'Library' },
  { key: 'saved', icon: Bookmark, label: 'Saved' },
  { key: 'my', icon: UserRound, label: 'My' },
];

const CATEGORIES = ['Journey', 'Biography', 'Business', 'Romance', 'Fantasy'];

const MY_BOOKS = [
  { title: 'The black kiss', author: 'Colleen Hoover', progress: 48 },
  { title: 'The Love Prescription', author: 'John Gottman', progress: 15 },
  { title: 'Defend the Drawn', author: 'Colleen Hoover', progress: 83 },
];

const AUTHORS = [
  { name: 'George Martin', rating: 4, count: 8, img: 60 },
  { name: 'Stephen Edwin King', rating: 5, count: 68, img: 59 },
  { name: 'J. K. Rowling', rating: 4, count: 13, img: 5 },
];

const POPULAR = [
  {
    title: 'El gran regreso de carrie soto',
    author: 'Taylor Jenkins Reid',
    rating: 4.9,
    price: 16,
  },
  { title: 'Tengo un nombre', author: 'Chanel Miller', rating: 4.8, price: 18 },
  { title: 'Federico', author: 'Ilu Ros', rating: 4.7, price: 19 },
  { title: 'La naranja mecánica', author: 'Anthony Burgess', rating: 4.7, price: 21 },
];

/** 공통 컴포넌트를 조합한 모바일 화면 예시 */
export const Example: Story = {
  render: function Render() {
    const [tab, setTab] = useState('home');
    const [category, setCategory] = useState<string>();
    const [search, setSearch] = useState('');
    const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

    return (
      <AppLayout
        header={
          <div className="flex w-full items-center justify-between">
            <Logo />
            <div className="flex items-center gap-3">
              <Avatar name="Reader" src="https://i.pravatar.cc/120?img=33" />
              <IconButton icon={ShoppingBasket} label="Cart" variant="solid" size="sm" badge />
            </div>
          </div>
        }
        bottomBar={
          <div className="flex">
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.key}
                icon={item.icon}
                label={item.label}
                active={item.key === tab}
                onClick={() => setTab(item.key)}
              />
            ))}
          </div>
        }
      >
        <SearchInput value={search} onChange={setSearch} placeholder="Search" />

        <div className="scrollbar-hidden -mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
          {CATEGORIES.map((item) => (
            <Chip
              key={item}
              label={item}
              selected={item === category}
              onClick={() => setCategory(item === category ? undefined : item)}
            />
          ))}
        </div>

        <section className="mt-8">
          <SectionTitle title="My books" />
          <div className="scrollbar-hidden -mx-5 mt-4 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5">
            {MY_BOOKS.map((book) => (
              <BookProgressCard
                key={book.title}
                coverSrc={mockCover(book.title)}
                title={book.title}
                author={book.author}
                progress={book.progress}
                playLabel="Play"
                className="w-4/5 shrink-0 snap-start"
              />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <SectionTitle title="Best author" />
          <div className="divide-line mt-1 flex flex-col divide-y divide-dashed">
            {AUTHORS.map((author) => (
              <AuthorCard
                key={author.name}
                avatarSrc={`https://i.pravatar.cc/120?img=${author.img}`}
                name={author.name}
                rating={author.rating}
                bookCount={author.count}
                className="py-4"
              />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <SectionTitle title="Most popular this week" />
          <div className="mt-4 flex flex-col gap-6">
            {POPULAR.map((book, index) => (
              <BookListCard
                key={book.title}
                coverSrc={mockCover(book.title)}
                title={book.title}
                author={book.author}
                rating={book.rating}
                price={book.price}
                priceVariant={index % 2 ? 'outline' : 'filled'}
                bookmarked={!!bookmarks[book.title]}
                bookmarkLabel="Bookmark"
                onBookmarkToggle={(next) =>
                  setBookmarks((prev) => ({ ...prev, [book.title]: next }))
                }
              />
            ))}
          </div>
        </section>
      </AppLayout>
    );
  },
};
