import { Link } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Footer, PageShell } from '@/common/components/layout';

import { useHomeBooks } from '../../viewmodels';
import { BookRail } from '../components/book-rail';
import { BookTile } from '../components/book-tile';
import { SearchField } from '../components/search-field';

/** S1 검색 (홈) */
export function HomePage() {
  const { t } = useTranslation('book');
  const { popular, newArrivals } = useHomeBooks();

  return (
    <PageShell bottom={<Footer selected="search" />}>
      <p className="text-meta text-sub pt-5">{t('home.library')}</p>
      <h1 className="text-display pt-10 pb-6">{t('home.title')}</h1>

      <SearchField />

      <BookRail
        className="pt-7"
        title={t('home.popular')}
        caption={t('home.popularCaption', { month: dayjs().month() + 1 })}
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
