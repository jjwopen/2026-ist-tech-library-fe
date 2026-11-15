import { useSuspenseQueries } from '@tanstack/react-query';

import { bookQueries } from './book-queries';

/** 홈 — 많이 찾는 말, 이달의 인기 책, 새로 들어온 책 */
export function useHomeBooks() {
  const [{ data: popular }, { data: newArrivals }, { data: popularQueries }] = useSuspenseQueries({
    queries: [bookQueries.popular(), bookQueries.newArrivals(), bookQueries.popularQueries()],
  });

  return { popular, newArrivals, popularQueries };
}
