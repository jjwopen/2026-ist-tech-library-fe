import { type CSSProperties, useState } from 'react';

import { cn, isLightColor } from '@/common/utils';

const MOTIFS = ['grid', 'circle', 'frame', 'band'] as const;

const hash = (text: string) =>
  [...text].reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 7);

/**
 * 표지 — 한지 위에 놓인 인쇄물. 왼쪽 책등 접힘과 두께만큼의 종이 단면을 그림.
 * 표지 이미지가 있으면 그 위에, 없거나 불러오지 못하면 대표색·무늬로 그린 표지
 */
export function Cover({ title, author, publisher, color, image, seed, className }: Cover.Props) {
  const [failed, setFailed] = useState(false);
  const showImage = !!image && !failed;
  const h = hash(seed ?? title);
  const motif = MOTIFS[h % MOTIFS.length];
  // 700쪽 교재와 얇은 책의 차이처럼 두께를 책마다 다르게
  const thickness = 0.95 + ((h >> 3) % 12) * 0.1;

  return (
    <div
      className={cn('bk', className)}
      style={{ '--c': color, '--t': thickness } as CSSProperties}
    >
      <div className={cn('cover', `cv-${motif}`, isLightColor(color) && 'light')}>
        {showImage ? (
          <img
            className="cv-image"
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
          />
        ) : (
          <>
            <span className="cv-title">{title}</span>
            <span className="cv-motif" />
            {author && (
              <span className="cv-author">
                {author}
                {publisher && <i>{publisher}</i>}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export namespace Cover {
  export type Props = {
    title: string;
    author?: string;
    publisher?: string | null;
    /** 표지 대표색 (hex) — 이미지가 없을 때 표지, 있을 때도 두께 단면 색 */
    color: string;
    /** 표지 이미지 URL */
    image?: string | null;
    /** 무늬·두께를 정하는 값 (기본: 제목) */
    seed?: string;
    className?: string;
  };
}
