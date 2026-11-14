import {
  type Book,
  type FloorPlan,
  type Recommendation,
  type ShelfSpine,
  type ShelfView,
} from './types';

/**
 * API가 준비되기 전까지 사용하는 목 데이터.
 * Figma `발표용 목업 · 코멘트 반영` 화면의 내용을 그대로 옮겼습니다.
 */

const shelf27 = (
  slot: number | undefined,
  position?: Book['location']['position'],
): Book['location'] => ({
  floor: '3F',
  shelf: 27,
  side: 'front',
  slot,
  position,
  distanceFromElevator: 20,
});

const elsewhere = (shelf: number, distanceFromElevator: number): Book['location'] => ({
  floor: '3F',
  shelf,
  side: 'front',
  distanceFromElevator,
});

export const BOOKS: Book[] = [
  {
    id: 'b-0193',
    title: '밑바닥부터 시작하는 딥러닝',
    authors: '사이토 고키',
    callNumber: 'Q325.5 .S35 2017',
    coverColor: '#1f3a5f',
    level: 'intro',
    keywords: ['딥러닝', 'deep learning', '파이썬'],
    loan: { available: true },
    location: shelf27(3, 'middle'),
  },
  {
    id: 'b-0201',
    title: 'Do it! 딥러닝 입문',
    authors: '박해선',
    callNumber: 'Q325.5 .P37 2019',
    coverColor: '#e2b93b',
    level: 'intro',
    keywords: ['딥러닝', '입문'],
    loan: { available: true },
    location: shelf27(3),
  },
  {
    id: 'b-0202',
    title: '혼자 공부하는 머신러닝+딥러닝',
    authors: '박해선',
    callNumber: 'Q325.5 .P37 2020',
    coverColor: '#2e7d5b',
    level: 'intro',
    keywords: ['머신러닝', '딥러닝'],
    loan: { available: false, dueDate: '2026-11-21' },
    location: shelf27(undefined),
  },
  {
    id: 'b-0203',
    title: 'Deep Learning',
    authors: 'Ian Goodfellow 외',
    callNumber: 'Q325.5 .G66 2016',
    coverColor: '#ece7dc',
    level: 'advanced',
    keywords: ['딥러닝', 'deep learning'],
    loan: { available: true },
    location: shelf27(2),
  },
  {
    id: 'b-0204',
    title: '코스모스',
    authors: '칼 세이건',
    callNumber: 'QB44 .S24 2006',
    coverColor: '#1a1a1a',
    keywords: ['우주', '천문학'],
    loan: { available: true },
    location: elsewhere(41, 32),
  },
  {
    id: 'b-0205',
    title: '선형대수와 그 응용',
    authors: '길버트 스트랭',
    callNumber: 'QA184 .S77 2006',
    coverColor: '#4a5a70',
    level: 'advanced',
    keywords: ['선형대수', '수학'],
    loan: { available: true },
    location: elsewhere(33, 12),
  },
  {
    id: 'b-0206',
    title: '인공지능: 현대적 접근방식',
    authors: '스튜어트 러셀 · 피터 노빅',
    callNumber: 'Q335 .R86 2021',
    coverColor: '#5b4a7a',
    level: 'advanced',
    keywords: ['인공지능', 'AI'],
    loan: { available: true },
    location: elsewhere(28, 22),
  },
  {
    id: 'b-0207',
    title: '클린 코드',
    authors: '로버트 C. 마틴',
    callNumber: 'QA76.76 .M37 2013',
    coverColor: '#e9e4d6',
    keywords: ['프로그래밍', '소프트웨어'],
    loan: { available: true },
    location: elsewhere(33, 12),
  },
  {
    id: 'b-0208',
    title: '데이터 과학을 위한 통계',
    authors: '피터 브루스 외',
    callNumber: 'QA276.4 .B78 2021',
    coverColor: '#d9772b',
    keywords: ['통계', '데이터'],
    loan: { available: true },
    location: elsewhere(35, 16),
  },
  {
    id: 'b-0209',
    title: '엔드 오브 타임',
    authors: '브라이언 그린',
    callNumber: 'QB981 .G74 2021',
    coverColor: '#0f2a3d',
    keywords: ['우주', '물리학'],
    loan: { available: true },
    location: elsewhere(42, 34),
  },
  {
    id: 'b-0210',
    title: '파이썬 라이브러리를 활용한 데이터 분석',
    authors: '웨스 맥키니',
    callNumber: 'QA76.73 .P98 M33 2023',
    coverColor: '#7a3e3e',
    keywords: ['파이썬', '데이터'],
    loan: { available: true },
    location: elsewhere(34, 15),
  },
  {
    id: 'b-0211',
    title: 'AI 2041',
    authors: '리카이푸 · 천치우판',
    callNumber: 'Q335 .L44 2023',
    coverColor: '#1e1e1e',
    keywords: ['인공지능', 'AI', '소설'],
    loan: { available: true },
    location: elsewhere(28, 22),
  },
];

/** 검색어가 없을 때·"전체" 목록 순서 */
export const POPULAR_IDS = ['b-0193', 'b-0202', 'b-0204', 'b-0205'];

export const NEW_ARRIVALS = [
  { id: 'b-0206', arrivedAt: '2026-11-12' },
  { id: 'b-0207', arrivedAt: '2026-11-11' },
  { id: 'b-0208', arrivedAt: '2026-11-10' },
  { id: 'b-0209', arrivedAt: '2026-11-09' },
];

export const RECOMMENDATIONS: Record<
  string,
  (Omit<Recommendation, 'rank' | 'book'> & { id: string })[]
> = {
  'b-0193': [
    {
      id: 'b-0201',
      kind: 'intro',
      reason: '그림으로 개념부터',
      where: { type: 'same-shelf', slot: 3 },
    },
    {
      id: 'b-0203',
      kind: 'advanced',
      reason: '수식으로 원리까지',
      where: { type: 'same-shelf', slot: 2 },
    },
    {
      id: 'b-0210',
      kind: 'borrowed-together',
      reason: '같이 빌린 기록이 많은 실습서',
      where: { type: 'nearby', shelf: 34, distance: 15 },
    },
    {
      id: 'b-0211',
      kind: 'outside-major',
      reason: '2041년을 그린 단편 10편',
      where: { type: 'adjacent', shelf: 28 },
    },
  ],
};

export const FLOOR_PLANS: Partial<Record<FloorPlan['floor'], FloorPlan>> = {
  '3F': {
    floor: '3F',
    name: '단행본',
    width: 350,
    height: 380,
    columns: [
      { no: 1, range: 'A–H', x: 34 },
      { no: 2, range: 'J–P', x: 84 },
      { no: 3, range: 'Q', x: 134 },
      { no: 4, range: 'QA', x: 184 },
      { no: 5, range: 'QB–QR', x: 234 },
      { no: 6, range: 'R–Z', x: 284 },
    ],
    shelves: {
      27: { column: 3, x: 140, y: 226 },
      28: { column: 3, x: 140, y: 248 },
      33: { column: 4, x: 190, y: 126 },
      34: { column: 4, x: 190, y: 166 },
      35: { column: 4, x: 190, y: 206 },
      41: { column: 6, x: 290, y: 146 },
      42: { column: 6, x: 290, y: 186 },
    },
    routedShelves: [27],
  },
};

/* ---------- 27번 서가 앞면 ---------- */

type SpineTuple = [width: number, height: number, color: string, label?: string, band?: boolean];

const toSpines = (tuples: SpineTuple[]): ShelfSpine[] =>
  tuples.map(([width, height, color, label, band = false]) => ({
    width,
    height,
    color,
    label: label || undefined,
    band,
  }));

const SHELF_27_ROWS: ShelfSpine[][] = [
  toSpines([
    [20, 48, '#1f3a5f', '', true],
    [16, 54, '#6e5a44'],
    [24, 50, '#2e5e4e', '신경망', true],
    [18, 56, '#44505c', '', true],
    [22, 46, '#2b2b2b', '통계'],
    [14, 52, '#3e4a3d', '', true],
    [26, 54, '#5b6b7a', '최적화', true],
    [18, 48, '#1f3a5f'],
    [22, 56, '#6e5a44', '베이즈', true],
    [16, 50, '#2e5e4e', '', true],
    [24, 52, '#44505c', '비전'],
    [20, 46, '#2b2b2b', '', true],
    [18, 54, '#3e4a3d', '추론', true],
  ]),
  [
    ...toSpines([
      [18, 52, '#5b6b7a'],
      [22, 48, '#1f3a5f', '패턴', true],
      [16, 56, '#6e5a44', '', true],
      [24, 50, '#2e5e4e', '확률'],
      [20, 54, '#44505c', '', true],
      [14, 48, '#2b2b2b', '', true],
      [22, 56, '#3e4a3d'],
      [18, 50, '#5b6b7a', '학습', true],
    ]),
    { width: 28, height: 58, color: '#ece7dc', band: true, recRank: 2, bookId: 'b-0203' },
    ...toSpines([
      [16, 52, '#6e5a44', '모델'],
      [22, 48, '#2e5e4e', '', true],
      [18, 54, '#44505c', '데이터', true],
      [20, 50, '#2b2b2b'],
    ]),
  ],
  [
    ...toSpines([
      [20, 50, '#d9d4c7', '회귀', true],
      [16, 54, '#e8e2d4', '', true],
    ]),
    { width: 22, height: 56, color: '#f2f0ea', label: '입문', recRank: 1, bookId: 'b-0201' },
    ...toSpines([
      [18, 56, '#9aa3a8', '', true],
      [24, 52, '#f2f0ea', '딥러닝', true],
      [16, 48, '#d9d4c7'],
      [22, 54, '#e8e2d4', '신경망', true],
      [20, 50, '#8c9a6e', '', true],
      [18, 56, '#9aa3a8', '통계'],
      [24, 52, '#f2f0ea', '', true],
      [16, 48, '#d9d4c7', '', true],
      [22, 54, '#e8e2d4'],
      [18, 50, '#8c9a6e', '베이즈', true],
    ]),
  ],
  toSpines([
    [22, 48, '#2b2b2b', '', true],
    [16, 54, '#3e4a3d', '비전'],
    [20, 50, '#5b6b7a', '', true],
    [26, 56, '#1f3a5f', '추론', true],
    [18, 52, '#6e5a44'],
    [24, 48, '#2e5e4e', '패턴', true],
    [14, 54, '#44505c', '', true],
    [22, 50, '#2b2b2b', '확률'],
    [20, 56, '#3e4a3d', '', true],
    [16, 48, '#5b6b7a', '', true],
    [24, 52, '#1f3a5f'],
    [18, 54, '#6e5a44', '학습', true],
    [20, 50, '#2e5e4e', '', true],
  ]),
  toSpines([
    [30, 58, '#f2f0ea', '모델'],
    [26, 54, '#d9d4c7', '', true],
    [34, 60, '#e8e2d4', '데이터', true],
    [24, 56, '#8c9a6e'],
    [30, 58, '#9aa3a8', '회귀', true],
    [28, 54, '#f2f0ea', '', true],
    [32, 60, '#d9d4c7', '딥러닝'],
    [26, 56, '#e8e2d4', '', true],
    [30, 58, '#8c9a6e', '신경망', true],
  ]),
];

/** 서가 번호 → 정면 배치. 현재는 27번 서가 앞면만 있음 */
export const SHELF_FRONTS: Record<number, Pick<ShelfView, 'rows' | 'heat'>> = {
  27: {
    rows: SHELF_27_ROWS,
    heat: {
      offset: 80,
      segments: [
        { width: 22, level: 'low' },
        { width: 30, level: 'mid' },
        { width: 54, level: 'high' },
        { width: 30, level: 'mid' },
        { width: 22, level: 'low' },
      ],
    },
  },
};

export const CALL_NUMBER_NEIGHBORS: Record<string, ShelfView['neighbors']> = {
  'b-0193': { prev: 'Q325.5 .S34', next: 'Q325.5 .S37' },
};
