import { withThemeByDataAttribute } from '@storybook/addon-themes';

import { Suspense } from 'react';
import type { Preview } from '@storybook/react-vite';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterContextProvider } from '@tanstack/react-router';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import { queryClient, router } from '../src/router';

import { withLocale } from './decorators';

import '../src/styles.css';

const preview: Preview = {
  globalTypes: {
    locale: {
      description: 'i18n locale',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'ko', title: '한국어' },
          { value: 'en', title: 'English' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    locale: 'ko',
    viewport: { value: 'iphone12', isRotated: false },
  },
  parameters: {
    viewport: { options: INITIAL_VIEWPORTS },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
    withLocale,
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <RouterContextProvider router={router}>
          <Suspense fallback={null}>
            <Story />
          </Suspense>
        </RouterContextProvider>
      </QueryClientProvider>
    ),
  ],
};

export default preview;
