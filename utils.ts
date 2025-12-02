
import { Palette } from './types';

export const exportPaletteAsPNG = (palette: Palette): void => {
  const canvas = document.createElement('canvas');
  const TILE_WIDTH = 200;
  const TILE_HEIGHT = 250;
  const PADDING = 50;
  const HEADER_HEIGHT = 120;
  const FOOTER_HEIGHT = 80;
  
  const FONT_FAMILY = 'Inter, sans-serif';

  canvas.width = palette.colors.length * TILE_WIDTH + PADDING * 2;
  canvas.height = TILE_HEIGHT + HEADER_HEIGHT + FOOTER_HEIGHT;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#1f2937'; // text-gray-800
  ctx.font = `bold 48px ${FONT_FAMILY}`;
  ctx.textAlign = 'center';
  ctx.fillText(palette.name, canvas.width / 2, HEADER_HEIGHT);

  palette.colors.forEach((color, index) => {
    const x = PADDING + index * TILE_WIDTH;
    const y = HEADER_HEIGHT;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, TILE_WIDTH, TILE_HEIGHT);

    ctx.fillStyle = '#4b5563'; // text-gray-600
    ctx.font = `24px ${FONT_FAMILY}`;
    ctx.textAlign = 'center';
    ctx.fillText(color.toUpperCase(), x + TILE_WIDTH / 2, y + TILE_HEIGHT + 50);
  });

  const link = document.createElement('a');
  link.download = `${palette.name.replace(/\s+/g, '_').toLowerCase()}_palette.png`;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
