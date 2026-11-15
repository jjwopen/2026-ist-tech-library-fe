import { type RefObject, useLayoutEffect, useState } from 'react';

import { EASE, prefersReducedMotion } from '../motion';

/** 이번에 앱을 연 뒤 이미 보여줬는지 — 새로 고치면 다시 보여줌 */
let launchedThisLoad = false;

/** 글꼴을 이만큼까지만 기다림 */
const FONT_WAIT_MS = 1500;

/**
 * 앱 실행 — 서가에서 책 한 권을 찾아 뽑는 모습이 P가 되고, Primo와 소개 한 줄이 나온 뒤
 * 이름이 제자리로 가며 화면이 정돈됨. 화면을 누르거나 키를 누르면 건너뜀.
 * 앱을 열 때마다 한 번 (앱 안에서 홈으로 돌아올 때는 다시 하지 않음).
 * 글꼴이 준비된 뒤 이름 위치를 재야 하므로, 그동안 홈 내용은 감춰 둠 (pre)
 */
export function useLaunch({
  screenRef,
  brandRef,
  markRef,
  restRefs,
  brushRef,
  tagline,
}: {
  screenRef: RefObject<HTMLElement | null>;
  brandRef: RefObject<HTMLElement | null>;
  markRef: RefObject<SVGSVGElement | null>;
  restRefs: RefObject<HTMLElement | null>[];
  brushRef: RefObject<HTMLElement | null>;
  tagline: string;
}) {
  const [pre, setPre] = useState(() => !launchedThisLoad && !prefersReducedMotion());
  // 실행 중에는 스크롤·누르기를 막음 (클래스는 React가 관리해야 다시 그릴 때 사라지지 않음)
  const [launching, setLaunching] = useState(false);

  useLayoutEffect(() => {
    if (!pre) return;
    let cancelled = false;
    let stop: (() => void) | undefined;
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    Promise.race([fontsReady, new Promise((resolve) => setTimeout(resolve, FONT_WAIT_MS))]).then(
      () => {
        if (cancelled) return;
        launchedThisLoad = true;
        // 감춘 상태를 먼저 풀어야 이름 위치를 바로 잴 수 있음
        screenRef.current?.classList.remove('p-pre');
        setPre(false);
        setLaunching(true);
        stop = start();
      },
    );
    return () => {
      cancelled = true;
      stop?.();
    };
    // 처음 들어올 때 한 번
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { pre, launching };

  function start() {
    const screen = screenRef.current;
    const brand = brandRef.current;
    const mark = markRef.current;
    if (!screen || !brand || !mark) return undefined;

    window.scrollTo(0, 0);
    const animations: Animation[] = [];
    const A = (element: Element | null, frames: Keyframe[], options: KeyframeAnimationOptions) => {
      if (!element) return;
      animations.push(element.animate(frames, { fill: 'both', easing: EASE, ...options }));
    };

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const brandRect = brand.getBoundingClientRect();
    const cx = vw / 2;
    const cy = vh * 0.47;
    const T0 = `translate(${(cx - brandRect.left - brandRect.width / 2).toFixed(1)}px,${(cy - brandRect.top - brandRect.height / 2).toFixed(1)}px) scale(1.28)`;
    const q = (selector: string) => mark.querySelector(selector);
    const books = [...mark.querySelectorAll('.mk-n')];
    const letters = [...brand.querySelectorAll(':scope > span')];
    const GONE = 2250;
    const SCAN0 = 560;
    const SCAND = 560;
    const HIT = SCAN0 + SCAND;
    const GLIDE = 3500;
    const END = GLIDE + 820;

    const tag = document.createElement('p');
    tag.className = 'p-launch-tag';
    tag.textContent = tagline;
    tag.style.top = `${(cy + 46).toFixed(0)}px`;
    screen.appendChild(tag);

    // 1. 얇은 책들이 꽂힌 서가
    A(
      q('.mk-shelf'),
      [
        { opacity: 1, strokeDasharray: '22', strokeDashoffset: 22 },
        { opacity: 1, strokeDasharray: '22', strokeDashoffset: 0, offset: 0.16 },
        { opacity: 1, strokeDasharray: '22', strokeDashoffset: 0, offset: 0.86 },
        { opacity: 0, strokeDasharray: '22', strokeDashoffset: 0 },
      ],
      { duration: GONE + 300, delay: 60, easing: 'linear' },
    );
    books.forEach((book, i) => {
      const x = Number(book.getAttribute('x')) + Number(book.getAttribute('width')) / 2;
      const self = book.classList.contains('mk-self');
      const at = SCAN0 + ((x - 4) / 25.8) * SCAND;
      A(
        book,
        [
          { opacity: 0, transform: 'translateY(-3px)' },
          { opacity: 1, transform: 'none' },
        ],
        {
          duration: 300,
          delay: 140 + i * 45,
        },
      );
      // 2. 점이 책 윗면을 따라 달리고, 지나가는 책은 살짝 눌림
      if (x < 31) {
        A(
          book,
          [{ transform: 'none' }, { transform: 'translateY(-1.7px)' }, { transform: 'none' }],
          {
            duration: 300,
            delay: at - 110,
            easing: 'ease-in-out',
            fill: 'none',
          },
        );
      }
      A(book, [{ opacity: 1 }, { opacity: 0 }], {
        duration: self ? 160 : 420,
        delay: self ? HIT + 40 : GONE + i * 30,
        easing: 'ease-out',
        fill: 'forwards',
      });
    });
    A(
      q('.mk-dot'),
      [
        { opacity: 0, fill: '#1F1D1A', transform: 'translateX(-25.8px) scale(.8)' },
        { opacity: 1, fill: '#1F1D1A', transform: 'translateX(-25.8px) scale(.8)', offset: 0.08 },
        { opacity: 1, fill: '#1F1D1A', transform: 'translateX(0px) scale(.8)', offset: 0.74 },
        { opacity: 1, fill: '#A93A2A', transform: 'translateX(0px) scale(1.5)', offset: 0.87 },
        { opacity: 1, fill: '#A93A2A', transform: 'none' },
      ],
      { duration: SCAND / 0.66, delay: SCAN0 - (SCAND / 0.66) * 0.08, easing: 'linear' },
    );
    // 3. 멈춘 자리의 책이 위로 솟고, 파문이 자리를 알림
    A(
      q('.mk-stem'),
      [
        { opacity: 0, transform: 'scaleY(.5)' },
        { opacity: 1, transform: 'scaleY(.5)', offset: 0.12 },
        { opacity: 1, transform: 'none' },
      ],
      { duration: 560, delay: HIT },
    );
    A(
      q('.mk-ring'),
      [
        { opacity: 0, transform: 'scale(.2)' },
        { opacity: 1, transform: 'none' },
      ],
      {
        duration: 520,
        delay: HIT + 60,
      },
    );
    A(
      q('.mk-arc'),
      [
        { strokeDashoffset: 1, opacity: 0 },
        { strokeDashoffset: 1, opacity: 1, offset: 0.02 },
        { strokeDashoffset: 0, opacity: 1 },
      ],
      { duration: 560, delay: HIT + 180, easing: 'cubic-bezier(.3,0,.2,1)' },
    );
    // 4. 이름, 그리고 하는 일 한 줄. 이름이 제자리로 가면 한 줄은 사라짐
    letters.forEach((letter, i) =>
      A(
        letter,
        [
          { opacity: 0, filter: 'blur(7px)', transform: 'translateY(8px) scale(1.14)' },
          { opacity: 1, filter: 'blur(0px)', transform: 'none' },
        ],
        { duration: 640, delay: HIT + 200 + i * 85 },
      ),
    );
    A(
      tag,
      [
        { opacity: 0, filter: 'blur(5px)', transform: 'translate(-50%, 8px)' },
        { opacity: 1, filter: 'blur(0px)', transform: 'translate(-50%, 0)', offset: 0.22 },
        { opacity: 1, filter: 'blur(0px)', transform: 'translate(-50%, 0)', offset: 0.82 },
        { opacity: 0, filter: 'blur(4px)', transform: 'translate(-50%, -6px)' },
      ],
      { duration: 2350, delay: HIT + 480, easing: 'linear' },
    );
    A(
      brand,
      [
        { transform: T0 },
        { transform: T0, offset: GLIDE / END, easing: 'cubic-bezier(.6,0,.2,1)' },
        { transform: 'none' },
      ],
      { duration: END, easing: 'linear' },
    );
    restRefs.forEach((ref, i) =>
      A(
        ref.current,
        [
          { opacity: 0, filter: 'blur(4px)', transform: 'translateY(12px)' },
          { opacity: 1, filter: 'blur(0px)', transform: 'none' },
        ],
        { duration: 850, delay: GLIDE + 400 + i * 120 },
      ),
    );
    A(brushRef.current, [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], {
      duration: 760,
      delay: GLIDE + 580,
      easing: 'cubic-bezier(.3,0,.2,1)',
    });

    let done = false;
    const stop = () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      animations.forEach((animation) => animation.cancel());
      tag.remove();
      setLaunching(false);
      window.removeEventListener('pointerdown', stop, true);
      window.removeEventListener('keydown', stop, true);
    };
    // 끝나거나, 화면을 누르거나 키를 누르면 정리
    const timer = window.setTimeout(stop, END + 950);
    window.addEventListener('pointerdown', stop, true);
    window.addEventListener('keydown', stop, true);
    return stop;
  }
}
