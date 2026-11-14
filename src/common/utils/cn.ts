import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// styles.css에 정의한 커스텀 텍스트 사이즈를 색상 클래스와 구분하기 위해 등록
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'heading',
            'title',
            'body',
            'label',
            'caption',
            'tiny',
            'display',
            'display-sm',
            'h1',
            'h2',
            'subtitle',
            'body-lg',
            'small',
            'meta',
            'overline',
          ],
        },
      ],
    },
  },
});

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}
