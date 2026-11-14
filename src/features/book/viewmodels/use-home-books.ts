import { useSuspenseQuery } from '@tanstack/react-query';

import { bookApi } from '../models';
import { bookKeys } from './query-keys';

/** S1 홈 — 이달의 인기 책, 새로 들어온 책 */
export function useHomeBooks() {
  const { data: popular } = useSuspenseQuery({
    queryKey: bookKeys.popular(),
    queryFn: bookApi.getPopularBooks,
  });
  const { data: newArrivals } = useSuspenseQuery({
    queryKey: bookKeys.newArrivals(),
    queryFn: bookApi.getNewArrivals,
  });

  return { popular, newArrivals };
}
