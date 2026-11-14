import {
  BOOKS,
  CALL_NUMBER_NEIGHBORS,
  FLOOR_PLANS,
  NEW_ARRIVALS,
  POPULAR_IDS,
  RECOMMENDATIONS,
  SHELF_FRONTS,
} from './mock-data';
import {
  type Book,
  type FloorId,
  type FloorPlan,
  type NewArrival,
  type PopularBook,
  type Recommendation,
  type ShelfView,
} from './types';

// TODO: 백엔드 API가 준비되면 `@/common/lib/api` 호출로 교체
const respond = <T>(data: T) => Promise.resolve(data);

const findBook = (id: string) => {
  const book = BOOKS.find((item) => item.id === id);
  if (!book) throw new Error(`Book not found: ${id}`);
  return book;
};

const normalize = (text: string) => text.toLowerCase().replace(/\s+/g, '');

export const bookApi = {
  getBook: (id: string): Promise<Book> => respond(findBook(id)),

  getPopularBooks: (): Promise<PopularBook[]> =>
    respond(POPULAR_IDS.map((id, index) => ({ rank: index + 1, book: findBook(id) }))),

  getNewArrivals: (): Promise<NewArrival[]> =>
    respond(NEW_ARRIVALS.map(({ id, arrivedAt }) => ({ arrivedAt, book: findBook(id) }))),

  /** 공백으로 나눈 단어 중 하나라도 제목·저자·청구기호·키워드에 포함되면 결과에 포함 */
  searchBooks: (query: string): Promise<Book[]> => {
    const tokens = query.split(/\s+/).map(normalize).filter(Boolean);
    if (tokens.length === 0) return respond(BOOKS);

    return respond(
      BOOKS.filter((book) => {
        const haystack = normalize(
          [book.title, book.authors, book.callNumber, ...book.keywords].join(' '),
        );
        return tokens.some((token) => haystack.includes(token));
      }),
    );
  },

  getRecommendations: (bookId: string): Promise<Recommendation[]> =>
    respond(
      (RECOMMENDATIONS[bookId] ?? []).map(({ id, ...rest }, index) => ({
        rank: index + 1,
        book: findBook(id),
        ...rest,
      })),
    ),

  getFloorPlan: (floor: FloorId): Promise<FloorPlan | null> => respond(FLOOR_PLANS[floor] ?? null),

  /** 정면 배치 데이터가 없는 서가면 null */
  getShelfView: (bookId: string): Promise<ShelfView | null> => {
    const target = findBook(bookId);
    const front = SHELF_FRONTS[target.location.shelf];
    if (!front) return respond(null);

    return respond({
      shelf: target.location.shelf,
      side: target.location.side,
      ...front,
      target,
      neighbors: CALL_NUMBER_NEIGHBORS[bookId],
    });
  },
};
