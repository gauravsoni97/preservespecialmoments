import React from 'react';
import { Sparkles, Instagram, Facebook, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-pink-400" />
              <span className="text-xl font-bold">Preserve Special Moments</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Transforming your cherished memories into stunning handcrafted resin art pieces.
              Each creation is made with love and attention to detail.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-pink-400 transition-colors">Products</a></li>
              <li><a href="#reviews" className="hover:text-pink-400 transition-colors">Reviews</a></li>
              <li><a href="#about" className="hover:text-pink-400 transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-pink-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Preserve Special Moments. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;