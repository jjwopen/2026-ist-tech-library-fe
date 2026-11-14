const COVER_COLORS = [
  ['#e63b2e', '#1b1b1b'],
  ['#f6c026', '#1b1b1b'],
  ['#1f3b4d', '#f2e3c6'],
  ['#e8ded1', '#b5302a'],
  ['#2f5d50', '#f6c026'],
  ['#f08a24', '#1b1b1b'],
  ['#1b1b1b', '#f2e3c6'],
  ['#7a2e3a', '#f6c026'],
] as const;

function hash(text: string) {
  return [...text].reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 7);
}

function escapeXml(text: string) {
  return text.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);
}

/** 외부 네트워크 없이 사용할 수 있는 SVG 책 표지 목업 (data URI) */
export function mockCover(title: string) {
  const [bg, fg] = COVER_COLORS[hash(title) % COVER_COLORS.length];
  const words = title.split(/\s+/).slice(0, 4);
  const lines = words
    .map(
      (word, index) =>
        `<text x="16" y="${52 + index * 30}" font-family="Georgia, serif" font-size="26" font-weight="700" fill="${fg}">${escapeXml(word)}</text>`,
    )
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="350" viewBox="0 0 220 350"><rect width="220" height="350" fill="${bg}"/><circle cx="170" cy="280" r="70" fill="${fg}" opacity="0.15"/><rect x="16" y="310" width="60" height="4" fill="${fg}"/>${lines}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
