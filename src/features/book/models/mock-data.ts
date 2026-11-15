import { type Book, type BookIntro, type HomeBook } from './types';

/**
 * API가 없는 부분의 목업 데이터 — 인기 책·신착 도서·많이 찾는 말·책 소개.
 * 관련 API가 생기면 교체
 */

const book = (title: string, coverColor: string, shelf: string): HomeBook => ({
  title,
  coverColor,
  floor: '3F',
  shelf,
});

/** 표지 이미지가 있는 소장 도서 — 제목으로 검색한 첫 결과가 해당 책이어야 표지를 찾을 수 있음 */
export const POPULAR_BOOKS: HomeBook[] = [
  book('Deep learning', '#233552', '335'),
  book('수학 걸', '#C9A23F', '335'),
  book('Pattern recognition and machine learning', '#4D5966', '335'),
  book('모두를 위한 R 데이터 분석 입문', '#2F5D4A', '335'),
  book('Introduction to algorithms', '#9A4A36', '335'),
  book('대학물리학', '#5B4A6E', '335'),
];

export const NEW_ARRIVALS = [
  { arrivedAt: '2026-11-12', book: book('Generative deep learning', '#2F6670', '335') },
  { arrivedAt: '2026-11-11', book: book('우주탐사 매뉴얼', '#1F2F48', '335') },
  { arrivedAt: '2026-11-10', book: book('Probabilistic machine learning', '#E9E2D3', '335') },
  { arrivedAt: '2026-11-09', book: book('Mathematics for machine learning', '#D0743A', '335') },
];

export const POPULAR_QUERIES = ['딥러닝 입문', '선형대수', '코스모스'];

/** 책 소개 — 도서관 소개가 있으면 그대로, 없으면 목업. '이런 분께 권해요'는 아직 목업 */
export function mockIntro(target: Book): BookIntro {
  const by = target.authors ? `${target.authors}의 ` : '';
  return {
    synopsis:
      target.description ??
      `${by}『${target.title}』. 도서관 소장 정보를 바탕으로 꽂혀 있을 자리를 알려 드려요. 책 소개는 준비 중이라 예시 문구로 채웠어요.`,
    recommendedFor: ['이 분야를 처음 공부할 때', '같은 서가의 비슷한 책과 함께 볼 때'],
  };
}
