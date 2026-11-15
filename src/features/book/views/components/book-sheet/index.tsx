import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import { useBookSheet, type Book, type SheetSource } from '../../../viewmodels';
import { type PressOrigin } from '../../hooks';
import { bleed, D, EASE, prefersReducedMotion, run, sweep } from '../../motion';
import { BookInfo } from '../book-info';
import { BookLocation } from '../book-location';
import { InkIcon } from '../ink-icon';

type SheetActions = {
  /** 누른 자리(origin)에서 먹이 번지며 책 정보가 열림 */
  openBook: (source: SheetSource, origin: PressOrigin) => void;
  toast: (message: string) => void;
};

const SheetContext = createContext<SheetActions | null>(null);

export function useSheetActions() {
  const actions = useContext(SheetContext);
  if (!actions) throw new Error('useSheetActions must be used inside BookSheetProvider');
  return actions;
}

/** 책 정보 시트·알림을 화면에 제공 */
export function BookSheetProvider({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState<{
    source: SheetSource;
    origin: PressOrigin;
    key: number;
  } | null>(null);
  const [toastText, setToastText] = useState('');
  const toastTimer = useRef(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation('book');

  const toast = useCallback((message: string) => {
    setToastText(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastText(''), 1800);
  }, []);

  const openBook = useCallback<SheetActions['openBook']>((source, origin) => {
    setOpened((prev) => {
      if (prev) {
        origin.ink?.release();
        return prev;
      }
      return { source, origin, key: Date.now() };
    });
  }, []);

  // 마우스로는 표지 위에서 "꾹 · 자세히" 안내가 손끝을 따라옴
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const move = (event: PointerEvent) => {
      const cursor = cursorRef.current;
      if (!cursor) return;
      const on = !!(event.target as Element | null)?.closest?.('.p-cover-btn');
      cursor.classList.toggle('on', on);
      if (on) {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
      }
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <SheetContext.Provider value={{ openBook, toast }}>
      <div className="primo-theme">
        {children}
        {opened && (
          <BookSheet
            key={opened.key}
            source={opened.source}
            origin={opened.origin}
            onClosed={() => setOpened(null)}
          />
        )}
        {!opened && (
          <div ref={cursorRef} className="p-cursor" aria-hidden>
            {t('home.pressCursor')}
          </div>
        )}
        <div className={cn('p-toast', toastText && 'show')} role="status" aria-live="polite">
          {toastText}
        </div>
      </div>
    </SheetContext.Provider>
  );
}

/** 한지 한 장 — 책 정보와 책 위치 두 면 */
function BookSheet({
  source: initial,
  origin,
  onClosed,
}: {
  source: SheetSource;
  origin: PressOrigin;
  onClosed: () => void;
}) {
  const { t } = useTranslation('book');
  const [source, setSource] = useState(initial);
  const [view, setView] = useState<'info' | 'loc'>('info');
  const [stuck, setStuck] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const busy = useRef(true);
  const sheet = useBookSheet(source);
  const { book } = sheet;

  // 열기: 손끝의 먹이 종이로 스며들고, 같은 자리에서 시트가 번져 나옴
  useLayoutEffect(() => {
    const element = sheetRef.current!;
    const hide = 'radial-gradient(circle at 0 0, rgba(0,0,0,0) 0, rgba(0,0,0,0) 1px)';
    element.style.maskImage = hide;
    element.style.setProperty('-webkit-mask-image', hide);
    origin.ink?.release();
    document.body.style.overflow = 'hidden';
    const items = bodyRef.current?.querySelectorAll<HTMLElement>('[data-b]') ?? [];
    items.forEach((item) => (item.style.opacity = '0'));
    if (ctaRef.current) ctaRef.current.style.opacity = '0';
    const reveal = window.setTimeout(() => {
      items.forEach((item) => (item.style.opacity = ''));
      bleed(items, 0, 70);
      if (ctaRef.current) {
        run(
          ctaRef.current,
          [
            { opacity: 0, transform: 'translateY(10px)' },
            { opacity: 1, transform: 'none' },
          ],
          {
            duration: D(700),
            delay: D(250),
            easing: EASE,
          },
        );
      }
    }, D(900));
    sweep(element, origin.x, origin.y, true, 2000).then(() => {
      busy.current = false;
      if (prefersReducedMotion()) items.forEach((item) => (item.style.opacity = ''));
      // 키보드로 열었을 때만 닫기 버튼으로 초점 이동
      if (!origin.ink)
        sheetRef.current?.querySelector<HTMLButtonElement>('.p-x')?.focus({ preventScroll: true });
    });
    return () => {
      clearTimeout(reveal);
      document.body.style.overflow = '';
    };
    // 열릴 때 한 번만
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 제목으로 찾던 책이 도착하면 그 내용도 번지며 나타남
  const bookId = book?.id;
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (bookId) bleed(bodyRef.current?.querySelectorAll('[data-b]') ?? [], 0, 50);
  }, [bookId]);

  const close = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    const target = origin.element.isConnected ? origin.element.getBoundingClientRect() : null;
    const x = target ? target.left + target.width / 2 : origin.x;
    const y = target ? target.top + target.height / 2 : origin.y;
    await sweep(sheetRef.current!, x, y, false, 900);
    onClosed();
    origin.element.focus({ preventScroll: true });
  }, [origin, onClosed]);

  // 정보 ↔ 위치: 지금 면이 흐려지며 사라지고 다른 면이 번져 나옴
  const swap = async (to: 'info' | 'loc') => {
    if (busy.current || to === view) return;
    busy.current = true;
    const body = bodyRef.current!;
    await Promise.all([
      run(
        body,
        [
          { opacity: 1, filter: 'blur(0px)' },
          { opacity: 0, filter: 'blur(3px)' },
        ],
        { duration: D(260) },
      ),
      ctaRef.current && run(ctaRef.current, [{ opacity: 1 }, { opacity: 0 }], { duration: D(200) }),
    ]);
    setView(to);
    requestAnimationFrame(() => {
      body.style.opacity = '';
      body.style.filter = '';
      scrollRef.current!.scrollTop = 0;
      bleed(body.querySelectorAll('[data-b]'), 0, 60);
      if (ctaRef.current) {
        run(ctaRef.current, [{ opacity: 0 }, { opacity: 1 }], {
          duration: D(500),
          delay: D(200),
          easing: EASE,
        });
      }
      busy.current = false;
    });
  };

  // 비슷한 책을 고르면 시트는 그대로, 내용만 바뀜
  const switchBook = async (next: Book) => {
    if (busy.current) return;
    busy.current = true;
    const body = bodyRef.current!;
    await run(
      body,
      [
        { opacity: 1, filter: 'blur(0px)' },
        { opacity: 0, filter: 'blur(3px)' },
      ],
      { duration: D(240) },
    );
    setSource({ book: next });
    setView('info');
    requestAnimationFrame(() => {
      body.style.opacity = '';
      body.style.filter = '';
      scrollRef.current!.scrollTop = 0;
      busy.current = false;
    });
  };

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [close]);

  const barTitle =
    view === 'loc' && book?.location
      ? t('location.shelf', { shelf: book.location.shelf })
      : book?.title;

  return (
    <div
      ref={sheetRef}
      className="p-sheet"
      role="dialog"
      aria-modal="true"
      aria-label={book?.title ?? t('sheet.label')}
    >
      <div className="p-leaf">
        <div className={cn('p-leaf-bar', stuck && 'stuck')}>
          <span className="p-bar-t">{barTitle}</span>
          <button
            type="button"
            className="p-icon-btn p-x"
            aria-label={t('sheet.close')}
            onClick={close}
          >
            <InkIcon name="close" />
          </button>
        </div>
        <div
          ref={scrollRef}
          className="p-leaf-scroll"
          onScroll={(event) => {
            const mark = bodyRef.current?.querySelector<HTMLElement>('[data-mark]');
            const top = event.currentTarget.scrollTop;
            setStuck(!!mark && top > mark.offsetTop + mark.offsetHeight - 64);
          }}
        >
          <div ref={bodyRef}>
            {book ? (
              view === 'info' ? (
                <BookInfo
                  book={book}
                  intro={sheet.intro}
                  recommendations={sheet.recommendations}
                  recsLoading={sheet.recsLoading}
                  onSelectSimilar={switchBook}
                />
              ) : (
                <BookLocation
                  book={book}
                  floorMap={sheet.floorMap}
                  recommendations={sheet.recommendations}
                />
              )
            ) : (
              <p className="p-para" data-b>
                {sheet.status === 'pending' ? t('sheet.finding') : t('sheet.missing')}
              </p>
            )}
          </div>
        </div>
        {book?.location && (
          <div ref={ctaRef} className="p-cta">
            {view === 'info' ? (
              <button type="button" className="p-btn" onClick={() => swap('loc')}>
                <InkIcon name="shelf" />
                {t('sheet.toLocation')}
              </button>
            ) : (
              <button type="button" className="p-btn" onClick={() => swap('info')}>
                <InkIcon name="back" />
                {t('sheet.toInfo')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
