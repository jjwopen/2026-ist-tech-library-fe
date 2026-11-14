import { useSuspenseQuery } from '@tanstack/react-query';

import { bookApi } from '../models';
import { bookKeys } from './query-keys';

/** S2 검색 결과 */
export function useSearchBooks(query: string) {
  const trimmed = query.trim();
  const { data: books } = useSuspenseQuery({
    queryKey: bookKeys.search(trimmed),
    queryFn: () => bookApi.searchBooks(trimmed),
  });

  return { books };
}
