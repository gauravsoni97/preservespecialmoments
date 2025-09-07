import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingCart, X, Plus, Minus, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false); // For double-tap zoom
  const [lastTap, setLastTap] = useState(0); // For double-tap detection
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  
  // Create array of all product images
  const productImages = [
    product?.image || '',
    'https://images.pexels.com/photos/6195135/pexels-photo-6195135.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/6195136/pexels-photo-6195136.jpeg?auto=compress&cs=tinysrgb&w=500'
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Freeze body scroll when modal is open
  useEffect(() => {
    if (showImageModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showImageModal]);

  // Check if product is already in cart
  const isProductInCart = cart.some(item => item.id === product?.id);


  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const openImageModal = (index: number) => {
    setCurrentImageIndex(index);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(prevIndex => 
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex(prevIndex => 
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDoubleTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300; // milliseconds
    
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      // Double tap detected
      setIsZoomed(!isZoomed);
    } else {
      // Single tap, reset for next potential double tap
      setLastTap(now);
    }
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
            {/* Main Image */}
            <div 
              className="relative overflow-hidden rounded-3xl shadow-xl bg-white p-4 cursor-pointer group"
              onClick={() => openImageModal(productImages.indexOf(selectedImage))}
            >
              <img 
                src={selectedImage} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-2xl"
              />
              {/* Expand Icon */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-30 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 9a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {productImages.map((image, index) => (
                <img 
                  key={index}
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 ${selectedImage === image ? 'border-pink-500' : 'border-gray-200'}`}
                  onClick={() => handleImageClick(image, index)}
                />
              ))}
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
                  disabled={quantity <= 1}
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
                className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  isProductInCart
                    ? 'bg-green-500 text-white cursor-default'
                    : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600'
                }`}
                disabled={isProductInCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2 inline" />
                {isProductInCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={closeImageModal}
          >
            <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full">
              <button 
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  closeImageModal();
                }}
              >
                <X className="w-6 h-6" />
              </button>
              
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPreviousImage();
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextImage();
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              <div className="flex items-center justify-center h-full w-full">
                <img 
                  src={productImages[currentImageIndex]} 
                  alt={`${product.name} - View ${currentImageIndex + 1}`}
                  className={`max-h-[90vh] max-w-[90vw] object-contain ${isZoomed ? 'scale-150' : 'scale-100'} transition-transform duration-300`}
                  onClick={handleDoubleTap}
                />
              </div>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {productImages.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-500'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductDetailPage;