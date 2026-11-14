import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { type Book, type Recommendation } from '../../viewmodels';

type Location = Book['location'];

/** 책 데이터를 화면 문구로 바꾸는 포맷터 모음 */
export function useBookLabels() {
  const { t } = useTranslation('book');

  // 키를 상수 맵으로 빼면 i18next-cli가 사용 중인 키로 인식하지 못해 추출 시 삭제됨
  const side = (value: Location['side']) =>
    value === 'front' ? t('location.front') : t('location.back');

  const recKind = (kind: Recommendation['kind']) => {
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
  };

  return {
    /** 목록 순번 "01" */
    index: (value: number) => String(value).padStart(2, '0'),

    /** "3F · 27번 서가" / "3F · 27번 서가 · 3칸" */
    location: ({ floor, shelf, slot }: Location, withSlot = true) =>
      withSlot && slot
        ? t('location.shelfSlot', { floor, shelf, slot })
        : t('location.shelf', { floor, shelf }),

    /** "27번 서가 앞면 3칸 · 엘리베이터에서 약 20m" */
    directions: ({ shelf, side: value, slot, distanceFromElevator: distance }: Location) =>
      slot
        ? t('location.directionsSlot', { shelf, side: side(value), slot, distance })
        : t('location.directions', { shelf, side: side(value), distance }),

    side,

    position: (value: Location['position']) => {
      if (value === 'left') return t('location.left');
      if (value === 'right') return t('location.right');
      return t('location.middle');
    },

    level: (value: NonNullable<Book['level']>) => recKind(value),

    loan: (loan: Book['loan']) =>
      loan.available
        ? t('status.available')
        : t('status.onLoan', { date: dayjs(loan.dueDate).format('M/D') }),

    recKind,

    recWhere: (where: Recommendation['where']) => {
      switch (where.type) {
        case 'same-shelf':
          return t('recommendation.sameShelf', { slot: where.slot });
        case 'nearby':
          return t('recommendation.nearby', { shelf: where.shelf, distance: where.distance });
        case 'adjacent':
          return t('recommendation.adjacent', { shelf: where.shelf });
      }
    },
  };
}
