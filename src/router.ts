import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';

import { PendingPage } from '@/common/pages';

import { routeTree } from './routeTree.gen';

export const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPendingComponent: PendingPage,
  context: {
    queryClient,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
