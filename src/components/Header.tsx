import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomePage = location.pathname === '/';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`w-full py-4 px-4 sm:px-6 md:px-8 ${isHomePage ? 'absolute top-0 left-0 z-50 bg-white' : 'bg-white shadow-sm'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-brand-500 flex items-center">
            <img 
              src="/lovable-uploads/d17e11fa-ff15-4eb8-89b7-279feb816a8a.png" 
              alt="Lunch Kompis Logo" 
              className="w-6 h-6"
            />
          </div>
          <span className="font-bold text-xl text-brand-500">
            Lunch Kompis
          </span>
        </Link>
        
        <div className="hidden md:flex space-x-8">
          <NavLinks isHomePage={false} />
        </div>
        
        <button
          className="md:hidden text-brand-500"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white shadow-lg rounded-b-lg mt-4 overflow-hidden absolute left-0 right-0 z-50"
          >
            <div className="px-4 py-5 space-y-4">
              <NavLinks isMobile={true} closeMenu={() => setIsMenuOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

interface NavLinksProps {
  isHomePage?: boolean;
  isMobile?: boolean;
  closeMenu?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ isHomePage, isMobile, closeMenu }) => {
  const location = useLocation();
  
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Search', path: '/search' },
    { name: 'About', path: '/about' }
  ];
  
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`
            ${isMobile ? 'block py-2 text-brand-600' : ''}
            ${isHomePage ? 'text-gray-700 hover:text-brand-500' : 'text-gray-700 hover:text-brand-500'}
            font-medium transition-all duration-200
            ${location.pathname === link.path ? 'font-bold' : ''}
          `}
          onClick={closeMenu}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default Header;
