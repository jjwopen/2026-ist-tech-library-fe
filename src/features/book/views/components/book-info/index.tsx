import { useTranslation } from 'react-i18next';

import { type Book, type BookIntro, type Recommendation } from '../../../viewmodels';
import { useBookLabels } from '../../hooks';
import { BookRow } from '../book-row';
import { Cover } from '../cover';

/** 책 정보 — 표지, 제목, 판권 정보, 소개, 권하는 경우, 비슷한 책 */
export function BookInfo({
  book,
  intro,
  recommendations,
  recsLoading,
  onSelectSimilar,
}: BookInfo.Props) {
  const { t } = useTranslation('book');
  const labels = useBookLabels();
  const { location } = book;
  const similar = recommendations.filter((rec) => rec.book && rec.book.id !== book.id);

  return (
    <>
      <div className="p-title-page">
        <div className="p-hero-cover" data-b>
          <Cover
            title={book.title}
            author={book.authors}
            publisher={book.publisher}
            color={book.coverColor}
            image={book.coverUrl}
            seed={book.id}
          />
        </div>
        <h2 className="tp-title" data-b data-mark>
          {book.title}
        </h2>
        <p className="tp-by" data-b>
          {[book.authors, book.publisher, book.year].filter(Boolean).join(' · ')}
        </p>
        <span className="p-brush tp-mark" data-b />
        <dl className="p-colophon" data-b>
          {book.callNumber && (
            <div>
              <dt>{t('info.callNumber')}</dt>
              <dd>{book.callNumber}</dd>
            </div>
          )}
          {location && (
            <>
              <div>
                <dt>{t('info.place')}</dt>
                <dd>
                  {labels.floor(location.floor)} · {labels.shelf(location.shelf)}
                </dd>
              </div>
              <div>
                <dt>{t('info.spot')}</dt>
                <dd>{labels.faceSpot(location)}</dd>
              </div>
            </>
          )}
          <div>
            <dt>{t('info.status')}</dt>
            <dd>{labels.loan(book.loan)}</dd>
          </div>
        </dl>
      </div>

      <section className="p-read">
        {intro && (
          <>
            <h3 className="p-label" data-b>
              {t('info.intro')}
            </h3>
            <p className="p-para" data-b>
              {intro.synopsis}
            </p>
            <h3 className="p-label" data-b>
              {t('info.recommendedFor')}
            </h3>
            <ul className="p-marks">
              {intro.recommendedFor.map((line) => (
                <li key={line} data-b>
                  {line}
                </li>
              ))}
            </ul>
          </>
        )}
        <h3 className="p-label" data-b>
          {t('info.similar')}
        </h3>
        {recsLoading ? (
          <p className="p-para" data-b>
            {t('info.similarLoading')}
          </p>
        ) : similar.length > 0 ? (
          <ul className="p-rows sim">
            {similar.map((rec) => (
              <BookRow
                key={rec.rank}
                title={rec.title}
                color={rec.coverColor}
                image={rec.coverUrl}
                seed={rec.book!.id}
                why={rec.explanation}
                meta={rec.book!.location ? labels.place(rec.book!.location) : t('location.unknown')}
                aria-label={t('info.openSimilar', { title: rec.title })}
                onClick={() => onSelectSimilar(rec.book!)}
              />
            ))}
          </ul>
        ) : (
          <p className="p-para" data-b>
            {t('info.similarEmpty')}
          </p>
        )}
      </section>
    </>
  );
}

export namespace BookInfo {
  export type Props = {
    book: Book;
    intro: BookIntro | null;
    recommendations: Recommendation[];
    recsLoading: boolean;
    onSelectSimilar: (book: Book) => void;
  };
}
