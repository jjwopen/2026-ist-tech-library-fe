import { type HTMLAttributes } from 'react';

import { Cover } from '../cover';

/** 목록 한 줄 — 작은 표지, 제목, 이유, 자리 */
export function BookRow({
  title,
  color,
  image,
  seed,
  why,
  meta,
  disabled,
  ...rest
}: BookRow.Props) {
  return (
    <li data-b data-r>
      <button type="button" className="p-row" disabled={disabled} {...rest}>
        <span>
          <Cover title={title} color={color} image={image} seed={seed} />
        </span>
        <span>
          <span className="row-title">{title}</span>
          {why && <span className="row-why">{why}</span>}
          {meta && <span className="row-meta">{meta}</span>}
        </span>
      </button>
    </li>
  );
}

export namespace BookRow {
  export type Props = Omit<HTMLAttributes<HTMLButtonElement>, 'title'> & {
    title: string;
    color: string;
    image?: string | null;
    seed?: string;
    /** 추천 이유 */
    why?: string;
    /** 자리 */
    meta?: string;
    disabled?: boolean;
  };
}
