import { useQuery } from '@tanstack/react-query';

import { bookQueries } from './book-queries';

/**
 * 검색 결과 — 찾는 중 화면을 직접 보여주기 위해 Suspense 대신 상태로 반환.
 * 같은 서가에 모여 있으면 그 서가를, 아니면 몇 개 서가에 흩어져 있는지 알려줌
 */
export function useSearchBooks(query: string) {
  const trimmed = query.trim();
  const { data, status, refetch } = useQuery({ ...bookQueries.search(trimmed), retry: 1 });

  const books = data?.books ?? [];
  const shelves = new Set(
    books.flatMap((book) =>
      book.location ? [`${book.location.floor}:${book.location.shelf}`] : [],
    ),
  );
  const first = books.find((book) => book.location)?.location ?? null;

  return {
    status,
    books,
    /** 다음 쪽이 더 있음 (서버가 전체 권수를 주지 않음) */
    hasMore: data?.hasMore ?? false,
    /** 모든 결과가 한 서가에 있으면 그 위치 */
    commonShelf: shelves.size === 1 && first ? { floor: first.floor, shelf: first.shelf } : null,
    shelfCount: shelves.size,
    retry: () => refetch(),
  };
}
