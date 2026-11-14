import { queryOptions } from '@tanstack/react-query';

import { bookApi, type FloorId } from '../models';

/** 쿼리 키와 조회 함수를 한곳에서 관리 — 같은 데이터는 화면이 달라도 캐시를 공유 */
export const bookQueries = {
  detail: (id: string) =>
    queryOptions({ queryKey: ['book', 'detail', id], queryFn: () => bookApi.getBook(id) }),
  popular: () => queryOptions({ queryKey: ['book', 'popular'], queryFn: bookApi.getPopularBooks }),
  newArrivals: () =>
    queryOptions({ queryKey: ['book', 'new-arrivals'], queryFn: bookApi.getNewArrivals }),
  search: (query: string) =>
    queryOptions({
      queryKey: ['book', 'search', query],
      queryFn: () => bookApi.searchBooks(query),
    }),
  recommendations: (id: string) =>
    queryOptions({
      queryKey: ['book', 'recommendations', id],
      queryFn: () => bookApi.getRecommendations(id),
    }),
  // 평면도·서가 배치는 거의 바뀌지 않으므로 재요청하지 않음
  floorPlan: (floor: FloorId) =>
    queryOptions({
      queryKey: ['book', 'floor-plan', floor],
      queryFn: () => bookApi.getFloorPlan(floor),
      staleTime: Infinity,
    }),
  shelf: (id: string) =>
    queryOptions({
      queryKey: ['book', 'shelf', id],
      queryFn: () => bookApi.getShelfView(id),
      staleTime: Infinity,
    }),
};
