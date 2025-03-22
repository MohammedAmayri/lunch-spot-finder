
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
    <header className={`w-full py-4 px-6 absolute top-0 left-0 z-50`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-brand-500 flex items-center">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H21M3 12H21M3 18H21" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                transform="rotate(45 12 12)" />
              <path d="M3 6H21M3 12H21M3 18H21" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                transform="rotate(-45 12 12)" />
            </svg>
          </div>
          <span className="font-bold text-xl text-brand-500">
            Lunch Kompis
          </span>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <NavLinks />
        </nav>
        
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
  isMobile?: boolean;
  closeMenu?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ isMobile, closeMenu }) => {
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
            text-brand-500 hover:text-brand-700
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
