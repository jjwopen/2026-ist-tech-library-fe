import { useState } from 'react';

import { Link, useNavigate } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { ICONS } from '@/common/assets';
import { Footer, PageShell } from '@/common/components/layout';
import { SvgIcon } from '@/common/components/ui';

import { useHomeBooks } from '../../viewmodels';
import { BookRail } from '../components/book-rail';
import { BookTile } from '../components/book-tile';

/** S1 검색 (홈) */
export function HomePage() {
  const { t } = useTranslation('book');
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { popular, newArrivals } = useHomeBooks();

  return (
    <PageShell bottom={<Footer selected="search" />}>
      <p className="text-meta text-sub pt-5">{t('home.library')}</p>
      <h1 className="text-display pt-10 pb-6">{t('home.title')}</h1>

      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          navigate({ to: '/search', search: { q: query.trim() } });
        }}
        className="border-ink flex h-14 items-center border-2"
      >
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('search.placeholder')}
          aria-label={t('search.placeholder')}
          className="text-body-lg placeholder:text-sub min-w-0 flex-1 bg-transparent pl-4 outline-hidden [&::-webkit-search-cancel-button]:hidden"
        />
        <button
          type="submit"
          aria-label={t('search.submit')}
          className="bg-ink text-paper -mr-0.5 flex size-14 shrink-0 items-center justify-center"
        >
          <SvgIcon src={ICONS.searchWhite.src} size={22} />
        </button>
      </form>

      <BookRail
        className="pt-7"
        title={t('home.popular')}
        caption={t('home.popularCaption', { month: String(dayjs().month() + 1) })}
        action={<Link to="/search">{t('home.viewAll')}</Link>}
      >
        {popular.map(({ rank, book }) => (
          <BookTile key={book.id} book={book} badge={rank} />
        ))}
      </BookRail>

      <BookRail
        className="pt-6 pb-6"
        title={t('home.newArrivals')}
        caption={t('home.newArrivalsCaption')}
        action={<Link to="/search">{t('home.viewAll')}</Link>}
      >
        {newArrivals.map(({ arrivedAt, book }) => (
          <BookTile
            key={book.id}
            book={book}
            badge={dayjs(arrivedAt).format('MM.DD')}
            badgeVariant="date"
          />
        ))}
      </BookRail>
    </PageShell>
  );
}
