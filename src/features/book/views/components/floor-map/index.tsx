import { type CSSProperties, type ReactNode } from 'react';

import { useTranslation } from 'react-i18next';

import { FLOOR_PLAN_ASSETS } from '@/common/assets';
import { cn } from '@/common/utils';

import { type FloorMarker, type FloorPlan, type FloorTarget } from '../../../viewmodels';

const COLUMN_TOP = 96;
const COLUMN_WIDTH = 12;
const COLUMN_HEIGHT = 200;
const COLUMN_SEGMENTS = 10;
const WINDOWS = [24, 104, 184, 264];
const DESKS = [30, 110, 190, 270];
const PILLARS = [
  [14, 150],
  [14, 250],
  [328, 150],
  [328, 250],
];
const STAIR_STEPS = [5.2, 10.4, 15.6, 20.8];
const STUDY_ROOMS = [230, 265, 300];
const START = { x: 115, y: 326 };

/** 층 평면도 (Figma `평면도 3F`) — 350 × 380 좌표계를 비율로 늘려 그림 */
export function FloorMap({
  plan,
  target,
  sameShelfCount = 0,
  recMarkers = [],
  showRoute = false,
  className,
}: FloorMap.Props) {
  const { t } = useTranslation('book');
  const at = toStyle(plan);

  return (
    <div
      role="img"
      aria-label={t('floor.mapLabel', { floor: plan.floor })}
      style={{ aspectRatio: `${plan.width} / ${plan.height}` }}
      className={cn('bg-paper relative w-full', className)}
    >
      <div className="absolute inset-0">
        {/* 벽 */}
        <Box at={at(0, 0, plan.width, 4)} className="bg-ink" />
        <Box at={at(0, 0, 4, plan.height)} className="bg-ink" />
        <Box at={at(plan.width - 4, 0, 4, plan.height)} className="bg-ink" />
        <Box at={at(0, plan.height - 4, plan.width, 4)} className="bg-ink" />
        {WINDOWS.map((x) => (
          <Box key={x} at={at(x, 0, 60, 4)} className="bg-paper border-ink border-y" />
        ))}
        {PILLARS.map(([x, y]) => (
          <Box key={`${x}-${y}`} at={at(x, y, 8, 8)} className="bg-ink" />
        ))}
        {DESKS.map((x) => (
          <div key={x}>
            <Box at={at(x, 20, 44, 14)} className="bg-paper border-ink border" />
            {[
              [8, 11],
              [8, 37],
              [30, 11],
              [30, 37],
            ].map(([dx, y]) => (
              <Box
                key={`${dx}-${y}`}
                at={at(x + dx, y, 6, 6)}
                className="bg-paper border-ink border"
              />
            ))}
          </div>
        ))}

        <Asset asset={FLOOR_PLAN_ASSETS.north} at={at} x={332} y={12} />
        <Box at={at(332, 22)} className="text-overline">
          {t('floor.north')}
        </Box>

        {/* 서가 열 */}
        {plan.columns.map((column) => {
          const active = column.no === target?.column;
          return (
            <div key={column.no}>
              <Box
                at={at(column.x + COLUMN_WIDTH / 2, 52)}
                className={cn(
                  'font-num -translate-x-1/2 text-base/5 font-bold tracking-[-0.01em]',
                  active && 'text-accent',
                )}
              >
                {column.no}
              </Box>
              <Box
                at={at(column.x + COLUMN_WIDTH / 2, 72)}
                className={cn(
                  'text-meta -translate-x-1/2 whitespace-nowrap',
                  active ? 'text-accent font-bold' : 'text-sub',
                )}
              >
                {column.range}
              </Box>
              <Box
                at={at(column.x, COLUMN_TOP, COLUMN_WIDTH, COLUMN_HEIGHT)}
                className={cn('flex flex-col justify-evenly', active ? 'bg-ink' : 'bg-rule-light')}
              >
                {Array.from({ length: COLUMN_SEGMENTS - 1 }, (_, index) => (
                  <span key={index} className="bg-paper h-0.5 w-full" />
                ))}
              </Box>
            </div>
          );
        })}

        {/* 엘리베이터 · 계단 */}
        <Box at={at(16, 314, 84, 50)} className="bg-field" />
        <Box at={at(24, 318, 26, 26)} className="bg-paper border-ink border" />
        <Asset asset={FLOOR_PLAN_ASSETS.elevator} at={at} x={23.65} y={317.65} />
        <Box at={at(29, 346)} className="text-overline">
          {t('floor.elevator')}
        </Box>
        <Box at={at(60, 318, 30, 26)} className="bg-paper border-ink border" />
        {STAIR_STEPS.map((dy) => (
          <Box key={dy} at={at(60, 318 + dy, 30, 1)} className="bg-ink" />
        ))}
        <Box at={at(63, 346)} className="text-overline">
          {t('floor.stairs')}
        </Box>

        {/* 그룹 스터디룸 · 반납기 */}
        {STUDY_ROOMS.map((x) => (
          <Box key={x} at={at(x, 314, 36, 50)} className="bg-paper border-ink border" />
        ))}
        <Box at={at(232, 298)} className="text-meta text-sub whitespace-nowrap">
          {t('floor.studyRoom')}
        </Box>
        <Box at={at(168, 334, 14, 10)} className="bg-ink" />
        <Box at={at(186, 331)} className="text-meta text-sub whitespace-nowrap">
          {t('floor.returnKiosk')}
        </Box>

        {/* 경로 · 출발 */}
        {showRoute && <Asset asset={FLOOR_PLAN_ASSETS.route} at={at} x={113.5} y={224.5} />}
        <Asset asset={FLOOR_PLAN_ASSETS.start} at={at} x={START.x - 6} y={START.y - 6} />
        <Box at={at(124, 318)} className="bg-ink text-overline text-paper px-1.5 py-0.5">
          {t('floor.start')}
        </Box>

        {/* 찾는 책 · 추천 책 */}
        {target && (
          <>
            <Box at={at(target.x - 11, target.y - 11, 22, 22)} className="bg-accent" />
            {sameShelfCount > 0 && (
              <RecBadge style={at(target.x + 14, target.y - 11)}>+{sameShelfCount}</RecBadge>
            )}
            <Box at={at(target.x + 16, target.y + 8)} className="num text-accent">
              {target.shelf}
            </Box>
          </>
        )}
        {recMarkers.map((marker) => (
          <RecBadge key={marker.rank} style={at(marker.x - 8, marker.y - 8)}>
            {marker.rank}
          </RecBadge>
        ))}
      </div>
    </div>
  );
}

type At = (x: number, y: number, w?: number, h?: number) => CSSProperties;

/** 평면도 px 좌표를 컨테이너 대비 % 로 변환 */
function toStyle(plan: FloorPlan): At {
  return (x, y, w, h) => ({
    left: `${(x / plan.width) * 100}%`,
    top: `${(y / plan.height) * 100}%`,
    width: w === undefined ? undefined : `${(w / plan.width) * 100}%`,
    height: h === undefined ? undefined : `${(h / plan.height) * 100}%`,
  });
}

function Box({
  at,
  className,
  children,
}: {
  at: CSSProperties;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div style={at} className={cn('absolute', className)}>
      {children}
    </div>
  );
}

/** 다운로드한 SVG를 원본 크기 비율 그대로 배치 */
function Asset({
  asset,
  at,
  x,
  y,
}: {
  asset: { src: string; width: number; height: number };
  at: At;
  x: number;
  y: number;
}) {
  return (
    <img
      alt=""
      src={asset.src}
      width={asset.width}
      height={asset.height}
      style={at(x, y, asset.width, asset.height)}
      className="absolute block max-w-none"
    />
  );
}

function RecBadge({ style, children }: { style: CSSProperties; children: ReactNode }) {
  return (
    <span
      style={style}
      className="bg-rec num text-print-paper absolute flex h-4 min-w-4 items-center justify-center px-0.5"
    >
      {children}
    </span>
  );
}

export namespace FloorMap {
  export type Props = {
    plan: FloorPlan;
    /** 찾는 책이 있는 서가 (해당 열 강조 + 위치 표시) */
    target?: FloorTarget;
    /** 찾는 책과 같은 서가에 있는 추천 책 수 */
    sameShelfCount?: number;
    recMarkers?: FloorMarker[];
    showRoute?: boolean;
    className?: string;
  };
}
