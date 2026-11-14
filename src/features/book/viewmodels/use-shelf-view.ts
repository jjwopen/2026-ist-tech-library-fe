import { useState } from 'react';

import { useSuspenseQueries } from '@tanstack/react-query';

import { bookQueries } from './book-queries';

/** S4 서가 정면 — 추천 책을 누르면 하단 패널이 추천 정보로 바뀜 */
export function useShelfView(bookId: string) {
  const [{ data: shelf }, { data: recommendations }] = useSuspenseQueries({
    queries: [bookQueries.shelf(bookId), bookQueries.recommendations(bookId)],
  });
  const [selectedRank, setSelectedRank] = useState<number | null>(null);

  return {
    shelf,
    recommendations,
    selected: recommendations.find((rec) => rec.rank === selectedRank) ?? null,
    select: (rank: number) => setSelectedRank((prev) => (prev === rank ? null : rank)),
    clearSelection: () => setSelectedRank(null),
  };
}
