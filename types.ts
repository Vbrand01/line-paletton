
export type PaletteCategory = 'Todas' | 'Populares' | 'Gradientes' | 'Neutros' | 'Quentes' | 'Frias' | 'Pastéis';

export interface Palette {
  id: number;
  name: string;
  colors: string[];
  category: PaletteCategory;
  isPopular?: boolean;
}
