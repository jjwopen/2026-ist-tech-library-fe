import { queryOptions } from '@tanstack/react-query';

import { bookApi, type Book } from '../models';

/** 쿼리 키와 조회 함수를 한곳에서 관리 — 같은 데이터는 화면이 달라도 캐시를 공유 */
export const bookQueries = {
  detail: (id: string) =>
    queryOptions({
      queryKey: ['book', 'detail', id],
      queryFn: () => bookApi.getBook(id),
      // 서버가 원본을 60초 캐시
      staleTime: 60_000,
    }),
  /** 제목으로 검색해 첫 번째 결과 (홈 목업 책 → 실제 소장 도서) */
  byTitle: (title: string) =>
    queryOptions({
      queryKey: ['book', 'by-title', title],
      queryFn: async () => (await bookApi.searchBooks(title)).books[0] ?? null,
      staleTime: 60_000,
    }),
  /** 책이 정해지기 전(제목으로 찾는 중)에는 비활성 쿼리로 둠 */
  intro: (target: Book | null) =>
    queryOptions({
      queryKey: ['book', 'intro', target?.id ?? ''],
      queryFn: () => (target ? bookApi.getIntro(target) : null),
      enabled: !!target,
    }),
  popular: () => queryOptions({ queryKey: ['book', 'popular'], queryFn: bookApi.getPopularBooks }),
  popularQueries: () =>
    queryOptions({ queryKey: ['book', 'popular-queries'], queryFn: bookApi.getPopularQueries }),
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
