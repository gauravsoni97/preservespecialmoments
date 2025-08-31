import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingCart, X, Plus, Minus, ArrowLeft } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';

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

interface ProductDetailPageProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setShowCheckout: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ cart, setCart, setShowCheckout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state as Product;
  
  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Related products (for "Explore More" section)
  const relatedProducts: Product[] = [
    {
      id: 7,
      name: "Personalized Photo Frame",
      price: 65,
      image: "https://images.pexels.com/photos/6195132/pexels-photo-6195132.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "Home Decor",
      description: "Custom photo frame with preserved flowers",
      materials: ["Epoxy Resin", "Dried Flowers", "Wood Frame"],
      customizable: true,
      rating: 4.8,
      reviews: 21
    },
    {
      id: 8,
      name: "Baby Handprint Keepsake",
      price: 75,
      image: "https://images.pexels.com/photos/6195133/pexels-photo-6195133.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "Memorial",
      description: "Preserve your baby's handprint in beautiful resin",
      materials: ["Epoxy Resin", "Baby Prints", "Pearl Powder"],
      customizable: true,
      rating: 4.9,
      reviews: 35
    },
    {
      id: 9,
      name: "Nature Inspired Coaster Set",
      price: 40,
      image: "https://images.pexels.com/photos/6195134/pexels-photo-6195134.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "Home Decor",
      description: "Set of 4 coasters with natural elements",
      materials: ["Epoxy Resin", "Pressed Flowers", "Natural Stones"],
      customizable: false,
      rating: 4.7,
      reviews: 19
    }
  ];

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMagnifierPosition({ x, y });
    
    // Calculate zoom position (inverted for magnifying effect)
    const zoomX = (x / rect.width) * 100;
    const zoomY = (y / rect.height) * 100;
    setZoomPosition({ x: zoomX, y: zoomY });
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const addToCart = () => {
    if (!product) return;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    
    // Show success feedback
    alert(`${product.name} added to cart!`);
  };

  const updateQuantity = (value: number) => {
    if (quantity + value > 0) {
      setQuantity(quantity + value);
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-pink-600 hover:text-pink-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </button>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image with Magnifier */}
            <div 
              ref={imageRef}
              className="relative overflow-hidden rounded-3xl shadow-xl bg-white p-4 cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setShowMagnifier(true)}
              onMouseLeave={() => setShowMagnifier(false)}
            >
              <img 
                src={selectedImage} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-2xl"
              />
              
              {/* Magnifying Glass Effect */}
              {showMagnifier && (
                <div 
                  className="absolute w-48 h-48 rounded-full border-2 border-white shadow-xl pointer-events-none"
                  style={{
                    left: magnifierPosition.x - 96,
                    top: magnifierPosition.y - 96,
                    backgroundImage: `url(${selectedImage})`,
                    backgroundPosition: `${100 - zoomPosition.x}% ${100 - zoomPosition.y}%`,
                    backgroundSize: '200%',
                    backgroundRepeat: 'no-repeat',
                    transform: 'translate(0, 0)'
                  }}
                />
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              <img 
                src={product.image}
                alt={product.name}
                className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 ${selectedImage === product.image ? 'border-pink-500' : 'border-gray-200'}`}
                onClick={() => handleImageClick(product.image)}
              />
              <img 
                src="https://images.pexels.com/photos/6195135/pexels-photo-6195135.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt={`${product.name} - View 2`}
                className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 ${selectedImage === 'https://images.pexels.com/photos/6195135/pexels-photo-6195135.jpeg?auto=compress&cs=tinysrgb&w=500' ? 'border-pink-500' : 'border-gray-200'}`}
                onClick={() => handleImageClick('https://images.pexels.com/photos/6195135/pexels-photo-6195135.jpeg?auto=compress&cs=tinysrgb&w=500')}
              />
              <img 
                src="https://images.pexels.com/photos/6195136/pexels-photo-6195136.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt={`${product.name} - View 3`}
                className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 ${selectedImage === 'https://images.pexels.com/photos/6195136/pexels-photo-6195136.jpeg?auto=compress&cs=tinysrgb&w=500' ? 'border-pink-500' : 'border-gray-200'}`}
                onClick={() => handleImageClick('https://images.pexels.com/photos/6195136/pexels-photo-6195136.jpeg?auto=compress&cs=tinysrgb&w=500')}
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </span>
              {product.customizable && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold ml-2">
                  Customizable
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

            <div className="flex items-center mb-6">
              <div className="flex items-center space-x-1 mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-gray-600">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Materials Used</h3>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material, index) => (
                  <span key={index} className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200">
                    {material}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="text-3xl font-bold text-pink-600">₹{product.price * 83}</div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setIsWishlist(!isWishlist)}
                  className={`p-3 rounded-full ${isWishlist ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600'} hover:bg-pink-100 hover:text-pink-600 transition-colors`}
                >
                  <Heart className={`w-5 h-5 ${isWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mb-8">
              <span className="text-gray-700 mr-4">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-full">
                <button 
                  onClick={() => updateQuantity(-1)}
                  className="p-2 text-gray-600 hover:text-pink-600 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <button 
                  onClick={() => updateQuantity(1)}
                  className="p-2 text-gray-600 hover:text-pink-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={addToCart}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart();
                  setShowCheckout(true);
                }}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Explore More Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Explore More</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <motion.div 
                key={relatedProduct.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => {
                  navigate(`/product/${relatedProduct.id}`, { state: relatedProduct });
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {relatedProduct.category}
                    </span>
                  </div>
                  {relatedProduct.customizable && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-yellow-400 text-pink-800 px-3 py-1 rounded-full text-xs font-semibold">
                        Customizable
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{relatedProduct.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{relatedProduct.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{relatedProduct.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-pink-600">₹{relatedProduct.price * 83}</div>
                    <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-sm font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;