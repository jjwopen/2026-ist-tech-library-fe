import { useSuspenseQueries } from '@tanstack/react-query';

import { bookQueries } from './book-queries';

/** S5 추천 목록 */
export function useRecommendations(bookId: string) {
  const [{ data: target }, { data: recommendations }] = useSuspenseQueries({
    queries: [bookQueries.detail(bookId), bookQueries.recommendations(bookId)],
  });

  return { target, recommendations };
}
