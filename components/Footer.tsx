
import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-24">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-base text-gray-500">&copy; 2025 Line Paletton. Todos os direitos reservados.</p>
        <div className="mt-6 flex justify-center space-x-6">
          <a href="https://github.com/Vbrand01" className="text-gray-400 hover:text-gray-500 transition-colors" aria-label="GitHub">
            <span className="sr-only">GitHub</span>
            <Github className="h-6 w-6" />
          </a>
          <a href="https://www.linkedin.com/in/vmbrandao/" className="text-gray-400 hover:text-gray-500 transition-colors" aria-label="LinkedIn">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
