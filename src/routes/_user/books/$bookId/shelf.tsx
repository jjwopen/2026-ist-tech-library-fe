import { createFileRoute } from '@tanstack/react-router';

import { ShelfPage } from '@/features/book';

export const Route = createFileRoute('/_user/books/$bookId/shelf')({
  component: RouteComponent,
});

function RouteComponent() {
  const { bookId } = Route.useParams();
  return <ShelfPage key={bookId} bookId={bookId} />;
}
