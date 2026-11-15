import { useQueries, useSuspenseQueries } from '@tanstack/react-query';

import { type HomeBook } from '../models';
import { bookQueries } from './book-queries';

/** 홈 — 많이 찾는 말, 이달의 인기 책, 새로 들어온 책 */
export function useHomeBooks() {
  const [{ data: popular }, { data: newArrivals }, { data: popularQueries }] = useSuspenseQueries({
    queries: [bookQueries.popular(), bookQueries.newArrivals(), bookQueries.popularQueries()],
  });

  // 목업 책의 표지는 제목으로 찾은 소장 도서에서 가져옴 — 책을 열 때와 같은 쿼리라 캐시를 공유
  const titles = [...new Set([...popular, ...newArrivals].map(({ book }) => book.title))];
  const coverOf = useQueries({
    queries: titles.map((title) => bookQueries.byTitle(title)),
    combine: (results) => {
      const covers = new Map(titles.map((title, i) => [title, results[i].data?.coverUrl ?? null]));
      return (book: HomeBook): HomeBook => ({ ...book, coverUrl: covers.get(book.title) ?? null });
    },
  });

  return {
    popular: popular.map((item) => ({ ...item, book: coverOf(item.book) })),
    newArrivals: newArrivals.map((item) => ({ ...item, book: coverOf(item.book) })),
    popularQueries,
  };
}
