import { useSuspenseQuery } from '@tanstack/react-query';

import { bookQueries } from './book-queries';

/** S2 검색 결과 */
export function useSearchBooks(query: string) {
  const { data: books } = useSuspenseQuery(bookQueries.search(query.trim()));

  return { books };
}
