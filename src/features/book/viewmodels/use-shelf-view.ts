import { useState } from 'react';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { bookQueries } from './book-queries';

export type ShelfMarker = { rank: number; slot: number; column: number };

/** S4 서가 정면 — 같은 서가·면의 추천 책을 칸 위에 표시, 누르면 하단 패널이 추천 정보로 바뀜 */
export function useShelfView(bookId: string) {
  const { data: book } = useSuspenseQuery(bookQueries.detail(bookId));
  // 추천은 응답이 느려 화면을 막지 않고 뒤에서 불러옴
  const { data: recommendations = [] } = useQuery({
    ...bookQueries.recommendations(book.isbn ?? ''),
    enabled: !!book.isbn,
  });
  const [selectedRank, setSelectedRank] = useState<number | null>(null);

  const location = book.location;
  const recMarkers: ShelfMarker[] = recommendations.flatMap((rec) => {
    const recLocation = rec.book?.location;
    if (
      !location ||
      !recLocation ||
      recLocation.floor !== location.floor ||
      recLocation.shelf !== location.shelf ||
      recLocation.side !== location.side
    ) {
      return [];
    }
    return [{ rank: rec.rank, slot: recLocation.slot, column: recLocation.column }];
  });

  return {
    book,
    recommendations,
    recMarkers,
    selected: recommendations.find((rec) => rec.rank === selectedRank) ?? null,
    select: (rank: number) => setSelectedRank((prev) => (prev === rank ? null : rank)),
    clearSelection: () => setSelectedRank(null),
  };
}
