import { fileURLToPath } from 'node:url';

import { tanstackRouter } from '@tanstack/router-plugin/vite';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      tanstackRouter({
        autoCodeSplitting: true,
      }),
      tsconfigPaths({ projects: ['./tsconfig.json'] }),
      tailwindcss(),
      react(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        // API 스키마 경로에 /api 접두사가 포함돼 있어 경로를 그대로 전달
        '/api': {
          target: env.VITE_API_BASE_URL || 'https://postech-library-api.onrender.com',
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.removeHeader('origin');
              proxyReq.removeHeader('referer');
            });
            proxy.on('proxyRes', (proxyRes) => {
              const cookies = proxyRes.headers['set-cookie'];
              if (cookies) {
                proxyRes.headers['set-cookie'] = cookies.map((cookie) => {
                  return cookie
                    .replace(/Secure(; )?/, '')
                    .replace(/HttpOnly(; )?/, '')
                    .replace('Path=', 'Path=/api');
                });
              }
            });
          },
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // 패키지명을 정확히 매칭해야 react-i18next 등이 섞여 청크 간 순환 참조가 생기지 않음
            if (
              /[\\/]node_modules[\\/](react|react-dom|scheduler|use-sync-external-store)[\\/]/.test(
                id,
              )
            ) {
              return 'vendor-react';
            }
            if (/[\\/]node_modules[\\/]@tanstack[\\/]/.test(id)) {
              return 'vendor-tanstack';
            }
          },
        },
      },
    },
  };
});
