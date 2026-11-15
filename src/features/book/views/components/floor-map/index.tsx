import { useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import { type FloorMap as FloorMapData, type FloorMarker } from '../../../viewmodels';

/** 도면 SVG 좌표를 화면 기본 폭(350px) 기준 px처럼 쓰기 위한 비율 */
const BASE_WIDTH = 350;
const ZOOM = 2.2;

/** 서가 ID는 `_3F-335` 형태라 CSS 선택자에 그대로 넣어도 안전한 문자만 허용 */
const shelfSelector = (id: string) => `[data-shelf="${id.replace(/[^\w-]/g, '')}"]`;

/**
 * 층 도면 (공식 서가맵 SVG) — 찾는 책 서가는 빨강, 추천 책 서가는 파랑으로 표시.
 * 확대하면 찾는 책 서가가 가운데 오도록 스크롤
 */
export function FloorMap({
  map,
  target,
  recShelfIds = [],
  sameShelfCount = 0,
  recMarkers = [],
  className,
}: FloorMap.Props) {
  const { t } = useTranslation('book');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const { x, y, width, height } = map.viewBox;
  const unit = width / BASE_WIDTH;

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    if (!zoomed || !target) {
      container.scrollTo({ left: 0, top: 0 });
      return;
    }
    const scale = container.scrollWidth / width;
    container.scrollTo({
      left: (target.x - x) * scale - container.clientWidth / 2,
      top: (target.y - y) * scale - container.clientHeight / 2,
      behavior: 'smooth',
    });
  }, [zoomed, target, x, y, width]);

  const highlight = [
    `.floor-map [data-shelf] { stroke: var(--color-rule-light) !important; }`,
    ...recShelfIds.map(
      (id) => `.floor-map ${shelfSelector(id)} { stroke: var(--color-rec) !important; }`,
    ),
    target
      ? `.floor-map ${shelfSelector(target.id)} { stroke: var(--color-accent) !important; stroke-width: 8; }`
      : '',
  ].join('\n');

  return (
    <div className={cn('relative', className)}>
      <div
        ref={scrollRef}
        style={{ aspectRatio: `${width} / ${height}` }}
        className="border-ink bg-paper scrollbar-hidden w-full overflow-auto border-2"
      >
        <svg
          role="img"
          aria-label={t('floor.mapLabel')}
          viewBox={`${x} ${y} ${width} ${height}`}
          style={{ width: zoomed ? `${ZOOM * 100}%` : '100%' }}
          className="floor-map block h-auto font-sans"
        >
          <style>{highlight}</style>
          <g dangerouslySetInnerHTML={{ __html: map.markup }} />

          {recMarkers.map((marker) => (
            <Badge key={marker.label} x={marker.x} y={marker.y} unit={unit}>
              {marker.label}
            </Badge>
          ))}
          {target && (
            <g>
              <rect
                x={target.x - 9 * unit}
                y={target.y - 9 * unit}
                width={18 * unit}
                height={18 * unit}
                className="fill-accent"
              />
              <text
                x={target.x + 12 * unit}
                y={target.y + 18 * unit}
                fontSize={12 * unit}
                className="fill-accent font-num font-bold"
              >
                {target.shelf}
              </text>
              {sameShelfCount > 0 && (
                <Badge x={target.x + 20 * unit} y={target.y} unit={unit}>
                  {`+${sameShelfCount}`}
                </Badge>
              )}
            </g>
          )}
        </svg>
      </div>
      <button
        type="button"
        onClick={() => setZoomed((prev) => !prev)}
        aria-pressed={zoomed}
        className="border-ink bg-paper text-meta absolute right-2 bottom-2 border px-2 py-1 font-bold"
      >
        {zoomed ? t('floor.zoomOut') : t('floor.zoomIn')}
      </button>
    </div>
  );
}

/** 추천 책 순번 배지 (중심 좌표 기준) */
function Badge({ x, y, unit, children }: { x: number; y: number; unit: number; children: string }) {
  const height = 16 * unit;
  const width = Math.max(16, 8 + children.length * 7) * unit;
  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        className="fill-rec"
      />
      <text
        x={x}
        y={y}
        fontSize={11 * unit}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-print-paper font-num font-bold"
      >
        {children}
      </text>
    </g>
  );
}

export namespace FloorMap {
  export type Props = {
    map: FloorMapData;
    /** 찾는 책 서가 (도면 요소 ID + 중심 좌표) */
    target?: { id: string; shelf: string; x: number; y: number };
    /** 추천 책이 있는 서가 요소 ID */
    recShelfIds?: string[];
    /** 찾는 책과 같은 서가에 있는 추천 책 수 */
    sameShelfCount?: number;
    recMarkers?: FloorMarker[];
    className?: string;
  };
}
