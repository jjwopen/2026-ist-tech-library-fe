import elevator from './floor-plan/elevator.svg';
import north from './floor-plan/north.svg';
import route from './floor-plan/route.svg';
import start from './floor-plan/start.svg';
import back from './icons/back.svg';
import map from './icons/map.svg';
import pinSmall from './icons/pin-small.svg';
import pin from './icons/pin.svg';
import searchSmall from './icons/search-small.svg';
import searchWhite from './icons/search-white.svg';
import search from './icons/search.svg';

/** Figma `icon/*` 컴포넌트에서 내려받은 아이콘 */
export const ICONS = {
  back,
  map,
  pin,
  pinSmall,
  search,
  searchSmall,
  searchWhite,
} as const;

/** 층 평면도 전용 도형 */
export const FLOOR_PLAN_ASSETS = {
  north: { src: north, width: 8, height: 8 },
  elevator: { src: elevator, width: 26.7071, height: 26.7071 },
  route: { src: route, width: 17, height: 103 },
  start: { src: start, width: 12, height: 12 },
} as const;
