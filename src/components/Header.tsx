import React from 'react';
import { ShoppingCart, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  getTotalItems: () => number;
}

const Header: React.FC<HeaderProps> = ({ 
  activeSection, 
  scrollToSection, 
  setIsCartOpen, 
  getTotalItems 
}) => {
  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-lg z-50 border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-pink-500" />
            <button 
              onClick={() => scrollToSection('home')}
              className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent"
            >
              Preserve Special Moments
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className={`transition-colors ${activeSection === 'home' ? 'text-pink-600 font-semibold' : 'text-gray-700 hover:text-pink-600'}`}
            >
              Home
              {activeSection === 'home' && (
                <div className="h-0.5 bg-pink-500 rounded-full mt-1"></div>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('products')} 
              className={`transition-colors ${activeSection === 'products' ? 'text-pink-600 font-semibold' : 'text-gray-700 hover:text-pink-600'}`}
            >
              Products
              {activeSection === 'products' && (
                <div className="h-0.5 bg-pink-500 rounded-full mt-1"></div>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('reviews')} 
              className={`transition-colors ${activeSection === 'reviews' ? 'text-pink-600 font-semibold' : 'text-gray-700 hover:text-pink-600'}`}
            >
              Reviews
              {activeSection === 'reviews' && (
                <div className="h-0.5 bg-pink-500 rounded-full mt-1"></div>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className={`transition-colors ${activeSection === 'about' ? 'text-pink-600 font-semibold' : 'text-gray-700 hover:text-pink-600'}`}
            >
              About
              {activeSection === 'about' && (
                <div className="h-0.5 bg-pink-500 rounded-full mt-1"></div>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className={`transition-colors ${activeSection === 'contact' ? 'text-pink-600 font-semibold' : 'text-gray-700 hover:text-pink-600'}`}
            >
              Contact
              {activeSection === 'contact' && (
                <div className="h-0.5 bg-pink-500 rounded-full mt-1"></div>
              )}
            </button>
          </div>

          {/* Cart button hidden since we're not using cart functionality */}
          <div className="hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-pink-800 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;