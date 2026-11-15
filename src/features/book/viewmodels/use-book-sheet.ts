import { useQuery } from '@tanstack/react-query';

import { type Book, type FloorId } from '../models';
import { bookQueries } from './book-queries';
import { useSimilarBooks } from './use-similar-books';

/** 시트에 펼칠 책 — 검색 결과의 책이거나, 홈 목업 책이면 제목으로 찾은 첫 결과 */
export type SheetSource = { book: Book } | { title: string };

/** 책 정보 시트 — 책, 소개(목업), 비슷한 책, 층 도면 */
export function useBookSheet(source: SheetSource | null) {
  const title = source && 'title' in source ? source.title : '';
  const { data: found = null, status: findStatus } = useQuery({
    ...bookQueries.byTitle(title),
    enabled: !!title,
  });
  const book = source && 'book' in source ? source.book : found;

  const { data: intro = null } = useQuery(bookQueries.intro(book));
  const { recommendations, loading: recsLoading } = useSimilarBooks(book?.isbn);
  const { data: floorMaps } = useQuery({ ...bookQueries.floorMaps(), enabled: !!book?.location });

  return {
    book,
    /** 제목으로 찾는 중 / 찾지 못함 */
    status: book ? 'ready' : findStatus === 'pending' ? 'pending' : 'missing',
    intro,
    recommendations,
    recsLoading,
    floorMap: book?.location ? (floorMaps?.[book.location.floor as FloorId] ?? null) : null,
  } as const;
}
