import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';

import { type FloorId } from '../models';
import { bookQueries } from './book-queries';

export type FloorMarker = { rank: number; x: number; y: number };

/** 찾는 책의 평면도 표시 위치 */
export type FloorTarget = { x: number; y: number; shelf: number; column: number };

/** S3 층 평면도 — 평면도만 조회 (둘러보기) */
export function useFloorPlan(floor: FloorId) {
  const { data: plan } = useSuspenseQuery(bookQueries.floorPlan(floor));
  return { plan };
}

/** S3 층 평면도 — 찾는 책 위치와 추천 책 표시 */
export function useFloorTarget(floor: FloorId, bookId: string) {
  const [{ data: plan }, { data: book }, { data: recommendations }] = useSuspenseQueries({
    queries: [
      bookQueries.floorPlan(floor),
      bookQueries.detail(bookId),
      bookQueries.recommendations(bookId),
    ],
  });

  const onFloor = book.location.floor === floor;
  const spot = onFloor ? plan?.shelves[book.location.shelf] : undefined;
  const target: FloorTarget | undefined = spot && { ...spot, shelf: book.location.shelf };

  // 같은 서가의 추천은 찾는 책 옆에 "+N"으로 묶고, 나머지는 각 서가 위치에 순번으로 표시
  const sameShelfCount = target
    ? recommendations.filter((rec) => rec.book.location.shelf === target.shelf).length
    : 0;
  const recMarkers: FloorMarker[] = recommendations.flatMap((rec) => {
    const recSpot = plan?.shelves[rec.book.location.shelf];
    if (!recSpot || rec.book.location.floor !== floor || rec.book.location.shelf === target?.shelf)
      return [];
    return [{ rank: rec.rank, x: recSpot.x, y: recSpot.y }];
  });

  return {
    plan,
    book: onFloor ? book : null,
    target,
    sameShelfCount,
    recMarkers,
    showRoute: !!target && !!plan?.routedShelves.includes(target.shelf),
  };
}
