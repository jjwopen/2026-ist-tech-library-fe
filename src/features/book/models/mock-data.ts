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

export const POPULAR_BOOKS: HomeBook[] = [
  book('밑바닥부터 시작하는 딥러닝', '#233552', '335'),
  book('혼자 공부하는 머신러닝+딥러닝', '#2F5D4A', '335'),
  book('코스모스', '#5B4A6E', '339'),
  book('선형대수와 그 응용', '#4D5966', '338'),
  book('Do it! 딥러닝 입문', '#C9A23F', '335'),
  book('파이썬 라이브러리를 활용한 데이터 분석', '#9A4A36', '337'),
];

export const NEW_ARRIVALS = [
  { arrivedAt: '2026-11-12', book: book('인공지능: 현대적 접근방식', '#2F6670', '336') },
  { arrivedAt: '2026-11-11', book: book('클린 코드', '#E9E2D3', '337') },
  { arrivedAt: '2026-11-10', book: book('데이터 과학을 위한 통계', '#D0743A', '338') },
  { arrivedAt: '2026-11-09', book: book('엔드 오브 타임', '#1F2F48', '339') },
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
