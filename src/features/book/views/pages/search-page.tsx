import { useEffect, useRef, useState } from 'react';

import { useNavigate } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import { useSearchBooks, useSimilarBooks, type Book } from '../../viewmodels';
import { BookCard, BookStatus } from '../components/book-card';
import { BookRow } from '../components/book-row';
import { BookSheetProvider, useSheetActions } from '../components/book-sheet';
import { InkIcon } from '../components/ink-icon';
import { ScanLoader } from '../components/scan-loader';
import { useBookLabels, usePressToOpen, useStuck } from '../hooks';
import { bleed, D } from '../motion';

import '../styles/primo.css';

/** 찾는 중 화면을 최소 이만큼 보여줌 — 손끝이 서가를 다 훑고 찾은 책의 파문이 퍼질 시간 */
const MIN_SCAN_MS = 2600;

/** 검색 — 찾는 중(서가 훑기) → 결과 */
export function SearchPage({ query }: SearchPage.Props) {
  return (
    // 검색어가 바뀌면 열린 시트와 화면 상태를 새로 시작
    <BookSheetProvider key={query}>
      <Search query={query} />
    </BookSheetProvider>
  );
}

function Search({ query }: SearchPage.Props) {
  const { t } = useTranslation('book');
  const navigate = useNavigate();
  const result = useSearchBooks(query);
  const [scanned, setScanned] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stuck = useStuck(titleRef);
  const loading = !!query.trim() && (result.status === 'pending' || !scanned);

  useEffect(() => {
    const timer = setTimeout(() => setScanned(true), D(MIN_SCAN_MS));
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="primo primo-screen">
      <div className={cn('p-bar', stuck && !loading && 'stuck')}>
        <button
          type="button"
          className="p-icon-btn p-back"
          aria-label={t('search.home')}
          onClick={() => navigate({ to: '/' })}
        >
          <InkIcon name="back" />
        </button>
        <span className="p-bar-t">{query}</span>
      </div>
      {loading ? (
        <ScanLoader query={query} />
      ) : (
        <Results query={query} result={result} titleRef={titleRef} />
      )}
    </div>
  );
}

function Results({
  query,
  result,
  titleRef,
}: {
  query: string;
  result: ReturnType<typeof useSearchBooks>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  const { t } = useTranslation('book');
  const navigate = useNavigate();
  const labels = useBookLabels();
  const { openBook, toast } = useSheetActions();
  const rootRef = useRef<HTMLDivElement>(null);
  const { books, hasMore, commonShelf, shelfCount, status } = result;
  const basis = books.find((book) => book.isbn) ?? null;
  const { recommendations, loading: recsLoading } = useSimilarBooks(basis?.isbn);
  const similar = recommendations.filter(
    (rec) => rec.book && !books.some((b) => b.id === rec.book!.id),
  );

  const press = usePressToOpen<Book>({
    onOpen: (book, origin) => openBook({ book }, origin),
    onShortTap: () => toast(t('home.pressHint')),
  });

  // 결과가 한 줄씩 번지며 나타남
  useEffect(() => {
    bleed(rootRef.current?.querySelectorAll('[data-r]') ?? [], 0, 60);
  }, []);
  useEffect(() => {
    if (similar.length) bleed(rootRef.current?.querySelectorAll('.p-rows [data-r]') ?? [], 0, 60);
    // 추천이 도착했을 때 한 번
  }, [similar.length]);

  const kind = !query.trim()
    ? 'empty'
    : status === 'error'
      ? 'error'
      : books.length === 0
        ? 'none'
        : 'ok';
  // 다음 쪽이 있으면 받은 결과만으로 '모두 어느 서가'라고 말할 수 없어 권수만
  const sub =
    kind === 'ok'
      ? hasMore
        ? labels.count(books.length, true)
        : commonShelf
          ? t('search.subOneShelf', {
              books: labels.count(books.length),
              floor: labels.floor(commonShelf.floor),
              shelf: commonShelf.shelf,
            })
          : t('search.subShelves', { books: labels.count(books.length), shelves: shelfCount })
      : kind === 'error'
        ? t('search.errorTitle')
        : t('search.noneTitle');

  return (
    <div ref={rootRef}>
      <h1 ref={titleRef} className="r-title" data-r data-mark>
        {query || t('search.emptyQuery')}
      </h1>
      <p className="r-sub" data-r>
        {sub}
      </p>

      {kind === 'ok' && (
        <>
          <p className="r-hint" data-r>
            {t('search.pressHint')}
          </p>
          <div className="p-grid">
            {books.map((book) => (
              <BookCard
                key={book.id}
                data-r
                title={book.title}
                author={book.authors}
                publisher={book.publisher}
                color={book.coverColor}
                image={book.coverUrl}
                seed={book.id}
                loan={book.loan === 'unavailable'}
                meta={book.location ? labels.faceSpot(book.location) : t('location.unknown')}
                status={
                  <BookStatus
                    label={labels.loan(book.loan)}
                    available={book.loan === 'available'}
                  />
                }
                pressProps={{
                  ...press(book),
                  'aria-label': t('home.openBook', { title: book.title }),
                }}
              />
            ))}
          </div>
          {basis && (recsLoading || similar.length > 0) && (
            <section className="p-sec">
              <div className="p-sec-h" data-r>
                <h2>{t('search.similar')}</h2>
                <span className="p-cap">{t('search.similarBasis', { title: basis.title })}</span>
              </div>
              {recsLoading ? (
                <p className="r-hint">{t('info.similarLoading')}</p>
              ) : (
                <ul className="p-rows">
                  {similar.map((rec) => (
                    <BookRow
                      key={rec.rank}
                      title={rec.title}
                      color={rec.coverColor}
                      image={rec.coverUrl}
                      seed={rec.book!.id}
                      why={rec.explanation}
                      meta={
                        rec.book!.location
                          ? labels.place(rec.book!.location)
                          : t('location.unknown')
                      }
                      aria-label={t('home.openBook', { title: rec.title })}
                      onClick={(event) => {
                        const rect = event.currentTarget.getBoundingClientRect();
                        openBook(
                          { book: rec.book! },
                          {
                            x: rect.left + 40,
                            y: rect.top + rect.height / 2,
                            element: event.currentTarget,
                          },
                        );
                      }}
                    />
                  ))}
                </ul>
              )}
            </section>
          )}
        </>
      )}

      {kind === 'none' || kind === 'empty' ? (
        <div className="p-state">
          <p data-r>{t('search.noneBody')}</p>
          <ul className="p-marks">
            <li data-r>{t('search.tipSpacing')}</li>
            <li data-r>{t('search.tipAuthor')}</li>
            <li data-r>{t('search.tipShorter')}</li>
          </ul>
          <button type="button" className="p-btn" data-r onClick={() => navigate({ to: '/' })}>
            {t('search.again')}
          </button>
        </div>
      ) : null}

      {kind === 'error' && (
        <div className="p-state">
          <p data-r>{t('search.errorBody')}</p>
          <button type="button" className="p-btn" data-r onClick={() => result.retry()}>
            {t('search.retry')}
          </button>
        </div>
      )}
    </div>
  );
}

export namespace SearchPage {
  export type Props = {
    query: string;
  };
}
