import { type HomeBook } from './types';

/**
 * 홈 목록용 목업 데이터 — 인기 책·신착 도서 API가 생기면 교체.
 * Figma `발표용 목업 · 코멘트 반영` 화면의 내용을 그대로 옮겼습니다.
 */

const book = (title: string, coverColor: string, shelf: string): HomeBook => ({
  title,
  coverColor,
  floor: '3F',
  shelf,
});

export const POPULAR_BOOKS: HomeBook[] = [
  book('밑바닥부터 시작하는 딥러닝', '#1f3a5f', '27'),
  book('혼자 공부하는 머신러닝+딥러닝', '#2e7d5b', '27'),
  book('코스모스', '#1a1a1a', '41'),
  book('선형대수와 그 응용', '#4a5a70', '33'),
];

export const NEW_ARRIVALS = [
  { arrivedAt: '2026-11-12', book: book('인공지능: 현대적 접근방식', '#5b4a7a', '28') },
  { arrivedAt: '2026-11-11', book: book('클린 코드', '#e9e4d6', '33') },
  { arrivedAt: '2026-11-10', book: book('데이터 과학을 위한 통계', '#d9772b', '35') },
  { arrivedAt: '2026-11-09', book: book('엔드 오브 타임', '#0f2a3d', '42') },
];
