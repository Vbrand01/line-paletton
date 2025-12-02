
import { useState, useEffect } from 'react';
import { Palette } from './types';
import { PALETTES as initialPalettes } from './constants';

const CATEGORY_MAP_EN_TO_PT: Record<string, import('./types').PaletteCategory> = {
  All: 'Todas',
  Popular: 'Populares',
  Gradients: 'Gradientes',
  Neutrals: 'Neutros',
  Warm: 'Quentes',
  Cool: 'Frias',
  Pastel: 'Pastéis',
};

const NEW_STORAGE_KEY = 'linepaletton_palettes';
const OLD_STORAGE_KEYS = ['colorly_palettes'];

export const usePalettes = (): [Palette[], (newPaletteData: Omit<Palette, 'id'>) => void] => {
  const [palettes, setPalettes] = useState<Palette[]>(() => {
    try {
      const storedNew = window.localStorage.getItem(NEW_STORAGE_KEY);
      const storedLegacy = (() => {
        for (const key of OLD_STORAGE_KEYS) {
          const val = window.localStorage.getItem(key);
          if (val) return val;
        }
        return null;
      })();
      const source = storedNew ?? storedLegacy;
      if (source) {
        const parsed = JSON.parse(source);
        if (Array.isArray(parsed)) {
          const mapped = parsed.map(p => ({
            ...p,
            category: CATEGORY_MAP_EN_TO_PT[p.category] ?? p.category,
          }));
          const existingIds = new Set(mapped.map(p => p.id));
          const additions = initialPalettes.filter(p => !existingIds.has(p.id));
          return [...mapped, ...additions];
        }
        return initialPalettes;
      }
    } catch (error) {
      console.error('Error reading palettes from localStorage', error);
    }
    return initialPalettes;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(NEW_STORAGE_KEY, JSON.stringify(palettes));
    } catch (error) {
      console.error('Error saving palettes to localStorage', error);
    }
  }, [palettes]);

  const addPalette = (newPaletteData: Omit<Palette, 'id'>) => {
    const newPalette: Palette = {
      id: palettes.length > 0 ? Math.max(...palettes.map(p => p.id), 0) + 1 : 1,
      ...newPaletteData,
    };
    setPalettes(prevPalettes => [newPalette, ...prevPalettes]);
  };

  return [palettes, addPalette];
};
