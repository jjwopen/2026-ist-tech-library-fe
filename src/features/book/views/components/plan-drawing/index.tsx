import { useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';

import { type FloorMap } from '../../../viewmodels';
import { D, prefersReducedMotion } from '../../motion';

const W = 334;
/** 서가는 낮게, 찾는 서가는 높이 세워 그림 (평행 투시) */
const LOW = 3.2;
const HIGH = 12;

const f1 = (n: number) => n.toFixed(1);

/** 선분 서가를 위로 h만큼 세운 벽면과 윗선 */
const wallPath = ([x1, y1, x2, y2]: number[], h: number) =>
  `M ${f1(x1)} ${f1(y1)} L ${f1(x2)} ${f1(y2)} L ${f1(x2)} ${f1(y2 - h)} L ${f1(x1)} ${f1(y1 - h)} Z`;
const topPath = ([x1, y1, x2, y2]: number[], h: number) =>
  `M ${f1(x1)} ${f1(y1 - h)} L ${f1(x2)} ${f1(y2 - h)}`;

/**
 * 층 평면도 — 도서관 서가맵을 바탕으로, 서가를 책가도처럼 평행 투시로 살짝 세워 그림.
 * 찾는 서가는 높이 솟고 그 위로 파문, 인주 점과 '여기'가 찍힘. 아래로 늘어진 실은 서가 그림으로 이어짐
 */
export function PlanDrawing({ map, targetId, floorLabel }: PlanDrawing.Props) {
  const { t } = useTranslation('book');
  const svgRef = useRef<SVGSVGElement>(null);
  const k = W / map.viewBox.width;
  const H = map.viewBox.height * k;

  const shelves = Object.entries(map.shelves)
    .filter(([, shelf]) => shelf.segment)
    .map(([id, shelf]) => ({
      id,
      v: shelf.segment!.map((n, i) => (n - (i % 2 ? map.viewBox.y : map.viewBox.x)) * k),
    }))
    // 아래쪽(앞쪽) 서가가 위를 덮도록 y 순으로
    .sort((a, b) => Math.max(a.v[1], a.v[3]) - Math.max(b.v[1], b.v[3]));
  const target = targetId ? map.shelves[targetId] : undefined;
  const tx = target ? (target.x - map.viewBox.x) * k : 0;
  const ty = target ? (target.y - map.viewBox.y) * k : 0;

  // 찾는 서가가 솟아오르고, 파문·점·글자가 차례로 나타남
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.querySelectorAll<SVGElement>('[data-pop]').forEach((element) =>
      element.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: D(400),
        delay: D(+element.dataset.pop!),
        fill: 'backwards',
      }),
    );
    const rise = svg.querySelector<SVGGElement>('[data-rise]');
    if (!rise || prefersReducedMotion()) return;
    const v = rise.dataset.rise!.split(' ').map(Number);
    const wall = rise.querySelector('.shw')!;
    const top = rise.querySelector('.sh')!;
    const set = (h: number) => {
      wall.setAttribute('d', wallPath(v, h));
      top.setAttribute('d', topPath(v, h));
    };
    set(LOW);
    const start = performance.now() + 900;
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - start) / 700));
      set(LOW + (HIGH - LOW) * (1 - (1 - p) ** 3));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [map, targetId]);

  return (
    <svg
      ref={svgRef}
      className="p-sk"
      viewBox={`0 0 ${W} ${f1(H)}`}
      role="img"
      aria-label={t('location.planLabel', { floor: floorLabel })}
    >
      <g
        className="floor"
        transform={`scale(${k}) translate(${-map.viewBox.x} ${-map.viewBox.y})`}
        dangerouslySetInnerHTML={{ __html: map.markup }}
      />
      {shelves.map(({ id, v }) =>
        id === targetId ? (
          <g key={id} data-rise={v.map(f1).join(' ')}>
            <path className="shw on" d={wallPath(v, HIGH)} />
            <path className="sh on" d={topPath(v, HIGH)} />
          </g>
        ) : (
          <g key={id}>
            <path className="shw" d={wallPath(v, LOW)} />
            <path className="sh" d={topPath(v, LOW)} />
          </g>
        ),
      )}
      {target && (
        <>
          <path
            className="thread"
            data-pop="1700"
            d={`M ${f1(tx)} ${f1(ty)} C ${f1(tx)} ${f1(ty + 50)} ${W / 2} ${f1(H - 60)} ${W / 2} ${f1(H)}`}
          />
          <g transform={`translate(${f1(tx)} ${f1(ty - HIGH)})`} data-pop="1300">
            <circle className="p-wave" r="15" />
            <circle className="p-wave" r="15" />
            <circle className="p-wave" r="15" />
          </g>
          <circle className="dot" data-pop="1500" cx={f1(tx + 7)} cy={f1(ty - HIGH - 6)} r="2.6" />
          <text
            className="note"
            data-pop="1600"
            x={f1(tx)}
            y={f1(ty - HIGH - 20)}
            textAnchor="middle"
          >
            {t('location.here')}
          </text>
        </>
      )}
    </svg>
  );
}

export namespace PlanDrawing {
  export type Props = {
    map: FloorMap;
    /** 찾는 서가의 도면 요소 ID */
    targetId: string | null;
    /** "3층" */
    floorLabel: string;
  };
}
