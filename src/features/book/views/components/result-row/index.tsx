import { useTranslation } from 'react-i18next';

import { ICONS } from '@/common/assets';
import { SvgIcon } from '@/common/components/ui';
import { cn } from '@/common/utils';

import { type Book } from '../../../viewmodels';
import { useBookLabels } from '../../hooks';
import { BookCoverArt } from '../book-cover-art';
import { LoanStatusMark } from '../loan-status-mark';
import { ViewLocationLink } from '../view-location-link';

/** 검색 결과 한 줄 (Figma ResultRow) */
export function ResultRow({ index, book, className }: ResultRow.Props) {
  const { t } = useTranslation('book');
  const labels = useBookLabels();

  return (
    <article className={cn('border-ink flex items-start gap-3 border-t py-3.5', className)}>
      <span className="num shrink-0">{labels.index(index)}</span>
      <BookCoverArt title={book.title} color={book.coverColor} />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base/[22px] font-bold tracking-[-0.01em]">{book.title}</h3>
          <p className="text-meta text-sub">
            {[book.authors, book.callNumber].filter(Boolean).join(' · ')}
          </p>
        </div>
        <p className={cn('text-small flex items-center gap-1.5', !book.location && 'text-sub')}>
          <SvgIcon src={ICONS.pin} size={16} />
          {book.location ? labels.location(book.location) : t('location.unknown')}
        </p>
        <div className="flex min-h-11 items-center justify-between">
          <LoanStatusMark loan={book.loan} />
          {book.location && <ViewLocationLink book={book} />}
        </div>
      </div>
    </article>
  );
}

export namespace ResultRow {
  export type Props = {
    /** 1부터 시작하는 순번 */
    index: number;
    book: Book;
    className?: string;
  };
}
