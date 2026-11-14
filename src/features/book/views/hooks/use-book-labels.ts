import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { type Book, type Recommendation } from '../../viewmodels';

/** 책 데이터를 화면 문구로 바꾸는 포맷터 모음 */
export function useBookLabels() {
  const { t } = useTranslation('book');

  const side = (value: Book['location']['side']) =>
    value === 'front' ? t('location.front') : t('location.back');

  return {
    /** "3F · 27번 서가" / "3F · 27번 서가 · 3칸" */
    location: ({ floor, shelf, slot }: Book['location'], withSlot = true) =>
      withSlot && slot
        ? t('location.shelfSlot', { floor, shelf: String(shelf), slot: String(slot) })
        : t('location.shelf', { floor, shelf: String(shelf) }),

    /** "27번 서가 앞면 3칸 · 엘리베이터에서 약 20m" */
    directions: (location: Book['location']) =>
      location.slot
        ? t('location.directionsSlot', {
            shelf: String(location.shelf),
            side: side(location.side),
            slot: String(location.slot),
            distance: String(location.distanceFromElevator),
          })
        : t('location.directions', {
            shelf: String(location.shelf),
            side: side(location.side),
            distance: String(location.distanceFromElevator),
          }),

    side,

    position: (value: Book['location']['position']) => {
      if (value === 'left') return t('location.left');
      if (value === 'right') return t('location.right');
      return t('location.middle');
    },

    level: (value: NonNullable<Book['level']>) =>
      value === 'intro' ? t('level.intro') : t('level.advanced'),

    loan: (loan: Book['loan']) =>
      loan.available
        ? t('status.available')
        : t('status.onLoan', { date: dayjs(loan.dueDate).format('M/D') }),

    recKind: (kind: Recommendation['kind']) => {
      switch (kind) {
        case 'intro':
          return t('level.intro');
        case 'advanced':
          return t('level.advanced');
        case 'borrowed-together':
          return t('recommendation.borrowedTogether');
        case 'outside-major':
          return t('recommendation.outsideMajor');
      }
    },

    recWhere: (where: Recommendation['where']) => {
      switch (where.type) {
        case 'same-shelf':
          return t('recommendation.sameShelf', { slot: String(where.slot) });
        case 'nearby':
          return t('recommendation.nearby', {
            shelf: String(where.shelf),
            distance: String(where.distance),
          });
        case 'adjacent':
          return t('recommendation.adjacent', { shelf: String(where.shelf) });
      }
    },
  };
}
