import { PathsApiBooksGetParametersQueryField } from '@/@types/api-schema';
import { api } from '@/common/lib/api';

import { coverColorOf, toBook } from './book-mapper';
import { loadFloorMaps } from './library-map';
import { NEW_ARRIVALS, POPULAR_BOOKS } from './mock-data';
import {
  type Book,
  type NewArrival,
  type PopularBook,
  type Recommendation,
  type SearchResult,
} from './types';

const SEARCH_LIMIT = 20;

/** openapi-fetch 결과에서 오류면 서버 메시지로 throw */
function unwrap<T>({ data, error }: { data?: T; error?: unknown }): T {
  if (error !== undefined || data === undefined) {
    const message =
      error && typeof error === 'object' && 'message' in error ? String(error.message) : '';
    throw new Error(message || 'API request failed');
  }
  return data;
}

export const bookApi = {
  getBook: async (recordId: string): Promise<Book> =>
    toBook(unwrap(await api.GET('/api/books/{recordId}', { params: { path: { recordId } } }))),

  /** 검색어의 쉼표·세미콜론은 서버가 허용하지 않아 공백으로 바꿈 */
  searchBooks: async (query: string): Promise<SearchResult> => {
    const q = query.replace(/[,;]/g, ' ').trim().slice(0, 200);
    if (!q) return { books: [], total: 0 };

    const data = unwrap(
      await api.GET('/api/books', {
        params: {
          query: { q, field: PathsApiBooksGetParametersQueryField.any, limit: SEARCH_LIMIT },
        },
      }),
    );
    return { books: data.books.map(toBook), total: data.total };
  },

  /** ISBN이 없거나 추천 데이터에 없는 ISBN(404)이면 빈 목록 */
  getRecommendations: async (isbn: string): Promise<Recommendation[]> => {
    if (!isbn) return [];
    const { data, error, response } = await api.POST('/api/recommendations', { body: { isbn } });
    if (response.status === 404) return [];

    return unwrap({ data, error }).recommendations.map((rec, index) => {
      const book =
        rec.catalogStatus === 'matched' && rec.catalogBooks[0] ? toBook(rec.catalogBooks[0]) : null;
      return {
        rank: index + 1,
        title: rec.title.replace(/\s*[/:]\s*$/, '').trim(),
        authors: rec.authors.join(', '),
        reasons: rec.reasons,
        explanation: rec.explanation,
        coverColor: book?.coverColor ?? coverColorOf(rec.title),
        book,
      };
    });
  },

  /** 층별 도면 (저장소의 SVG를 정리해서 반환) */
  getFloorMaps: loadFloorMaps,

  // TODO: 인기 책·신착 도서 API가 생기면 교체
  getPopularBooks: (): Promise<PopularBook[]> =>
    Promise.resolve(POPULAR_BOOKS.map((book, index) => ({ rank: index + 1, book }))),

  getNewArrivals: (): Promise<NewArrival[]> => Promise.resolve(NEW_ARRIVALS),
};
