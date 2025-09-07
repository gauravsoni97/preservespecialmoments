import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
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
}

interface CartItem extends Product {
  quantity: number;
}

interface ProductsProps {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  handleProductClick: (product: Product) => void;
  addToCart: (product: Product) => void;
  cart: CartItem[];
}

const Products: React.FC<ProductsProps> = ({
  products,
  filteredProducts,
  categories,
  selectedCategory,
  setSelectedCategory,
  handleProductClick,
  addToCart,
  cart
}) => {
  return (
    <section id="products" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">Beautiful</span> Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our range of handcrafted resin art pieces, each one unique and made with love
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-pink-50 border border-pink-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id} 
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
           
              
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>

                <div className="flex items-center justify-between">
                  <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-md hover:shadow-lg">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border-2 border-pink-300 text-pink-600 rounded-full font-semibold hover:bg-pink-50 transition-all duration-300"
          >
            Request Custom Order
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;