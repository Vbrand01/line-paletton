import React from 'react';
import { motion } from 'framer-motion';
import { HandWrittenTitle } from './HandWrittenTitle';

interface HeroProps {
  onNavigateToPalettes: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToPalettes }) => {
  return (
    <div className="text-center py-16 md:py-20">
      <HandWrittenTitle
        title="Explore paletas de cores selecionadas"
        subtitle="Descubra e copie paletas de cores para seu próximo projeto."
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        className="mt-10"
      >
        <button 
          onClick={onNavigateToPalettes}
          className="creative-button angled w-52"
        >
          <span>Ver todas as paletas</span>
        </button>
      </motion.div>
    </div>
  );
};

export default Hero;
