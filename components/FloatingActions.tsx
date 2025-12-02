
import React from 'react';
import { motion } from 'framer-motion';
import { Link, Download, Heart, Plus } from 'lucide-react';

interface FloatingActionsProps {
  onOpenCreateModal: () => void;
}

const FloatingActionButton: React.FC<{ children: React.ReactNode, delay: number, onClick?: () => void }> = ({ children, delay, onClick }) => {
    return (
        <motion.button 
            onClick={onClick}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: delay, type: 'spring', stiffness: 120 }}
            whileHover={{ scale: 1.1, backgroundColor: '#ffffff' }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/80 backdrop-blur-sm w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-indigo-600"
        >
            {children}
        </motion.button>
    );
}

const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenCreateModal }) => {
  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-4 md:right-8 z-40 hidden sm:flex flex-col space-y-4">
        <FloatingActionButton delay={0.8}>
            <Link size={24} />
        </FloatingActionButton>
        <FloatingActionButton delay={0.9}>
            <Download size={24} />
        </FloatingActionButton>
        <FloatingActionButton delay={1.0}>
            <Heart size={24} />
        </FloatingActionButton>
        <FloatingActionButton delay={1.1} onClick={onOpenCreateModal}>
            <Plus size={24} />
        </FloatingActionButton>
    </div>
  );
};

export default FloatingActions;
