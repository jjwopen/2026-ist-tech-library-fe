import { type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/common/utils';

import { Cover } from '../cover';

/**
 * 표지 카드 — S(홈 가로 목록: 위에 순위·입고일), M(검색 결과: 아래에 자리·대출 상태).
 * 표지를 꾹 누르면 책 정보가 열림 (pressProps)
 */
export function BookCard({
  title,
  author,
  publisher,
  color,
  image,
  seed,
  over,
  meta,
  status,
  loan,
  pressProps,
  className,
  ...rest
}: BookCard.Props) {
  return (
    <article className={cn('p-book', loan && 'loan', className)} {...rest}>
      {over !== undefined && <p className="b-over">{over}</p>}
      <button type="button" className="p-cover-btn" {...pressProps}>
        <Cover
          title={title}
          author={author}
          publisher={publisher}
          color={color}
          image={image}
          seed={seed}
        />
      </button>
      <h3 className="b-title">{title}</h3>
      {meta && <p className="b-meta">{meta}</p>}
      {status}
    </article>
  );
}

export namespace BookCard {
  export type Props = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
    title: string;
    author?: string;
    publisher?: string | null;
    color: string;
    image?: string | null;
    seed?: string;
    /** 표지 위 — 순위나 입고일 */
    over?: ReactNode;
    /** 표지 아래 — 자리 */
    meta?: ReactNode;
    /** 대출 상태 표시 */
    status?: ReactNode;
    /** 대출 중이면 표지를 옅게 */
    loan?: boolean;
    /** 표지 버튼에 붙일 누르기 핸들러 */
    pressProps?: HTMLAttributes<HTMLButtonElement> & { 'aria-label'?: string };
  };
}

/** 대출 상태 — 채운 점(가능) / 빈 점(그 외) */
export function BookStatus({ label, available }: { label: string; available: boolean }) {
  return (
    <p className={cn('b-status', !available && 'off')}>
      <i />
      {label}
    </p>
  );
}
