import { type ReactNode } from 'react';

import { Link } from '@tanstack/react-router';

import { cn } from '@/common/utils';

import { type Book } from '../../../viewmodels';
import { useBookLabels } from '../../hooks';
import { BookCoverArt } from '../book-cover-art';

/** 홈 가로 목록의 책 한 권 — 표지 우하단 배지(순위·입고일) + 제목 + 위치 */
export function BookTile({ book, badge, badgeVariant = 'rank', className }: BookTile.Props) {
  const labels = useBookLabels();

  return (
    <Link
      to="/floor"
      search={{ floor: book.location.floor, bookId: book.id }}
      className={cn('flex w-[88px] shrink-0 flex-col', className)}
    >
      <div className="relative w-16">
        <BookCoverArt title={book.title} color={book.coverColor} size="md" />
        <span
          className={cn(
            'font-num absolute right-0 bottom-0 border border-white leading-none font-bold text-white',
            badgeVariant === 'rank'
              ? 'bg-accent px-1.5 py-0.5 text-[11px]'
              : 'bg-[#111] px-1 py-0.5 text-[9px]',
          )}
        >
          {badge}
        </span>
      </div>
      <p className="text-meta mt-1.5 line-clamp-2 min-h-8 font-medium wrap-break-word">
        {book.title}
      </p>
      <p className="text-sub truncate pt-0.5 text-[11px]">
        {labels.location(book.location, false)}
      </p>
    </Link>
  );
}

export namespace BookTile {
  export type Props = {
    book: Book;
    badge: ReactNode;
    /** rank: 빨간 순위 배지, date: 검정 입고일 배지 */
    badgeVariant?: 'rank' | 'date';
    className?: string;
  };
}
