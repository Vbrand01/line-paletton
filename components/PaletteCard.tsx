import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from '../types';
import { Check, Copy, MoreHorizontal, ClipboardCopy, FileDown, Paintbrush } from 'lucide-react';
import { exportPaletteAsPNG } from '../utils';

interface PaletteCardProps {
  palette: Palette;
}

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.95 },
};

interface ColorBlockProps {
  color: string;
  isFirst: boolean;
  isLast: boolean;
}

const ColorBlock: React.FC<ColorBlockProps> = ({ color, isFirst, isLast }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const blockClasses = [
    'h-20', 'w-full', 'relative', 'group', 'cursor-pointer',
    isFirst ? 'rounded-tl-2xl' : '',
    isLast ? 'rounded-tr-2xl' : ''
  ].filter(Boolean).join(' ');

  return (
    <div
      onClick={handleCopy}
      className={blockClasses}
      style={{ backgroundColor: color }}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"
      ></div>
      <div className="absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
        <div className="flex items-center gap-2 bg-gray-900 text-white text-sm font-mono p-2 rounded-md whitespace-nowrap shadow-lg">
          {copied ? (
            <>
              <Check size={16} className="text-green-400" />
              <span>Copiado!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>{color.toUpperCase()}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};


const PaletteCard: React.FC<PaletteCardProps> = ({ palette }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [copiedStates, setCopiedStates] = useState({ all: false, css: false });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleCopy = (type: 'all' | 'css') => {
    const textToCopy = type === 'all'
      ? palette.colors.join(', ')
      : palette.colors.map((c, i) => `  --color-${palette.name.toLowerCase().replace(/\s+/g, '-')}-${i + 1}: ${c};`).join('\n');

    navigator.clipboard.writeText(textToCopy);
    setCopiedStates({ ...copiedStates, [type]: true });
    setMenuOpen(false);
    setTimeout(() => setCopiedStates({ ...copiedStates, [type]: false }), 2000);
  };
  
  const handleExport = () => {
      exportPaletteAsPNG(palette);
      setMenuOpen(false);
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      whileHover={{ y: -5 }}
      className="creative-surface angled"
    >
      <div className="creative-panel">
      <div className="flex flex-row rounded-t-2xl">
        {palette.colors.map((color, index) => (
          <ColorBlock 
            key={`${palette.id}-${index}`} 
            color={color}
            isFirst={index === 0}
            isLast={index === palette.colors.length - 1}
           />
        ))}
      </div>
      <div className="p-4 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 truncate pr-2">{palette.name}</h3>
        <div className="relative" ref={menuRef}>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!isMenuOpen)} 
            className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            aria-label="Ações da paleta"
          >
            <MoreHorizontal size={20} />
          </motion.button>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute right-0 bottom-full mb-2 w-48 bg-white/80 backdrop-blur-lg rounded-lg shadow-2xl ring-1 ring-gray-900/5 z-20 p-2"
              >
                <button onClick={() => handleCopy('all')} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                  {copiedStates.all ? <Check size={16} className="text-green-500"/> : <Paintbrush size={16}/>}
                  <span>{copiedStates.all ? 'Copiado!' : 'Copiar todas as cores'}</span>
                </button>
                <button onClick={() => handleCopy('css')} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                  {copiedStates.css ? <Check size={16} className="text-green-500"/> : <ClipboardCopy size={16}/>}
                  <span>{copiedStates.css ? 'Copiado!' : 'Copiar como CSS'}</span>
                </button>
                <button onClick={handleExport} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                  <FileDown size={16} />
                  <span>Exportar como PNG</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      </div>
    </motion.div>
  );
};

export default PaletteCard;
