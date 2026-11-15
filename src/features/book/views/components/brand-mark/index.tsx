import { forwardRef } from 'react';

import { cn } from '@/common/utils';

/**
 * Primo의 P — 찾은 책의 책등과, 그 자리를 알리는 파문이 P를 만듦.
 * 실행 애니메이션에서 서가(mk-shelf·mk-n)와 손끝(mk-dot)이 함께 움직임
 */
export const BrandMark = forwardRef<SVGSVGElement, BrandMark.Props>(function BrandMark(
  { withShelf = false, className },
  ref,
) {
  return (
    <svg ref={ref} viewBox="0 0 48 48" aria-hidden className={cn('p-mark', className)}>
      {withShelf && (
        <>
          <path className="mk-shelf" d="M3 40.5H25" />
          <rect className="mk-n" x="4.2" y="24" width="3.4" height="16.5" />
          <rect className="mk-n" x="8.5" y="27.5" width="4.2" height="13" />
          <rect className="mk-n" x="13.6" y="22.5" width="3" height="18" />
          <rect className="mk-n mk-self" x="17.4" y="25" width="6.6" height="15.5" />
        </>
      )}
      <g className="mk-stem">
        <rect x="17.4" y="8.5" width="6.6" height="3.9" rx=".5" />
        <rect x="17.4" y="13.3" width="6.6" height="22.1" />
        <rect x="17.4" y="36.3" width="6.6" height="4.2" rx=".5" />
      </g>
      <path className="mk-arc" pathLength={1} d="M24 11.3A9.5 9.5 0 1 1 24 26.3" />
      <circle className="mk-ring" cx="29.8" cy="18.8" r="5" />
      <circle className="mk-dot" cx="29.8" cy="18.8" r="1.9" />
    </svg>
  );
});

export namespace BrandMark {
  export type Props = {
    /** 실행 애니메이션용 서가·책 도형 포함 */
    withShelf?: boolean;
    className?: string;
  };
}
