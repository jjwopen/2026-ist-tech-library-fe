import { type RefObject, useEffect, useState } from 'react';

/** 큰 제목이 스크롤로 상단 바 뒤로 넘어가면 true — 상단 바가 작은 제목을 이어받음 */
export function useStuck(markRef: RefObject<HTMLElement | null>) {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const update = () => {
      const mark = markRef.current;
      setStuck(!!mark && mark.getBoundingClientRect().bottom < 64);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [markRef]);

  return stuck;
}
