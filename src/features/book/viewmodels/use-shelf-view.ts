import { useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { bookApi } from '../models';
import { bookKeys } from './query-keys';

/** S4 서가 정면 — 추천 책을 누르면 하단 패널이 추천 정보로 바뀜 */
export function useShelfView(bookId: string) {
  const { data: shelf } = useSuspenseQuery({
    queryKey: bookKeys.shelf(bookId),
    queryFn: () => bookApi.getShelfView(bookId),
  });
  const [selectedRank, setSelectedRank] = useState<number | null>(null);

  const selected = shelf?.recommendations.find((rec) => rec.rank === selectedRank) ?? null;

  return {
    shelf,
    selected,
    select: (rank: number) => setSelectedRank((prev) => (prev === rank ? null : rank)),
    clearSelection: () => setSelectedRank(null),
  };
}
