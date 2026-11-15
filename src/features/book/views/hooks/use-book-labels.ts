import { useTranslation } from 'react-i18next';

import { type Book, type BookLocation, type Recommendation } from '../../viewmodels';

/** 책 데이터를 화면 문구로 바꾸는 포맷터 모음 */
export function useBookLabels() {
  const { t } = useTranslation('book');

  return {
    /** 목록 순번 "01" */
    index: (value: number) => String(value).padStart(2, '0'),

    /** "3F · 335번 서가" / "3F · 335번 서가 · 3칸" */
    location: (location: Pick<BookLocation, 'floor' | 'shelf'> & { slot?: number }) =>
      location.slot
        ? t('location.shelfSlot', {
            floor: location.floor,
            shelf: location.shelf,
            slot: location.slot,
          })
        : t('location.shelf', { floor: location.floor, shelf: location.shelf }),

    /** "335번 서가 A면 3칸 부근" */
    directions: ({ shelf, side, slot }: BookLocation) =>
      t('location.directions', { shelf, side, slot }),

    position: (value: BookLocation['position']) => {
      if (value === 'left') return t('location.left');
      if (value === 'right') return t('location.right');
      return t('location.middle');
    },

    loan: (loan: Book['loan']) => {
      if (loan === 'available') return t('status.available');
      if (loan === 'unavailable') return t('status.unavailable');
      return t('status.unknown');
    },

    /** 추천 책 위치 — 찾는 책과 같은 서가·면이면 칸만 */
    recWhere: (rec: Recommendation, target: Book) => {
      const location = rec.book?.location;
      if (!location) return t('recommendation.notInLibrary');
      const sameShelf =
        target.location?.floor === location.floor &&
        target.location.shelf === location.shelf &&
        target.location.side === location.side;
      return sameShelf
        ? t('recommendation.sameShelf', { slot: location.slot })
        : t('location.shelf', { floor: location.floor, shelf: location.shelf });
    },
  };
}
