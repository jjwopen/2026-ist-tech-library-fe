import { createFileRoute } from '@tanstack/react-router';

import { FLOORS, FloorPage, type FloorId } from '@/features/book';

const isFloor = (value: unknown): value is FloorId => FLOORS.includes(value as FloorId);

export const Route = createFileRoute('/_user/floor')({
  validateSearch: (search: Record<string, unknown>): { floor?: FloorId; bookId?: string } => ({
    floor: isFloor(search.floor) ? search.floor : undefined,
    bookId: typeof search.bookId === 'string' ? search.bookId : undefined,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { floor = '3F', bookId } = Route.useSearch();
  return <FloorPage floor={floor} bookId={bookId} />;
}
