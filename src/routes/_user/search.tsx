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
  // 검색어가 바뀌면 입력창 상태를 새로 시작
  return <SearchPage key={q} query={q} />;
}
