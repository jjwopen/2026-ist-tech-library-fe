import { createFileRoute } from '@tanstack/react-router';

import { RecommendationPage } from '@/features/book';

export const Route = createFileRoute('/_user/books/$bookId/recommendations')({
  component: RouteComponent,
});

function RouteComponent() {
  const { bookId } = Route.useParams();
  return <RecommendationPage bookId={bookId} />;
}
