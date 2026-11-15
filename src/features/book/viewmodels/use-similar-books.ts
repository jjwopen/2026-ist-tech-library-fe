import { useQuery } from '@tanstack/react-query';

import { bookQueries } from './book-queries';

/** 비슷한 책 (AI 추천) — 응답이 느려 화면을 막지 않고 뒤에서 불러옴 */
export function useSimilarBooks(isbn: string | null | undefined) {
  const { data = [], isPending } = useQuery({
    ...bookQueries.recommendations(isbn ?? ''),
    enabled: !!isbn,
  });
  return { recommendations: data, loading: !!isbn && isPending };
}
