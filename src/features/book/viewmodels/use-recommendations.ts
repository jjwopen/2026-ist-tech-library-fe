import { useSuspenseQuery } from '@tanstack/react-query';

import { bookQueries } from './book-queries';

/** S5 추천 목록 — 기준 도서의 ISBN으로 추천 */
export function useRecommendations(bookId: string) {
  const { data: target } = useSuspenseQuery(bookQueries.detail(bookId));
  const { data: recommendations } = useSuspenseQuery(
    bookQueries.recommendations(target.isbn ?? ''),
  );

  return { target, recommendations };
}
