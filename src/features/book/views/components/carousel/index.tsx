import { type ReactNode, useEffect, useRef } from 'react';

/** 가로로 넘기는 표지 목록 + 아래 진행 막대 */
export function Carousel({ children, label }: Carousel.Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const thumb = thumbRef.current;
    if (!list || !thumb) return;
    const update = () => {
      const fraction = list.clientWidth / list.scrollWidth;
      const max = list.scrollWidth - list.clientWidth;
      thumb.style.width = `${(fraction * 100).toFixed(1)}%`;
      thumb.style.transform = `translateX(${(max > 0 ? ((list.scrollLeft / max) * (1 - fraction)) / fraction : 0) * 100}%)`;
    };
    update();
    list.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      list.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [children]);

  return (
    <>
      <div ref={listRef} className="p-carousel" role="list" aria-label={label}>
        {children}
      </div>
      <span className="p-prog" aria-hidden>
        <i ref={thumbRef} />
      </span>
    </>
  );
}

export namespace Carousel {
  export type Props = {
    children: ReactNode;
    label?: string;
  };
}
