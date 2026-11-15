import { type components } from '@/@types/api-schema';

import { FLOORS, type Book, type BookLocation, type FloorId, type SlotPosition } from './types';

type BookDto = components['schemas']['BookDto'];
type HoldingDto = components['schemas']['HoldingDto'];

const COVER_COLORS = [
  '#1f3a5f',
  '#2e7d5b',
  '#1a1a1a',
  '#4a5a70',
  '#5b4a7a',
  '#e9e4d6',
  '#d9772b',
  '#0f2a3d',
  '#e2b93b',
  '#7a3e3e',
];

/** 같은 책은 항상 같은 색이 되도록 ID 해시로 표지색 결정 */
export function coverColorOf(id: string) {
  const hash = [...id].reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 7);
  return COVER_COLORS[hash % COVER_COLORS.length];
}

const toFloor = (floor: number | null): FloorId | null => {
  const id = `${floor}F` as FloorId;
  return FLOORS.includes(id) ? id : null;
};

const toPosition = (column: number): SlotPosition => {
  if (column <= 2) return 'left';
  if (column >= 6) return 'right';
  return 'middle';
};

const toLocation = (holding: HoldingDto | undefined): BookLocation | null => {
  const guide = holding?.locationGuide;
  const floor = toFloor(guide?.floor ?? null);
  if (!guide || guide.status !== 'estimated' || !floor || !guide.shelfNumber || !guide.cell) {
    return null;
  }
  return {
    floor,
    shelf: guide.shelfNumber,
    side: guide.cell.side,
    slot: guide.cell.row,
    column: guide.cell.column,
    position: toPosition(guide.cell.column),
    mapElementId: guide.mapElementIds[0] ?? null,
  };
};

/** 위치를 추정할 수 있는 소장처를 우선 사용 */
const primaryHolding = (holdings: HoldingDto[]) =>
  holdings.find((holding) => holding.locationGuide.status === 'estimated') ?? holdings[0];

export function toBook(dto: BookDto): Book {
  const holding = primaryHolding(dto.holdings);

  return {
    id: dto.id,
    title: dto.title.replace(/\s*[/:]\s*$/, '').trim(),
    authors: dto.authors.join(', '),
    isbn: dto.isbn[0] ?? null,
    callNumber: holding?.callNumber ?? null,
    coverColor: coverColorOf(dto.id),
    loan: holding?.availability ?? 'unknown',
    location: toLocation(holding),
  };
}
