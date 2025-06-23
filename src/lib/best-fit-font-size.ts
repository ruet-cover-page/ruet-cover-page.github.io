export function measureWrappedLineCount(
  text: string,
  fontSize: number,
  fontFamily: string,
  maxWidth: number,
) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  ctx.font = `${fontSize}px ${fontFamily}`;

  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) lines.push(currentLine);

  return lines.length;
}

export function getBestFitFontSize({
  text,
  fontFamily,
  maxWidth,
  maxHeight,
  minFontSize = 1,
  maxFontSize = 100,
  lineHeightMultiplier = 4 / 3,
}: {
  text: string;
  fontFamily: string;
  maxWidth: number;
  maxHeight: number;
  minFontSize?: number;
  maxFontSize?: number;
  lineHeightMultiplier?: number;
}) {
  let low = minFontSize;
  let high = maxFontSize;
  let bestFit = minFontSize;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const lineCount = text
      .trim()
      .split('\n')
      .reduce(
        (acc, line) =>
          acc + measureWrappedLineCount(line, mid, fontFamily, maxWidth),
        0,
      );
    const lineHeight = mid * lineHeightMultiplier;
    const height = lineHeight * lineCount;

    if (height <= maxHeight) {
      bestFit = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return bestFit;
}
