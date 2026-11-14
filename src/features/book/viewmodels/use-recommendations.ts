import { useSuspenseQuery } from '@tanstack/react-query';

import { bookApi } from '../models';
import { bookKeys } from './query-keys';

/** S5 추천 목록 */
export function useRecommendations(bookId: string) {
  const { data: target } = useSuspenseQuery({
    queryKey: bookKeys.detail(bookId),
    queryFn: () => bookApi.getBook(bookId),
  });
  const { data: recommendations } = useSuspenseQuery({
    queryKey: bookKeys.recommendations(bookId),
    queryFn: () => bookApi.getRecommendations(bookId),
  });

  return { target, recommendations };
}
