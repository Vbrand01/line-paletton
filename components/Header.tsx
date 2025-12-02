import React from 'react';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateAll: () => void;
  onOpenCreateModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateHome, onNavigateAll, onOpenCreateModal }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <div className="h-14 flex items-center justify-center px-4">
          <button onClick={onNavigateHome} className="flex items-center p-5 mt-10 hover:opacity-90 transition-opacity bg-white/20 backdrop-blur-lg rounded-lg border border-gray-200/60 ">
            <img src="/assets/logo.svg" alt="Line Paletton" className="h-12 w-auto" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
