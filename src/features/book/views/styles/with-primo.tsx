import { type Decorator } from '@storybook/react-vite';

import './primo.css';

/** 스토리를 한지 테마 위에 올려 보여줌 */
export const withPrimo: Decorator = (Story) => (
  <div className="primo-theme primo" style={{ minHeight: 0, padding: 28 }}>
    <Story />
  </div>
);
