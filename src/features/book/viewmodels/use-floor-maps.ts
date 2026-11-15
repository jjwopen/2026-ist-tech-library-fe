import { useQuery } from '@tanstack/react-query';

import { bookQueries } from './book-queries';

/** 층별 도면 (공식 서가맵 SVG를 정리한 것) */
export function useFloorMaps() {
  const { data: maps } = useQuery(bookQueries.floorMaps());
  return { maps };
}
