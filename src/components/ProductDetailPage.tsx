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
  images?: string[]; // Add this line for multiple images
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
  const [isWishlist, setIsWishlist] = useState(false);
  
  // Custom order form state
  const [customOrder, setCustomOrder] = useState({
    name: '',
    email: '',
    phone: '',
    productName: product?.name || '',
    size: '',
    material: '',
    specialInstructions: ''
  });
  
  // Create array of all product images
  const productImages = product?.images && product.images.length > 0 
    ? product.images 
    : [
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
      // Set selected image to the first image in the array if available
      setSelectedImage(product.images && product.images.length > 0 ? product.images[0] : product.image);
      setCustomOrder(prev => ({
        ...prev,
        productName: product.name
      }));
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

  const handleCustomOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomOrder(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCustomOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message with all form details
    const message = `New Custom Order Request:
    
Product: ${customOrder.productName}
Name: ${customOrder.name}
Email: ${customOrder.email}
Phone: ${customOrder.phone}
Size: ${customOrder.size}
Material: ${customOrder.material}
Special Instructions: ${customOrder.specialInstructions}`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the message (replace with your actual WhatsApp business number)
    window.open(`https://wa.me/7496013237?text=${encodedMessage}`, '_blank');
    
    // Reset form
    setCustomOrder({
      name: '',
      email: '',
      phone: '',
      productName: product?.name || '',
      size: '',
      material: '',
      specialInstructions: ''
    });
    
    // Show success message
    alert('Your custom order request has been sent! We will contact you shortly.');
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

            {/* Custom Order Form */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Customize This Product</h3>
              <p className="text-gray-600 mb-6">Fill out the form below to request a custom version of this product.</p>
              
              <form onSubmit={handleCustomOrderSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={customOrder.name}
                      onChange={handleCustomOrderChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={customOrder.email}
                      onChange={handleCustomOrderChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={customOrder.phone}
                    onChange={handleCustomOrderChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Your phone number"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                    <select
                      name="size"
                      value={customOrder.size}
                      onChange={handleCustomOrderChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Select Size</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                      <option value="Extra Large">Extra Large</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                    <select
                      name="material"
                      value={customOrder.material}
                      onChange={handleCustomOrderChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Select Material</option>
                      {product.materials.map((material, index) => (
                        <option key={index} value={material}>{material}</option>
                      ))}
                      <option value="Other">Other (Specify in instructions)</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                  <textarea
                    name="specialInstructions"
                    value={customOrder.specialInstructions}
                    onChange={handleCustomOrderChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Any special requests or details about your vision"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Custom Order Request via WhatsApp
                </button>
              </form>
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