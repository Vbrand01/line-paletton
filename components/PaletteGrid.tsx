import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star, LayoutGrid, Blend, BookCopy, Sun, Snowflake, Feather, ArrowLeft } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { Palette, PaletteCategory } from '../types';
import PaletteCard from './PaletteCard';

interface PaletteGridProps {
  palettes: Palette[];
  view: 'home' | 'allPalettes';
  onNavigateHome: () => void;
}

const categoryIcons: Record<PaletteCategory, React.ElementType> = {
  Populares: Star,
  Todas: LayoutGrid,
  Gradientes: Blend,
  Neutros: BookCopy,
  Quentes: Sun,
  Frias: Snowflake,
  Pastéis: Feather,
};


const PaletteGrid: React.FC<PaletteGridProps> = ({ palettes, view, onNavigateHome }) => {
  const [activeCategory, setActiveCategory] = useState<PaletteCategory>('Populares');

  useEffect(() => {
    setActiveCategory(view === 'allPalettes' ? 'Todas' : 'Populares');
  }, [view]);

  const filteredPalettes = useMemo(() => {
    if (activeCategory === 'Todas') {
      return palettes;
    }
    if (activeCategory === 'Populares') {
      return palettes.filter(palette => palette.isPopular);
    }
    return palettes.filter(palette => palette.category === activeCategory);
  }, [activeCategory, palettes]);

  const gridCategories = view === 'allPalettes' ? CATEGORIES : CATEGORIES.filter(c => c !== 'Todas');

  return (
    <div className="py-12">
      <div className="flex justify-center mb-12 flex-wrap gap-4 items-center">
        {view === 'allPalettes' && (
           <button onClick={onNavigateHome} className="creative-button">
             <span>
                <ArrowLeft size={16} />
                Voltar para a página inicial
              </span>
           </button>
        )}
        {gridCategories.map((category) => {
          const Icon = categoryIcons[category];
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`creative-button ${
                activeCategory === category ? 'active' : ''
              }`}
            >
              <span>
                <Icon size={16} />
                {category}
              </span>
            </button>
          )
        })}
      </div>

      <motion.div 
        layout 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        <AnimatePresence>
          {filteredPalettes.map((palette) => (
            <PaletteCard key={palette.id} palette={palette} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PaletteGrid;
