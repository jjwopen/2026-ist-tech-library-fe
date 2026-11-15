import { queryOptions } from '@tanstack/react-query';

import { bookApi } from '../models';

/** 쿼리 키와 조회 함수를 한곳에서 관리 — 같은 데이터는 화면이 달라도 캐시를 공유 */
export const bookQueries = {
  detail: (id: string) =>
    queryOptions({
      queryKey: ['book', 'detail', id],
      queryFn: () => bookApi.getBook(id),
      // 서버가 원본을 60초 캐시
      staleTime: 60_000,
    }),
  popular: () => queryOptions({ queryKey: ['book', 'popular'], queryFn: bookApi.getPopularBooks }),
  newArrivals: () =>
    queryOptions({ queryKey: ['book', 'new-arrivals'], queryFn: bookApi.getNewArrivals }),
  search: (query: string) =>
    queryOptions({
      queryKey: ['book', 'search', query],
      queryFn: () => bookApi.searchBooks(query),
      staleTime: 60_000,
    }),
  // 도면은 거의 바뀌지 않으므로 한 번만 불러옴
  floorMaps: () =>
    queryOptions({
      queryKey: ['library-map'],
      queryFn: bookApi.getFloorMaps,
      staleTime: Infinity,
    }),
  // AI 추천은 응답이 느리고(수 초~십수 초) 결과가 잘 바뀌지 않아 재요청하지 않음
  recommendations: (isbn: string) =>
    queryOptions({
      queryKey: ['book', 'recommendations', isbn],
      queryFn: () => bookApi.getRecommendations(isbn),
      staleTime: Infinity,
    }),
};
