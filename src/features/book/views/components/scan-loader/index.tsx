import { useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import { prefersReducedMotion } from '../../motion';

type Spine = { x: number; w: number; h: number; lean: number };

/** 얇은 책등이 이어진 서가 한 줄 (늘 같은 모양이 되도록 고정 시드) */
const SPINES: Spine[] = (() => {
  const spines: Spine[] = [];
  let x = 14;
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  while (x < 216) {
    const w = 6 + Math.round(rnd() * 6);
    const h = 27 + Math.round(rnd() * 19);
    const lean = spines.length === 5 || spines.length === 15 ? 9 : 0;
    if (lean) x += 5.5;
    spines.push({ x, w, h, lean });
    x += w + 1.4;
  }
  return spines;
})();
const FOUND = 12;

/**
 * 찾는 중 — 손끝이 책등 위를 훑고 지나가면 책이 살짝 들리고,
 * 찾은 책이 위로 솟으며 그 자리에 파문이 퍼짐
 */
export function ScanLoader({ query }: ScanLoader.Props) {
  const { t } = useTranslation('book');
  const svgRef = useRef<SVGSVGElement>(null);
  const tipRef = useRef<SVGCircleElement>(null);
  // 움직임 줄이기면 처음부터 찾은 상태
  const [found, setFound] = useState(prefersReducedMotion);
  const [message, setMessage] = useState(0);
  const messages = [t('loading.step1'), t('loading.step2'), t('loading.step3')];

  useEffect(() => {
    const timer = setInterval(() => setMessage((m) => (m + 1) % 3), 850);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    const tip = tipRef.current;
    if (!svg || !tip || prefersReducedMotion()) return;
    const books = [...svg.querySelectorAll<SVGGElement>('.sc-b')];
    const target = SPINES[FOUND];
    const fx = target.x + target.w / 2;
    const start = performance.now();
    const x0 = 8;
    let ty = 70 - SPINES[0].h - 7;
    let raf = 0;

    const step = (now: number) => {
      const t = Math.min(1, (now - start - 220) / 1450);
      const e = t <= 0 ? 0 : t < 0.5 ? 2 * t * t : 1 - (2 - 2 * t) ** 2 / 2;
      const sx = x0 + (fx - x0) * e;
      // 손끝은 책등 윗면을 타고 가고, 지나가는 책은 손에 눌린 듯 조금씩 들림
      const under = SPINES.find((b) => sx < b.x + b.w + 0.8) ?? target;
      ty += (70 - under.h - 7 - ty) * 0.22;
      tip.setAttribute('transform', `translate(${sx.toFixed(1)} ${ty.toFixed(1)})`);
      books.forEach((book, i) => {
        const d = (SPINES[i].x + SPINES[i].w / 2 - sx) / 11;
        const k = t <= 0 ? 0 : Math.exp(-d * d);
        book.style.transform = k > 0.02 ? `translateY(${(-4.5 * k).toFixed(2)}px)` : '';
      });
      if (t < 1) raf = requestAnimationFrame(step);
      else {
        books.forEach((book) => (book.style.transform = ''));
        setFound(true);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const target = SPINES[FOUND];

  return (
    <div className="p-writing" aria-live="polite">
      <svg ref={svgRef} className={cn('p-scan', found && 'found')} viewBox="0 0 240 84" aria-hidden>
        <path className="sc-shelf" d="M8 70.5H232" />
        {SPINES.map((b, i) => (
          <g key={i} className={cn('sc-b', i === FOUND && 'sc-f')}>
            <g transform={b.lean ? `rotate(${-b.lean} ${b.x + b.w} 70)` : undefined}>
              <rect x={b.x} y={70 - b.h} width={b.w} height={b.h} />
              <path
                className="sc-l"
                d={`M${b.x + 1.2} 60.5h${b.w - 2.4}M${b.x + 1.2} 64.5h${b.w - 2.4}`}
              />
            </g>
          </g>
        ))}
        <g
          className="sc-here"
          transform={`translate(${target.x + target.w / 2} ${70 - target.h - 19})`}
        >
          <circle className="p-wave" r="13" />
          <circle className="p-wave" r="13" />
          <circle className="p-wave" r="13" />
          <circle className="sc-dot" r="2.4" />
        </g>
        <circle ref={tipRef} className="sc-tip" r="3.2" />
      </svg>
      <p className="wq">‘{query}’</p>
      <span className="wtext">{t('loading.title')}</span>
      <span className="wline p-brush" aria-hidden />
      <p className="wstat">{messages[message]}</p>
    </div>
  );
}

export namespace ScanLoader {
  export type Props = {
    query: string;
  };
}
