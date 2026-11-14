export const FLOORS = ['2F', '3F', '4F', '5F'] as const;

export type FloorId = (typeof FLOORS)[number];

export type BookLevel = 'intro' | 'advanced';

/** 서가 한 칸 안에서의 가로 위치 */
export type SlotPosition = 'left' | 'middle' | 'right';

export type BookLocation = {
  floor: FloorId;
  /** 서가 번호 (e.g. 27번 서가) */
  shelf: number;
  side: 'front' | 'back';
  /** 위에서부터 몇 번째 칸인지. 정확한 칸을 모르면 비어 있음 */
  slot?: number;
  position?: SlotPosition;
  /** 엘리베이터로부터의 거리 (m) */
  distanceFromElevator: number;
};

export type LoanStatus = { available: true } | { available: false; dueDate: string };

export type Book = {
  id: string;
  title: string;
  authors: string;
  callNumber: string;
  /** 표지 대표색 */
  coverColor: string;
  level?: BookLevel;
  keywords: string[];
  loan: LoanStatus;
  location: BookLocation;
};

export type PopularBook = { rank: number; book: Book };

export type NewArrival = { arrivedAt: string; book: Book };

export type RecommendationKind = 'intro' | 'advanced' | 'borrowed-together' | 'outside-major';

export type RecommendationWhere =
  | { type: 'same-shelf'; slot: number }
  | { type: 'nearby'; shelf: number; distance: number }
  | { type: 'adjacent'; shelf: number };

export type Recommendation = {
  rank: number;
  kind: RecommendationKind;
  /** 추천 이유 한 줄 */
  reason: string;
  where: RecommendationWhere;
  book: Book;
};

/* ---------- 층 평면도 ---------- */

/** 평면도 좌표계는 350 × 380 기준 px */
export type FloorPlanColumn = {
  no: number;
  /** 청구기호 범위 (e.g. A–H) */
  range: string;
  x: number;
};

export type FloorPlan = {
  floor: FloorId;
  name: string;
  width: number;
  height: number;
  columns: FloorPlanColumn[];
  /** 서가 번호 → 평면도 위 중심 좌표 */
  shelves: Record<number, { column: number; x: number; y: number }>;
  /** 출발점에서 해당 서가까지의 경로 그림이 있는 서가 */
  routedShelves: number[];
};

/* ---------- 서가 정면 ---------- */

export type ShelfSpine = {
  width: number;
  height: number;
  color: string;
  /** 책등 세로 글자 */
  label?: string;
  /** 상단 두 줄 띠 */
  band?: boolean;
  /** 추천 책이면 추천 순위 */
  recRank?: number;
  bookId?: string;
};

export type HeatLevel = 'high' | 'mid' | 'low';

export type ShelfView = {
  shelf: number;
  side: 'front' | 'back';
  rows: ShelfSpine[][];
  /** 찾는 책이 꽂혀 있을 가능성 구간 — 찾는 책 칸 안의 x 오프셋(px)부터 */
  heat: { offset: number; segments: { width: number; level: HeatLevel }[] };
  target: Book;
  /** 청구기호 순서상 앞·뒤 책 */
  neighbors?: { prev: string; next: string };
};
