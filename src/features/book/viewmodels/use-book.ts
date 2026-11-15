import { useSuspenseQuery } from '@tanstack/react-query';

import { bookQueries } from './book-queries';

/** 도서 상세 + 추정 위치 */
export function useBook(bookId: string) {
  const { data: book } = useSuspenseQuery(bookQueries.detail(bookId));
  return { book };
}
