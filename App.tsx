import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PaletteGrid from './components/PaletteGrid';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';
import CreatePaletteModal from './components/CreatePaletteModal';
import { Palette } from './types';
import { usePalettes } from './usePalettes';

type View = 'home' | 'allPalettes';

const App: React.FC = () => {
  const [palettes, addPalette] = usePalettes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<View>('home');
  
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  
  const handleSavePalette = (newPaletteData: Omit<Palette, 'id'>) => {
    addPalette(newPaletteData);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased circuit-wrapper">
      <div className="circuit-background"></div>
      <div className="relative z-10">
        <Header 
          onNavigateHome={() => setView('home')} 
          onNavigateAll={() => setView('allPalettes')} 
          onOpenCreateModal={handleOpenModal}
        />
        <main className="pt-24 px-4 sm:px-6 lg:px-8">
          {view === 'home' && <Hero onNavigateToPalettes={() => setView('allPalettes')} />}
          <PaletteGrid 
            palettes={palettes} 
            view={view}
            onNavigateHome={() => setView('home')}
          />
        </main>
        {/* <FloatingActions onOpenCreateModal={handleOpenModal} /> */}
        <Footer />
        <CreatePaletteModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSavePalette}
        />
      </div>
    </div>
  );
};

export default App;
