import { createFileRoute } from '@tanstack/react-router';

import { SearchPage } from '@/features/book';

export const Route = createFileRoute('/_user/search')({
  validateSearch: (search: Record<string, unknown>): { q?: string } => ({
    q: typeof search.q === 'string' && search.q ? search.q : undefined,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { q = '' } = Route.useSearch();
  return <SearchPage query={q} />;
}
