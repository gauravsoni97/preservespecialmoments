import React from 'react';
import { Heart } from 'lucide-react';

import heroImg from '../assets/images/hero/hero.jpg';

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section id="home" className="pt-16 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 bg-clip-text text-transparent">
                  Preserve
                </span>
                <br />
                <span className="text-gray-800">Special Moments</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Transform your cherished memories into stunning handcrafted resin art pieces.
                From wedding flowers to memorial keepsakes, we create timeless treasures that last forever.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('products')}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Shop Now
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="px-8 py-4 border-2 border-pink-300 text-pink-600 rounded-full font-semibold hover:bg-pink-50 transition-all duration-300"
              >
                Know More
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">50+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">100+</div>
                <div className="text-sm text-gray-600">Pieces Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">4.7★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-3xl transform rotate-6 opacity-20"></div>
            <img
              src={heroImg}
              alt="Beautiful resin art piece"
              className="relative rounded-3xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-pink-500" />
                <span className="text-sm font-semibold text-gray-700">Handcrafted with Love</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;