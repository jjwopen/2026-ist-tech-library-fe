import { type ReactNode } from 'react';

import { Link } from '@tanstack/react-router';

import { cn } from '@/common/utils';

import { type HomeBook } from '../../../viewmodels';
import { useBookLabels } from '../../hooks';
import { BookCoverArt } from '../book-cover-art';

/** 홈 가로 목록의 책 한 권 — 누르면 제목으로 검색 */
export function BookTile({ book, badge, badgeVariant = 'rank', className }: BookTile.Props) {
  const labels = useBookLabels();

  return (
    <Link
      to="/search"
      search={{ q: book.title }}
      className={cn('flex w-[88px] shrink-0 flex-col', className)}
    >
      <div className="relative w-16">
        <BookCoverArt title={book.title} color={book.coverColor} size="md" />
        <span
          className={cn(
            'font-num border-print-paper text-print-paper absolute right-0 bottom-0 border leading-none font-bold',
            badgeVariant === 'rank'
              ? 'bg-accent px-1.5 py-0.5 text-[11px]'
              : 'bg-print-ink px-1 py-0.5 text-[9px]',
          )}
        >
          {badge}
        </span>
      </div>
      <p className="text-meta mt-1.5 line-clamp-2 min-h-8 font-medium wrap-break-word">
        {book.title}
      </p>
      <p className="text-sub truncate pt-0.5 text-[11px]">{labels.location(book)}</p>
    </Link>
  );
}

export namespace BookTile {
  export type Props = {
    book: HomeBook;
    badge: ReactNode;
    /** rank: 빨간 순위 배지, date: 검정 입고일 배지 */
    badgeVariant?: 'rank' | 'date';
    className?: string;
  };
}
