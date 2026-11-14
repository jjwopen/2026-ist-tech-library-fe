import { createFileRoute } from '@tanstack/react-router';

import { HomePage } from '@/features/book';

export const Route = createFileRoute('/_user/')({
  component: HomePage,
});
