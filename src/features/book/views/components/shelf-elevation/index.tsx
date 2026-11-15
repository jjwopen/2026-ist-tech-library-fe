import { type ReactNode } from 'react';

import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import { SHELF_COLUMNS, SHELF_ROWS, type BookLocation } from '../../../viewmodels';

const W = 302;
const RH = 36;
const X0 = 14;
const BW = (W - X0) / SHELF_COLUMNS;
const DX = 6;
const DY = 6;
const T = DY + 5;
const B = T + SHELF_ROWS * RH;
/** 책 윗면·옆면 깊이, 찾는 책을 앞으로 당긴 정도 */
const BD = 4.6;
const PULL = 3;

const n1 = (v: number) => v.toFixed(1);
const poly = (points: number[][]) =>
  `M ${points.map(([x, y]) => `${n1(x)} ${n1(y)}`).join(' L ')} Z`;

export type ShelfMark = {
  id: string;
  title: string;
  location: Pick<BookLocation, 'side' | 'slot' | 'column'>;
  /** 찾는 책 */
  target?: boolean;
  loan?: boolean;
};

/**
 * 서가 정면 — 평면도에서 뽑아낸 서가 한 면(단 × 칸).
 * 찾는 책은 앞으로 당겨 옆면이 보이게 하고 파문을, 같은 면의 비슷한 책은 옅은 먹 자리로 표시
 */
export function ShelfElevation({
  shelf,
  side,
  marks,
  selectedId,
  fresh,
  onSelect,
}: ShelfElevation.Props) {
  const { t } = useTranslation('book');
  const byCell = new Map<string, ShelfMark>();
  // 같은 칸에 여러 권이면 칸 안에서 자리를 나눔 (찾는 책은 두 번째 자리)
  for (const mark of marks.filter((m) => m.location.side === side)) {
    const { slot, column } = mark.location;
    const taken = [1, 3, 0, 4, 2].find((k) => !byCell.has(`${slot - 1}:${column - 1}:${k}`)) ?? 0;
    byCell.set(`${slot - 1}:${column - 1}:${mark.target ? 1 : taken}`, mark);
  }
  const shift = side === 'B' ? 3 : 0;

  const under: ReactNode[] = [];
  const body: ReactNode[] = [];
  const over: ReactNode[] = [];

  body.push(
    <path
      key="top"
      className="sf sf-top"
      d={poly([
        [X0, T],
        [W, T],
        [W + DX, T - DY],
        [X0 + DX, T - DY],
      ])}
    />,
    <path
      key="side"
      className="sf sf-side"
      d={poly([
        [W, T],
        [W + DX, T - DY],
        [W + DX, B - DY],
        [W, B],
      ])}
    />,
  );

  for (let r = 0; r < SHELF_ROWS; r++) {
    const y0 = T + r * RH;
    const base = y0 + RH;
    body.push(
      <text key={`r${r}`} x="2" y={base - 13}>
        {r + 1}
      </text>,
    );
    for (let c = 0; c < SHELF_COLUMNS; c++) {
      const xa = X0 + c * BW;
      const xb = xa + BW;
      body.push(
        <g key={`bay${r}-${c}`}>
          <rect className="sf-back" x={n1(xa + DX)} y={y0} width={n1(BW - DX)} height={RH - DY} />
          <path
            className="sf-wall"
            d={poly([
              [xa, y0],
              [xa + DX, y0],
              [xa + DX, base - DY],
              [xa, base],
            ])}
          />
          <path
            className="sf-floor"
            d={poly([
              [xa, base],
              [xb, base],
              [xb, base - DY],
              [xa + DX, base - DY],
            ])}
          />
        </g>,
      );

      const row: { mark?: ShelfMark; x: number; bw: number; bh: number }[] = [];
      let x = xa + 2.5;
      for (let k = 0; k < 5; k++) {
        const mark = byCell.get(`${r}:${c}:${k}`);
        const bw = mark ? 7 : 4.6 + ((r * 7 + c * 3 + k * 5 + shift) % 4) * 0.8;
        const bh = mark ? 25 : 18 + ((r * 5 + c * 2 + k * 3 + shift) % 8);
        if (x + bw > xb - 2) break;
        row.push({ mark, x, bw, bh });
        x += bw + 1.5;
      }

      row.forEach((item, i) => {
        const top = base - item.bh;
        const next = row[i + 1];
        const key = `b${r}-${c}-${i}`;
        const { mark } = item;
        if (mark?.target) {
          const px = item.x - PULL;
          const pt = top + PULL;
          const pop = fresh ? { 'data-pop': '700' } : {};
          over.push(
            <g key={key} {...pop}>
              <path
                className="bk-top"
                d={poly([
                  [px, pt],
                  [px + item.bw, pt],
                  [item.x + item.bw + BD, top - BD],
                  [item.x + BD, top - BD],
                ])}
              />
              <path
                className="bk-side bk-side-t"
                d={poly([
                  [px + item.bw, pt],
                  [item.x + item.bw + BD, top - BD],
                  [item.x + item.bw + BD, base - BD],
                  [px + item.bw, base + PULL],
                ])}
              />
              <rect
                className={cn('bk bk-t', mark.loan && 'bk-loan')}
                x={n1(px)}
                y={n1(pt)}
                width={item.bw}
                height={item.bh}
              />
            </g>,
            <g
              key={`${key}w`}
              transform={`translate(${n1(px + item.bw / 2)} ${n1(pt + item.bh / 2)})`}
              {...pop}
            >
              <circle className="p-wave" r="21" />
              <circle className="p-wave" r="21" />
              <circle className="p-wave" r="21" />
            </g>,
            <circle
              key={`${key}d`}
              className="dot"
              cx={n1(item.x + item.bw / 2 + BD / 2 - 1)}
              cy={n1(Math.max(y0 + 3.5, top - BD - 5))}
              r="2.8"
            />,
          );
          return;
        }
        body.push(
          <path
            key={`${key}t`}
            className="bk-top"
            d={poly([
              [item.x, top],
              [item.x + item.bw, top],
              [item.x + item.bw + BD, top - BD],
              [item.x + BD, top - BD],
            ])}
          />,
        );
        if (!next || base - next.bh > top || next.mark?.target) {
          body.push(
            <path
              key={`${key}s`}
              className="bk-side"
              d={poly([
                [item.x + item.bw, top],
                [item.x + item.bw + BD, top - BD],
                [item.x + item.bw + BD, base - BD],
                [item.x + item.bw, base],
              ])}
            />,
          );
        }
        if (mark) {
          const on = selectedId === mark.id;
          body.push(
            <rect
              key={key}
              className={cn('bk', on ? 'bk-on' : 'bk-rec', mark.loan && 'bk-loan')}
              x={n1(item.x)}
              y={top}
              width={item.bw}
              height={item.bh}
            />,
          );
          under.push(
            <ellipse
              key={`${key}z`}
              className={cn('zone', on && 'on')}
              cx={n1(xa + BW / 2)}
              cy={base - RH / 2 + 3}
              rx={n1(BW / 2 + 3)}
              ry={RH / 2 + 2}
              filter="url(#p-zone)"
            />,
          );
          over.push(
            <rect
              key={`${key}h`}
              className="hit"
              role="button"
              tabIndex={0}
              aria-label={t('location.similarOnShelf', { title: mark.title })}
              x={n1(xa)}
              y={y0}
              width={n1(BW)}
              height={RH}
              onClick={() => onSelect?.(mark.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelect?.(mark.id);
                }
              }}
            />,
          );
        } else {
          body.push(
            <rect
              key={key}
              className="bk"
              x={n1(item.x)}
              y={top}
              width={n1(item.bw)}
              height={item.bh}
            />,
          );
        }
      });
    }
  }

  // 판과 기둥의 앞 모서리는 마지막에
  for (let r = 0; r <= SHELF_ROWS; r++) {
    body.push(<path key={`h${r}`} className="board" d={`M ${X0} ${T + r * RH} H ${W}`} />);
  }
  for (let c = 0; c <= SHELF_COLUMNS; c++) {
    body.push(<path key={`v${c}`} className="board" d={`M ${n1(X0 + c * BW)} ${T} V ${B}`} />);
  }
  for (let c = 0; c < SHELF_COLUMNS; c++) {
    body.push(
      <text key={`c${c}`} x={n1(X0 + c * BW + BW / 2)} y={B + 11} textAnchor="middle">
        {c + 1}
      </text>,
    );
  }

  return (
    <svg
      className="p-sk"
      viewBox={`0 0 ${W + DX + 2} ${B + 15}`}
      role="group"
      aria-label={t('location.elevationLabel', { shelf, rows: SHELF_ROWS, columns: SHELF_COLUMNS })}
    >
      <defs>
        <filter
          id="p-zone"
          x="-40%"
          y="-60%"
          width="180%"
          height="220%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves={2} seed={5} />
          <feDisplacementMap
            in="SourceGraphic"
            scale={12}
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation={2.6} />
        </filter>
      </defs>
      {under}
      {body}
      {over}
    </svg>
  );
}

export namespace ShelfElevation {
  export type Props = {
    /** "335" */
    shelf: string;
    /** 지금 보여주는 면 */
    side: BookLocation['side'];
    marks: ShelfMark[];
    selectedId?: string | null;
    /** 처음 열릴 때 찾는 책이 떠오르는 효과 */
    fresh?: boolean;
    onSelect?: (id: string) => void;
  };
}
