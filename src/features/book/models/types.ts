export const FLOORS = ['2F', '3F', '4F', '5F'] as const;

export type FloorId = (typeof FLOORS)[number];

/** 층 도면 — 저장소의 도면 SVG를 정리한 결과 */
export type FloorMap = {
  floor: FloorId;
  viewBox: { x: number; y: number; width: number; height: number };
  /** 정리된 SVG 자식 요소 마크업 (서가 요소에는 `data-shelf`=도면 요소 ID) */
  markup: string;
  /** 도면 요소 ID → 마커를 올릴 중심 좌표 */
  shelves: Record<string, { x: number; y: number }>;
};

/** 서가 한 칸 안에서의 가로 위치 */
export type SlotPosition = 'left' | 'middle' | 'right';

/** 서가 한 면의 칸 구성 (행 × 열) */
export const SHELF_ROWS = 5;
export const SHELF_COLUMNS = 7;

/** 청구기호로 추정한 소장 위치 */
export type BookLocation = {
  floor: FloorId;
  /** 서가 번호 (e.g. "335") */
  shelf: string;
  /** 서가 면 — 청구기호 앞 절반 A, 뒤 절반 B */
  side: 'A' | 'B';
  /** 위에서부터 몇 번째 칸(행)인지 (1~5) */
  slot: number;
  /** 왼쪽부터 몇 번째 열인지 (1~7) */
  column: number;
  position: SlotPosition;
  /** 층 도면에서 이 서가를 가리키는 요소 ID (e.g. "_3F-335") */
  mapElementId: string | null;
};

export type LoanStatus = 'available' | 'unavailable' | 'unknown';

export type Book = {
  /** 도서관 레코드 ID (e.g. alma991000688189703286) */
  id: string;
  title: string;
  authors: string;
  isbn: string | null;
  callNumber: string | null;
  /** 표지 대표색 — 표지 이미지가 없어 ID로 정함 */
  coverColor: string;
  loan: LoanStatus;
  /** 위치를 추정할 수 없는 자료면 null */
  location: BookLocation | null;
};

export type SearchResult = { books: Book[]; total: number };

/** 홈 목록용 책 — API가 없어 목업 데이터 사용 */
export type HomeBook = {
  title: string;
  coverColor: string;
  floor: FloorId;
  shelf: string;
};

export type PopularBook = { rank: number; book: HomeBook };

export type NewArrival = { arrivedAt: string; book: HomeBook };

export type Recommendation = {
  rank: number;
  title: string;
  authors: string;
  /** 추천 이유 태그 (e.g. 같은 분야, 더 쉬운 난이도) */
  reasons: string[];
  /** 추천 설명 한두 문장 */
  explanation: string;
  coverColor: string;
  /** 도서관에 소장된 경우의 책 정보 */
  book: Book | null;
};
