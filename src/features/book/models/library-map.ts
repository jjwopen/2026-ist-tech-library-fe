import { FLOORS, type FloorId, type FloorMap } from './types';

/**
 * 층별 도면 SVG(`src/common/assets/floor-maps/{층}.svg`, 공식 통합 서가맵에서 추출)를
 * 허용한 도형·속성만 남기고 색을 테마 토큰으로 바꿔 직접 그릴 수 있게 변환.
 * 도면 파일은 층 화면에 들어갈 때만 불러오도록 분리
 */
const FLOOR_SVGS = import.meta.glob<string>('@/common/assets/floor-maps/*.svg', {
  query: '?raw',
  import: 'default',
});

const SVG_NS = 'http://www.w3.org/2000/svg';

const ALLOWED_TAGS = new Set([
  'g',
  'path',
  'rect',
  'polygon',
  'polyline',
  'line',
  'circle',
  'ellipse',
  'text',
  'tspan',
]);

const ALLOWED_ATTRS = new Set([
  'd',
  'x',
  'y',
  'x1',
  'y1',
  'x2',
  'y2',
  'cx',
  'cy',
  'r',
  'rx',
  'ry',
  'width',
  'height',
  'points',
  'transform',
  'font-size',
  'font-weight',
  'letter-spacing',
  'stroke-width',
  'stroke-miterlimit',
  'stroke-linecap',
  'stroke-linejoin',
]);

/** 원본 도면 색 → 테마 색 (다크 모드에서도 읽히도록) */
const COLOR_TOKENS: Record<string, string> = {
  '#000': 'var(--color-ink)',
  '#231815': 'var(--color-ink)',
  '#fff': 'var(--color-paper)',
  '#f2f2f2': 'var(--color-field)',
  '#b4e6ff': 'var(--color-field)',
  '#c9005f': 'var(--color-sub)',
};

/** 서가 요소 ID — `_3F-335`, `_4F_431`, `_2F_CUA-2` 등 */
const SHELF_ID = /^_\dF[-_][\w-]+$/i;

const num = (element: Element, name: string) => Number(element.getAttribute(name) ?? 0);

/** 마커를 올릴 도형 중심 — 선·사각형·원과 그 묶음만 계산 */
function centerOf(element: Element): { x: number; y: number } | null {
  switch (element.tagName) {
    case 'line':
      return {
        x: (num(element, 'x1') + num(element, 'x2')) / 2,
        y: (num(element, 'y1') + num(element, 'y2')) / 2,
      };
    case 'rect':
      return {
        x: num(element, 'x') + num(element, 'width') / 2,
        y: num(element, 'y') + num(element, 'height') / 2,
      };
    case 'circle':
    case 'ellipse':
      return { x: num(element, 'cx'), y: num(element, 'cy') };
    case 'g': {
      const points = [...element.children].map(centerOf).filter((point) => point !== null);
      if (points.length === 0) return null;
      return {
        x: points.reduce((sum, point) => sum + point.x, 0) / points.length,
        y: points.reduce((sum, point) => sum + point.y, 0) / points.length,
      };
    }
    default:
      return null;
  }
}

/** 허용 목록 밖의 요소·속성(스크립트, 링크, 이벤트 등)은 버리고 새 요소로 복사 */
function sanitize(source: Element, doc: Document, shelves: FloorMap['shelves']): Element | null {
  if (!ALLOWED_TAGS.has(source.tagName)) return null;

  const element = doc.createElementNS(SVG_NS, source.tagName);
  const styles: string[] = [];

  for (const { name, value } of source.attributes) {
    if (ALLOWED_ATTRS.has(name)) {
      element.setAttribute(name, value);
    } else if (name === 'fill' || name === 'stroke') {
      styles.push(`${name}:${COLOR_TOKENS[value.toLowerCase()] ?? value}`);
    }
  }
  if (styles.length > 0) element.setAttribute('style', styles.join(';'));

  const id = source.getAttribute('id');
  if (id && SHELF_ID.test(id)) {
    element.setAttribute('data-shelf', id);
    const center = centerOf(source);
    if (center) shelves[id] = center;
  }

  for (const child of source.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      element.appendChild(doc.createTextNode(child.textContent ?? ''));
    } else if (child instanceof Element) {
      const sanitized = sanitize(child, doc, shelves);
      if (sanitized) element.appendChild(sanitized);
    }
  }
  return element;
}

export async function loadFloorMaps(): Promise<Partial<Record<FloorId, FloorMap>>> {
  const parser = new DOMParser();
  const output = document.implementation.createDocument(SVG_NS, 'svg', null);
  const serializer = new XMLSerializer();
  const maps: Partial<Record<FloorId, FloorMap>> = {};

  for (const floor of FLOORS) {
    const load = Object.entries(FLOOR_SVGS).find(([path]) =>
      path.endsWith(`/${floor.toLowerCase()}.svg`),
    )?.[1];
    if (!load) continue;

    const svg = parser.parseFromString(await load(), 'image/svg+xml').documentElement;
    const viewBox = svg
      .getAttribute('viewBox')
      ?.split(/[\s,]+/)
      .map(Number);
    if (svg.tagName !== 'svg' || !viewBox || viewBox.length !== 4) continue;

    const shelves: FloorMap['shelves'] = {};
    const markup = [...svg.children]
      .map((child) => sanitize(child, output, shelves))
      .filter((element) => element !== null)
      .map((element) => serializer.serializeToString(element))
      .join('');

    maps[floor] = {
      floor,
      viewBox: { x: viewBox[0], y: viewBox[1], width: viewBox[2], height: viewBox[3] },
      markup,
      shelves,
    };
  }
  return maps;
}
