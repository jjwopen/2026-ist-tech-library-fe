import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { type FloorId } from '../models';
import { bookQueries } from './book-queries';

export type FloorMarker = { label: string; x: number; y: number };

/** S3 층 도면 — 둘러보기 */
export function useFloorMap(floor: FloorId) {
  const { data: maps } = useSuspenseQuery(bookQueries.floorMaps());
  return { map: maps[floor] ?? null };
}

/**
 * S3 층 도면 — 찾는 책 서가와 추천 책 서가 표시.
 * 층을 지정하지 않으면 책이 있는 층을 보여줌
 */
export function useFloorTarget(bookId: string, floor?: FloorId) {
  const { data: maps } = useSuspenseQuery(bookQueries.floorMaps());
  const { data: book } = useSuspenseQuery(bookQueries.detail(bookId));
  // 추천은 응답이 느려 도면을 먼저 보여주고 뒤에서 불러옴
  const { data: recommendations = [] } = useQuery({
    ...bookQueries.recommendations(book.isbn ?? ''),
    enabled: !!book.isbn,
  });

  const currentFloor = floor ?? book.location?.floor ?? '3F';
  const map = maps[currentFloor] ?? null;
  const onFloor = book.location?.floor === currentFloor;
  const targetId = onFloor ? book.location?.mapElementId : null;
  const targetSpot = targetId ? map?.shelves[targetId] : undefined;

  // 같은 서가의 추천은 찾는 책 옆에 "+N"으로 묶고, 나머지는 서가별로 순번을 모아 표시
  let sameShelfCount = 0;
  const byShelf = new Map<string, number[]>();
  for (const rec of recommendations) {
    const id = rec.book?.location?.mapElementId;
    if (!id || rec.book?.location?.floor !== currentFloor) continue;
    if (id === targetId) {
      sameShelfCount += 1;
      continue;
    }
    byShelf.set(id, [...(byShelf.get(id) ?? []), rec.rank]);
  }
  const recMarkers: FloorMarker[] = [...byShelf].flatMap(([id, ranks]) => {
    const spot = map?.shelves[id];
    return spot ? [{ label: ranks.join(','), ...spot }] : [];
  });

  return {
    book,
    floor: currentFloor,
    map,
    onFloor,
    target:
      targetId && targetSpot
        ? { id: targetId, shelf: book.location!.shelf, ...targetSpot }
        : undefined,
    recShelfIds: [...byShelf.keys()],
    sameShelfCount,
    recMarkers,
  };
}
