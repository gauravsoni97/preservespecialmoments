import React from 'react';
import { X } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  materials: string[];
  customizable: boolean;
  rating: number;
  reviews: number;
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getTotalPrice: () => number;
  setShowCheckout: (show: boolean) => void;
}

const Cart: React.FC<CartProps> = ({ 
  isCartOpen, 
  setIsCartOpen
}) => {
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)}></div>
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="ml-3 h-7 flex items-center justify-center rounded-full bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-8">
                <div className="flow-root">
                  <div className="text-center py-12">
                    <X className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Cart functionality has been removed</h3>
                    <p className="mt-1 text-sm text-gray-500">Please use the custom order forms on product pages</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;