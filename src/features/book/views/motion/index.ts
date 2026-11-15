/** Primo 움직임 공통 — 먹이 종이에 스미듯 */

export const EASE = 'cubic-bezier(.16,1,.3,1)';

/**
 * 기기의 '움직임 줄이기' 설정을 따를지. 디자인 프로토타입에 맞춰 지금은 끔(항상 움직임 재생).
 * true로 바꾸면 움직임 줄이기 사용자에게는 애니메이션 없이 바로 보여줌
 */
const RESPECT_REDUCED_MOTION = false;

export const prefersReducedMotion = () =>
  RESPECT_REDUCED_MOTION &&
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 움직임 줄이기면 0 */
export const D = (ms: number) => (prefersReducedMotion() ? 0 : ms);

/** 번지며 나타남: 흐림과 살짝 떠오름 — 먹이 종이에 가라앉는 느낌 */
export function bleed(elements: Iterable<Element>, base = 0, step = 70) {
  if (prefersReducedMotion()) return;
  [...elements].forEach((element, index) =>
    element.animate(
      [
        { opacity: 0, filter: 'blur(4px)', transform: 'translateY(8px)' },
        { opacity: 1, filter: 'blur(0px)', transform: 'none' },
      ],
      { duration: 950, delay: base + index * step, easing: EASE, fill: 'backwards' },
    ),
  );
}

/** 끝난 상태를 인라인 스타일로 남기는 애니메이션 */
export async function run(
  element: HTMLElement,
  frames: Keyframe[],
  options: KeyframeAnimationOptions,
) {
  const animation = element.animate(frames, { fill: 'forwards', ...options });
  try {
    await animation.finished;
  } catch {
    // 취소됨
  }
  try {
    animation.commitStyles();
  } catch {
    // 화면에 없음
  }
  animation.cancel();
}

/** (x, y)에서 화면 네 모서리까지 가장 먼 거리 */
export const reach = (x: number, y: number) =>
  Math.max(
    Math.hypot(x, y),
    Math.hypot(window.innerWidth - x, y),
    Math.hypot(x, window.innerHeight - y),
    Math.hypot(window.innerWidth - x, window.innerHeight - y),
  );

/**
 * 먹이 (x, y)에서 번져 나가며 그 뒤로 종이(element)가 보임. open=false면 거꾸로 닫힘.
 * 가장자리는 부드럽게 흐려 먹이 스민 경계처럼
 */
export function sweep(element: HTMLElement, x: number, y: number, open: boolean, duration: number) {
  return new Promise<void>((done) => {
    const setMask = (value: string) => {
      element.style.maskImage = value;
      element.style.setProperty('-webkit-mask-image', value);
    };
    const end = () => {
      setMask('');
      done();
    };
    if (prefersReducedMotion()) return end();

    const max = reach(x, y);
    const width = (r: number) => 46 + r * 0.22;
    const start = performance.now();
    const R0 = 22;
    const Rmax = max + width(max);

    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const smooth = t * t * (3 - 2 * t);
      const r = open ? R0 + (Rmax - R0) * smooth : Rmax * (1 - smooth);
      const w = width(r);
      const r1 = Math.max(0, r - w * 0.18);
      const r0 = Math.max(0, r1 - w * 0.95);
      setMask(
        `radial-gradient(circle at ${x.toFixed(1)}px ${y.toFixed(1)}px, #000 ${r0.toFixed(1)}px, rgba(0,0,0,0) ${r1.toFixed(1)}px)`,
      );
      if (t < 1) requestAnimationFrame(frame);
      else if (open) end();
      else done();
    };
    requestAnimationFrame(frame);
  });
}

/** 손끝 자리에 먹 점이 번지는 효과 레이어 */
export function inkAt(x: number, y: number) {
  const layer = document.createElement('div');
  layer.className = 'p-inkfx';
  layer.style.setProperty('--x', `${x}px`);
  layer.style.setProperty('--y', `${y}px`);
  document.body.appendChild(layer);

  const dot = document.createElement('i');
  dot.className = 'dot';
  layer.appendChild(dot);
  if (!prefersReducedMotion()) {
    dot.animate(
      [
        { transform: 'scale(.15)', opacity: 0 },
        { transform: 'scale(1)', opacity: 1 },
      ],
      { duration: 520, easing: 'ease-out', fill: 'forwards' },
    );
    // 물결 두 겹이 퍼져 나감
    [0, 160].forEach((delay, index) => {
      const ring = document.createElement('i');
      ring.className = 'ring';
      ring.style.setProperty('--d', `${index ? 200 : 140}px`);
      layer.appendChild(ring);
      ring.animate(
        [
          { transform: 'scale(.12) rotate(0deg)', opacity: 0 },
          { opacity: 0.8, offset: 0.22 },
          { transform: 'scale(1) rotate(24deg)', opacity: 0 },
        ],
        { duration: 900, delay, easing: 'cubic-bezier(.2,.6,.3,1)', fill: 'both' },
      );
    });
  } else {
    dot.style.transform = 'scale(1)';
  }

  return {
    /** 먹이 종이로 스며들며 사라짐 */
    release() {
      const fade = layer.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: D(260),
        fill: 'forwards',
      });
      fade.onfinish = () => layer.remove();
    },
  };
}
