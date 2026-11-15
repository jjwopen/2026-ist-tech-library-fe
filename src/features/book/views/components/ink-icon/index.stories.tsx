import { withPrimo } from '../../styles/with-primo';

import { InkIcon } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof InkIcon> = {
  title: 'Book/InkIcon',
  component: InkIcon,
  decorators: [withPrimo],
};

export default meta;
type Story = StoryObj<typeof InkIcon>;

export const All: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20 }}>
      {(['back', 'close', 'search', 'arrow', 'shelf'] as const).map((name) => (
        <InkIcon key={name} name={name} />
      ))}
    </div>
  ),
};
