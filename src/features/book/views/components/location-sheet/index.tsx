import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { buttonClass, Tag } from '@/common/components/ui';
import { cn } from '@/common/utils';

import { type Book } from '../../../viewmodels';
import { useBookLabels } from '../../hooks';
import { LoanStatusMark } from '../loan-status-mark';

/** 층 서가맵 하단 시트 — 찾는 책 요약 + 서가 보기 */
export function LocationSheet({ book, className }: LocationSheet.Props) {
  const { t } = useTranslation('book');
  const labels = useBookLabels();

  return (
    <section className={cn('border-ink flex flex-col gap-2 border-t-2 px-5 pt-4 pb-10', className)}>
      <div className="flex items-center justify-between">
        <Tag variant="accent">{t('tag.target')}</Tag>
        <LoanStatusMark loan={book.loan} />
      </div>
      <h2 className="text-h2">{book.title}</h2>
      {book.location && <p className="text-small">{labels.directions(book.location)}</p>}
      <Link
        to="/books/$bookId/shelf"
        params={{ bookId: book.id }}
        className={buttonClass({ size: 'lg', className: 'w-full' })}
      >
        {t('floor.viewShelf')}
      </Link>
    </section>
  );
}

export namespace LocationSheet {
  export type Props = {
    book: Book;
    className?: string;
  };
}
