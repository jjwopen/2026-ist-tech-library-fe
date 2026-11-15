import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Button, buttonClass, Tag } from '@/common/components/ui';
import { cn } from '@/common/utils';

import { type Book, type Recommendation } from '../../../viewmodels';
import { LoanStatusMark } from '../loan-status-mark';

/** 서가 정면 하단 패널 — 기본은 찾는 책, 추천 책을 누르면 추천 정보 */
export function ShelfPanel({ book, selected, onClearSelection, className }: ShelfPanel.Props) {
  const { t } = useTranslation('book');

  return (
    <section className={cn('border-ink flex flex-col gap-2 border-t-2 pt-3.5', className)}>
      {selected ? (
        <>
          <div className="flex items-center justify-between">
            <Tag variant="rec">
              {selected.reasons[0]
                ? t('shelf.recTag', { rank: selected.rank, kind: selected.reasons[0] })
                : t('shelf.recTagRankOnly', { rank: selected.rank })}
            </Tag>
            {selected.book?.location && (
              <span className="text-meta text-rec font-bold">
                {t('shelf.slot', { slot: selected.book.location.slot })}
              </span>
            )}
          </div>
          <h2 className="text-h2">{selected.title}</h2>
          <p className="text-meta text-sub line-clamp-2">
            {[selected.authors, selected.explanation].filter(Boolean).join(' · ')}
          </p>
          <div className="flex gap-2 pt-1">
            <Button variant="outline" size="lg" className="flex-1" onClick={onClearSelection}>
              {t('shelf.viewTarget')}
            </Button>
            <Link
              to="/books/$bookId/recommendations"
              params={{ bookId: book.id }}
              className={buttonClass({ variant: 'rec', size: 'lg', className: 'flex-1' })}
            >
              {t('shelf.recList')}
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <Tag variant="accent">{t('tag.target')}</Tag>
            <LoanStatusMark loan={book.loan} />
          </div>
          <h2 className="text-h2">{book.title}</h2>
          <p className="text-meta text-sub">
            {[book.authors, book.callNumber].filter(Boolean).join(' · ')}
          </p>
          <p className="text-meta text-sub">{t('shelf.estimatedNote')}</p>
        </>
      )}
    </section>
  );
}

export namespace ShelfPanel {
  export type Props = {
    book: Book;
    selected: Recommendation | null;
    onClearSelection: () => void;
    className?: string;
  };
}
