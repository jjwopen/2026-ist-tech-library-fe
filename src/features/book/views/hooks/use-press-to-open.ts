import { type MouseEvent, type PointerEvent, useEffect, useLayoutEffect, useRef } from 'react';

import { inkAt } from '../motion';

export type PressOrigin = {
  x: number;
  y: number;
  element: HTMLElement;
  /** 누르는 동안 번진 먹 — 시트가 열릴 때 종이로 스며들게 함 */
  ink?: ReturnType<typeof inkAt>;
};

const HOLD_MS = 520;

/**
 * 표지 꾹 누르기 — 손끝에서 먹이 번지고 520ms 지나면 열림.
 * 마우스는 클릭으로 바로, 키보드(Enter)는 표지 가운데에서 열림. 짧게 톡 누르면 onShortTap
 */
export function usePressToOpen<T>({
  onOpen,
  onShortTap,
}: {
  onOpen: (payload: T, origin: PressOrigin) => void;
  onShortTap?: () => void;
}) {
  const press = useRef<{
    payload: T;
    element: HTMLElement;
    x: number;
    y: number;
    type: string;
    timer: number;
    ink: ReturnType<typeof inkAt>;
  } | null>(null);
  const handlers = useRef({ onOpen, onShortTap });
  useLayoutEffect(() => {
    handlers.current = { onOpen, onShortTap };
  });

  useEffect(() => {
    const finish = (open: boolean) => {
      const current = press.current;
      if (!current) return;
      press.current = null;
      clearTimeout(current.timer);
      current.element.classList.remove('pressing');
      if (open) {
        const { payload, x, y, element, ink } = current;
        handlers.current.onOpen(payload, { x, y, element, ink });
      } else {
        current.ink.release();
      }
    };
    const up = () => {
      const current = press.current;
      if (!current) return;
      if (current.type === 'mouse') finish(true);
      else {
        finish(false);
        handlers.current.onShortTap?.();
      }
    };
    const cancel = () => finish(false);
    const move = (event: globalThis.PointerEvent) => {
      const current = press.current;
      if (current && Math.hypot(event.clientX - current.x, event.clientY - current.y) > 10)
        finish(false);
    };
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', cancel);
    window.addEventListener('pointermove', move);
    return () => {
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', cancel);
      window.removeEventListener('pointermove', move);
      finish(false);
    };
  }, []);

  return (payload: T) => ({
    onPointerDown: (event: PointerEvent<HTMLButtonElement>) => {
      if (event.button > 0 || press.current) return;
      const element = event.currentTarget;
      element.classList.add('pressing');
      const ink = inkAt(event.clientX, event.clientY);
      press.current = {
        payload,
        element,
        x: event.clientX,
        y: event.clientY,
        type: event.pointerType,
        ink,
        timer: window.setTimeout(() => {
          const current = press.current;
          if (!current) return;
          press.current = null;
          current.element.classList.remove('pressing');
          handlers.current.onOpen(current.payload, {
            x: current.x,
            y: current.y,
            element: current.element,
            ink: current.ink,
          });
        }, HOLD_MS),
      };
    },
    onContextMenu: (event: MouseEvent) => event.preventDefault(),
    // 키보드로 누른 클릭(detail 0)은 표지 가운데에서 열림
    onClick: (event: MouseEvent<HTMLButtonElement>) => {
      if (event.detail !== 0) return;
      const rect = event.currentTarget.getBoundingClientRect();
      handlers.current.onOpen(payload, {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        element: event.currentTarget,
      });
    },
  });
}
