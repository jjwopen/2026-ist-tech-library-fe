import { type FloorId } from '../models';

export const bookKeys = {
  all: ['book'] as const,
  detail: (id: string) => [...bookKeys.all, 'detail', id] as const,
  popular: () => [...bookKeys.all, 'popular'] as const,
  newArrivals: () => [...bookKeys.all, 'new-arrivals'] as const,
  search: (query: string) => [...bookKeys.all, 'search', query] as const,
  recommendations: (id: string) => [...bookKeys.all, 'recommendations', id] as const,
  floorPlan: (floor: FloorId) => [...bookKeys.all, 'floor-plan', floor] as const,
  shelf: (id: string) => [...bookKeys.all, 'shelf', id] as const,
};
