import { useTranslation } from 'react-i18next';

import { type Book, type BookLocation } from '../../viewmodels';

/** 책 데이터를 화면 문구로 바꾸는 포맷터 모음 */
export function useBookLabels() {
  const { t } = useTranslation('book');

  /** 서가 면 — 청구기호 앞 절반(A)은 앞면, 뒤 절반(B)은 뒷면 */
  const face = (side: BookLocation['side']) => (side === 'A' ? t('face.front') : t('face.back'));

  /** "3단 5칸" */
  const spot = ({ slot, column }: Pick<BookLocation, 'slot' | 'column'>) =>
    t('location.spot', { slot, column });

  return {
    face,
    spot,
    /** "3층" */
    floor: (floor: BookLocation['floor']) => t('location.floor', { floor: floor.replace('F', '') }),
    /** "335번 서가" */
    shelf: (shelf: string) => t('location.shelf', { shelf }),
    /** "앞면 3단 5칸" */
    faceSpot: (location: BookLocation) => `${face(location.side)} ${spot(location)}`,
    /** "335번 서가 · 앞면 3단 5칸" */
    place: (location: BookLocation) =>
      t('location.place', {
        shelf: location.shelf,
        face: face(location.side),
        spot: spot(location),
      }),
    loan: (loan: Book['loan']) => {
      if (loan === 'available') return t('status.available');
      if (loan === 'unavailable') return t('status.unavailable');
      return t('status.unknown');
    },
    /** "14권" / 더 있으면 "20권 이상" */
    count: (n: number, more = false) =>
      more ? t('search.countMore', { n }) : t('search.count', { n }),
  };
}
