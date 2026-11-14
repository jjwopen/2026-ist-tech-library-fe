import { useSuspenseQueries } from '@tanstack/react-query';

import { bookQueries } from './book-queries';

/** S1 홈 — 이달의 인기 책, 새로 들어온 책 */
export function useHomeBooks() {
  const [{ data: popular }, { data: newArrivals }] = useSuspenseQueries({
    queries: [bookQueries.popular(), bookQueries.newArrivals()],
  });

  return { popular, newArrivals };
}
