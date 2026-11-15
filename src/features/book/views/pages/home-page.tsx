import { useRef } from 'react';

import { useNavigate } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import { useHomeBooks, type HomeBook } from '../../viewmodels';
import { BookCard } from '../components/book-card';
import { BookSheetProvider, useSheetActions } from '../components/book-sheet';
import { BrandMark } from '../components/brand-mark';
import { Carousel } from '../components/carousel';
import { InkIcon } from '../components/ink-icon';
import { SearchBar } from '../components/search-bar';
import { useBookLabels, useLaunch, usePressToOpen, useStuck } from '../hooks';

import '../styles/primo.css';

/** 홈 — 위는 깨끗한 한지, 이름과 검색. 아래로 많이 빌린 책과 새 책 */
export function HomePage() {
  return (
    <BookSheetProvider>
      <Home />
    </BookSheetProvider>
  );
}

function Home() {
  const { t } = useTranslation('book');
  const navigate = useNavigate();
  const labels = useBookLabels();
  const { popular, newArrivals, popularQueries } = useHomeBooks();
  const { openBook, toast } = useSheetActions();

  const screenRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const markRef = useRef<SVGSVGElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const suggRef = useRef<HTMLDivElement>(null);
  const belowRef = useRef<HTMLDivElement>(null);
  const brushRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const stuck = useStuck(brandRef);

  const { pre, launching } = useLaunch({
    screenRef,
    brandRef,
    markRef,
    restRefs: [leadRef, searchRef, suggRef, belowRef],
    brushRef,
    tagline: t('home.tagline'),
  });

  const press = usePressToOpen<HomeBook>({
    onOpen: (book, origin) => openBook({ title: book.title }, origin),
    onShortTap: () => toast(t('home.pressHint')),
  });
  const search = (query: string) => navigate({ to: '/search', search: { q: query } });
  const shelfMeta = (book: HomeBook) => labels.shelf(book.shelf);

  return (
    <div
      ref={screenRef}
      className={cn('primo primo-screen', pre && 'p-pre', launching && 'p-launching')}
    >
      <header className={cn('p-bar', stuck && 'stuck')}>
        <span className="p-bar-t">
          <BrandMark className="p-bar-mark" />
          rimo
        </span>
        <button
          type="button"
          className="p-icon-btn p-bar-act"
          aria-label={t('home.toSearch')}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 420);
          }}
        >
          <InkIcon name="search" />
        </button>
      </header>

      <div className="p-hero">
        <h1 ref={brandRef} className="p-brand" aria-label="Primo">
          <BrandMark ref={markRef} withShelf />
          {['r', 'i', 'm', 'o'].map((letter) => (
            <span key={letter} aria-hidden>
              {letter}
            </span>
          ))}
        </h1>
        <p ref={leadRef} className="p-lead">
          {t('home.lead1')}
          <br />
          {t('home.lead2')}
        </p>
      </div>

      <div ref={searchRef}>
        <SearchBar ref={inputRef} onSubmit={search} />
      </div>
      <span ref={brushRef} hidden />

      <div ref={suggRef} className="p-sugg">
        <span className="p-cap">{t('home.popularQueries')}</span>
        <div className="p-chips">
          {popularQueries.map((query) => (
            <button key={query} type="button" className="p-chip" onClick={() => search(query)}>
              {query}
            </button>
          ))}
        </div>
      </div>

      <div ref={belowRef} className="p-below">
        <section className="p-sec">
          <div className="p-sec-h">
            <h2>{t('home.popular')}</h2>
            <span className="p-cap">
              {t('home.popularCaption', { month: dayjs().month() + 1 })}
            </span>
          </div>
          <p className="p-hint">{t('home.pressHint')}</p>
          <Carousel label={t('home.popular')}>
            {popular.map(({ rank, book }) => (
              <BookCard
                key={book.title}
                role="listitem"
                title={book.title}
                color={book.coverColor}
                over={<b>{rank}</b>}
                meta={shelfMeta(book)}
                pressProps={{
                  ...press(book),
                  'aria-label': t('home.openBook', { title: book.title }),
                }}
              />
            ))}
          </Carousel>
        </section>

        <section className="p-sec">
          <div className="p-sec-h">
            <h2>{t('home.newArrivals')}</h2>
            <span className="p-cap">{t('home.newArrivalsCaption')}</span>
          </div>
          <Carousel label={t('home.newArrivals')}>
            {newArrivals.map(({ arrivedAt, book }) => (
              <BookCard
                key={book.title}
                role="listitem"
                title={book.title}
                color={book.coverColor}
                over={dayjs(arrivedAt).format('MM.DD')}
                meta={shelfMeta(book)}
                pressProps={{
                  ...press(book),
                  'aria-label': t('home.openBook', { title: book.title }),
                }}
              />
            ))}
          </Carousel>
        </section>
        <span className="p-brush p-endmark" aria-hidden />
      </div>
    </div>
  );
}
