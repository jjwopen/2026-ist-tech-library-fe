import { useSuspenseQuery } from '@tanstack/react-query';

import { bookApi, type Book, type FloorId } from '../models';
import { bookKeys } from './query-keys';

export type FloorMarker = { rank: number; x: number; y: number };

/** S3 층 평면도 — 찾는 책 위치와 추천 책 표시 */
export function useFloorPlan(floor: FloorId, bookId?: string) {
  const { data: plan } = useSuspenseQuery({
    queryKey: bookKeys.floorPlan(floor),
    queryFn: () => bookApi.getFloorPlan(floor),
  });
  const { data: target } = useSuspenseQuery({
    queryKey: bookKeys.detail(bookId ?? ''),
    queryFn: () => (bookId ? bookApi.getBook(bookId) : Promise.resolve(null)),
  });
  const { data: recommendations } = useSuspenseQuery({
    queryKey: bookKeys.recommendations(bookId ?? ''),
    queryFn: () => (bookId ? bookApi.getRecommendations(bookId) : Promise.resolve([])),
  });

  const targetOnFloor: Book | null = target && target.location.floor === floor ? target : null;
  const targetSpot = targetOnFloor && plan ? plan.shelves[targetOnFloor.location.shelf] : undefined;

  // 같은 서가의 추천은 찾는 책 옆에 "+N"으로 묶고, 나머지는 각 서가 위치에 순번으로 표시
  const sameShelfCount = recommendations.filter(
    (rec) => rec.book.location.shelf === targetOnFloor?.location.shelf,
  ).length;
  const recMarkers: FloorMarker[] = plan
    ? recommendations.flatMap((rec) => {
        const spot = plan.shelves[rec.book.location.shelf];
        if (!spot || rec.book.location.floor !== floor) return [];
        if (rec.book.location.shelf === targetOnFloor?.location.shelf) return [];
        return [{ rank: rec.rank, x: spot.x, y: spot.y }];
      })
    : [];

  return {
    plan,
    target: targetOnFloor,
    targetSpot,
    highlightColumn: targetSpot?.column,
    showRoute: !!targetOnFloor && !!plan?.routedShelves.includes(targetOnFloor.location.shelf),
    sameShelfCount,
    recMarkers,
  };
}
