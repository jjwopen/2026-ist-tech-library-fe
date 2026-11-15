import { withPrimo } from '../../styles/with-primo';
import { BookCard } from '../book-card';

import { Carousel } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const COLORS = ['#233552', '#2F5D4A', '#5B4A6E', '#4D5966', '#C9A23F', '#9A4A36'];

const meta: Meta<typeof Carousel> = {
  title: 'Book/Carousel',
  component: Carousel,
  decorators: [withPrimo],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Popular: Story = {
  render: () => (
    <Carousel label="이달의 인기 있는 책">
      {COLORS.map((color, i) => (
        <BookCard
          key={color}
          title={`책 ${i + 1}`}
          color={color}
          over={<b>{i + 1}</b>}
          meta="335번 서가"
        />
      ))}
    </Carousel>
  ),
};
