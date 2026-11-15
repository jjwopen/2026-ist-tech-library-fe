import createFetchClient from 'openapi-fetch';
import createQueryClient from 'openapi-react-query';

import { type paths } from '@/@types/api-schema';

// let refreshPromise: ReturnType<
//   typeof api.POST<
//     ApiPaths.AuthController_refresh,
//     MaybeOptionalInit<paths[ApiPaths.AuthController_refresh], 'post'>
//   >
// > | null = null;

// const middleware: Middleware = {
//   async onRequest({ request }) {
//   },
//   async onResponse({ request, response, options }) {
//   },
// };

// 백엔드가 CORS를 허용하지 않아 같은 출처의 /api로 요청하고 프록시로 전달
// (개발: vite.config.ts server.proxy, 배포: vercel.json rewrites)
export const api = createFetchClient<paths>({
  baseUrl: '',
  credentials: 'include',
});
// api.use(middleware);

export const $api = createQueryClient(api);
