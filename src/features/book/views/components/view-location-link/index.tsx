import { type ReactNode } from 'react';

import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { buttonClass } from '@/common/components/ui';

import { type Book } from '../../../viewmodels';

/** 책 위치(층 평면도)로 이동하는 링크. children이 없으면 "위치 보기 →" 텍스트 버튼 */
export function ViewLocationLink({ book, children, className }: ViewLocationLink.Props) {
  const { t } = useTranslation('book');

  return (
    <Link
      to="/floor"
      search={{ floor: book.location.floor, bookId: book.id }}
      className={className ?? buttonClass({ variant: 'text' })}
    >
      {children ?? t('action.viewLocation')}
    </Link>
  );
}

export namespace ViewLocationLink {
  export type Props = {
    book: Book;
    children?: ReactNode;
    className?: string;
  };
}
