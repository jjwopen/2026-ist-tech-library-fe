import { useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';

import {
  type Book,
  type BookLocation as Location,
  type FloorMap,
  type Recommendation,
} from '../../../viewmodels';
import { useBookLabels } from '../../hooks';
import { bleed, prefersReducedMotion } from '../../motion';
import { InkIcon } from '../ink-icon';
import { PlanDrawing } from '../plan-drawing';
import { ShelfElevation, type ShelfMark } from '../shelf-elevation';

const SIDES: Location['side'][] = ['A', 'B'];

/**
 * 책 위치 — 서가 번호와 층·면·칸, 평행 투시 평면도, 서가 정면.
 * 앞면·뒷면을 누르면 서가가 돌아가고, 옅은 먹 자리(같은 서가의 비슷한 책)를 누르면 추천 이유가 뜸
 */
export function BookLocation({ book, floorMap, recommendations }: BookLocation.Props) {
  const { t } = useTranslation('book');
  const labels = useBookLabels();
  const location = book.location!;
  const [side, setSide] = useState(location.side);
  const [selected, setSelected] = useState<string | null>(null);
  const [fresh, setFresh] = useState(true);
  const elevRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const turning = useRef(false);

  const near = recommendations.filter(
    (rec) =>
      rec.book?.location &&
      rec.book.id !== book.id &&
      rec.book.location.floor === location.floor &&
      rec.book.location.shelf === location.shelf,
  );
  const marks: ShelfMark[] = [
    { id: book.id, title: book.title, location, target: true, loan: book.loan !== 'available' },
    ...near.map((rec) => ({
      id: rec.book!.id,
      title: rec.title,
      location: rec.book!.location!,
      loan: rec.book!.loan !== 'available',
    })),
  ];
  const selectedRec = near.find((rec) => rec.book!.id === selected) ?? null;

  const select = (id: string | null) => {
    setSelected(id);
    requestAnimationFrame(() => noteRef.current && bleed(noteRef.current.children, 0, 0));
  };

  // 서가가 옆으로 돌아 다른 면을 보여줌
  const turn = (next: Location['side']) => {
    const element = elevRef.current;
    if (next === side || turning.current) return;
    const flip = () => {
      setSide(next);
      setSelected(null);
      setFresh(false);
    };
    if (!element || prefersReducedMotion()) return flip();
    turning.current = true;
    const dir = next === 'B' ? 1 : -1;
    element.animate(
      [
        { transform: 'perspective(900px) rotateY(0deg)' },
        { transform: `perspective(900px) rotateY(${90 * dir}deg)` },
      ],
      { duration: 300, easing: 'cubic-bezier(.5,0,.9,.6)' },
    ).onfinish = () => {
      flip();
      element.animate(
        [
          { transform: `perspective(900px) rotateY(${-90 * dir}deg)` },
          { transform: 'perspective(900px) rotateY(0deg)' },
        ],
        { duration: 420, easing: 'cubic-bezier(.1,.5,.3,1)' },
      ).onfinish = () => {
        turning.current = false;
      };
    };
  };

  return (
    <>
      <div className="p-loc-head">
        <p className="lh-book" data-b>
          {book.title}
        </p>
        <h2 className="lh-answer" data-b data-mark>
          {labels.shelf(location.shelf)}
        </h2>
        <dl className="p-facts3" data-b>
          <div>
            <dt>{t('location.floorLabel')}</dt>
            <dd>{labels.floor(location.floor)}</dd>
          </div>
          <div>
            <dt>{t('location.faceLabel')}</dt>
            <dd>{labels.face(location.side)}</dd>
          </div>
          <div>
            <dt>{t('location.spotLabel')}</dt>
            <dd>{labels.spot(location)}</dd>
          </div>
        </dl>
      </div>

      <section className="p-read">
        {floorMap && (
          <>
            <h3 className="p-label" data-b>
              {t('location.planTitle', { floor: labels.floor(location.floor) })}
            </h3>
            <PlanDrawing
              map={floorMap}
              targetId={location.mapElementId}
              floorLabel={labels.floor(location.floor)}
            />
          </>
        )}
        <div className="p-slipbox" data-b>
          <div className="p-slip-h">
            <span className="p-pop-t">{labels.shelf(location.shelf)}</span>
            <div className="p-seg" role="group" aria-label={t('location.faces')}>
              {SIDES.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="p-seg-b"
                  aria-pressed={item === side}
                  onClick={() => turn(item)}
                >
                  {location.side === item ? (
                    <i className="p-fd t" />
                  ) : near.some((rec) => rec.book!.location!.side === item) ? (
                    <i className="p-fd" />
                  ) : null}
                  {labels.face(item)}
                </button>
              ))}
            </div>
          </div>
          <div ref={elevRef} className="p-elev">
            <ShelfElevation
              shelf={location.shelf}
              side={side}
              marks={marks}
              selectedId={selected}
              fresh={fresh}
              onSelect={(id) => select(id === selected ? null : id)}
            />
          </div>
          <div ref={noteRef} aria-live="polite">
            {selectedRec && (
              <div className="p-note-in">
                <div>
                  <p className="slip-t">{selectedRec.title}</p>
                  <p className="slip-w">{selectedRec.explanation}</p>
                  <p className="slip-m">
                    {labels.faceSpot(selectedRec.book!.location!)} ·{' '}
                    {labels.loan(selectedRec.book!.loan)}
                  </p>
                </div>
                <button
                  type="button"
                  className="p-icon-btn slip-x"
                  aria-label={t('location.closeNote')}
                  onClick={() => select(null)}
                >
                  <InkIcon name="close" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export namespace BookLocation {
  export type Props = {
    book: Book;
    floorMap: FloorMap | null;
    recommendations: Recommendation[];
  };
}
