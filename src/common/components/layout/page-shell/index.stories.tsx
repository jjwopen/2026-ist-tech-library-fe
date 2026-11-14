import { Footer } from '../footer';
import { TopBar } from '../top-bar';

import { PageShell } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof PageShell> = {
  title: 'Common/Layout/PageShell',
  component: PageShell,
  parameters: { layout: 'fullscreen' },
  argTypes: { children: { control: false }, bottom: { control: false } },
};

export default meta;
type Story = StoryObj<typeof PageShell>;

export const WithFooter: Story = {
  args: {
    bottom: <Footer selected="search" />,
    children: (
      <>
        <TopBar>
          <span className="text-h2">화면 제목</span>
        </TopBar>
        <p className="text-body-lg text-sub py-10">콘텐츠</p>
      </>
    ),
  },
};
