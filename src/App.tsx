import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ProductDetailPage from './components/ProductDetailPage';
import useLenisScroll from './hooks/useLenisScroll';
import { motion } from 'framer-motion';

// Import new components
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Products from './components/Products';
import Reviews from './components/Reviews';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';

import namePlatesThumbnail from './assets/images/products/nameplate/IMG-20250727-WA0026.jpg';
import bowlThumbnail from './assets/images/products/bowls/IMG-20250830-WA0059.jpg';
import bracletteThumbnail from './assets/images/products/braclette/IMG-20250727-WA0072.jpg';
import clutchThumbnail from './assets/images/products/clutch/IMG-20250727-WA0066.jpg';
import keychainThumbnail from './assets/images/products/keychain/IMG-20250727-WA0041.jpg';
import banglesThumbnail from './assets/images/products/bangles/IMG-20250830-WA0010.jpg';
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

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  image: string;
  product: string;
}

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [addedToCart, setAddedToCart] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Initialize Lenis smooth scrolling
  useLenisScroll();

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'products', 'reviews', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section when navigating from product detail page
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      // Set active section to the target section
      setActiveSection(location.state.scrollTo);
      // Small delay to ensure the page has loaded
      setTimeout(() => {
        scrollToSection(location.state.scrollTo);
      }, 100);
    } else if (location.pathname === '/') {
      // When navigating to home page, set active section to 'home'
      setActiveSection('home');
    }
  }, [location]);

  const products: Product[] = [
    {
      id: 1,
      name: "Bangles",
      price: 45,
      image: banglesThumbnail,
      images: [
        banglesThumbnail,
        "https://images.pexels.com/photos/6195135/pexels-photo-6195135.jpeg?auto=compress&cs=tinysrgb&w=500",
        "https://images.pexels.com/photos/6195136/pexels-photo-6195136.jpeg?auto=compress&cs=tinysrgb&w=500"
      ],
      category: "Bangles",
      description: "Preserve precious memories with dried flowers in crystal-clear resin",
      materials: ["Epoxy Resin", "Dried Roses", "Gold Flakes"],
      customizable: true,
      rating: 4.9,
      reviews: 23
    },
    {
      id: 2,
      name: "Bowls",
      price: 35,
      image: bowlThumbnail,
      images: [
        bowlThumbnail,
        "https://images.pexels.com/photos/6195137/pexels-photo-6195137.jpeg?auto=compress&cs=tinysrgb&w=500",
        "https://images.pexels.com/photos/6195138/pexels-photo-6195138.jpeg?auto=compress&cs=tinysrgb&w=500"
      ],
      category: "Bowls",
      description: "Beautiful ocean-inspired resin dish perfect for jewelry storage",
      materials: ["Epoxy Resin", "Blue Pigments", "Pearl Powder"],
      customizable: true,
      rating: 4.8,
      reviews: 18
    },
    {
      id: 3,
      name: "Braclette",
      price: 85,
      image: bracletteThumbnail,
      images: [
        bracletteThumbnail,
        "https://images.pexels.com/photos/6195139/pexels-photo-6195139.jpeg?auto=compress&cs=tinysrgb&w=500",
        "https://images.pexels.com/photos/6195140/pexels-photo-6195140.jpeg?auto=compress&cs=tinysrgb&w=500"
      ],
      category: "Braclette",
      description: "Preserve your wedding flowers and memories in a stunning resin piece",
      materials: ["Epoxy Resin", "Wedding Flowers", "Gold Leaf"],
      customizable: true,
      rating: 5.0,
      reviews: 31
    },
    {
      id: 4,
      name: "Clutch",
      price: 25,
      image: clutchThumbnail,
      images: [
        clutchThumbnail,
        "https://images.pexels.com/photos/6195141/pexels-photo-6195141.jpeg?auto=compress&cs=tinysrgb&w=500",
        "https://images.pexels.com/photos/6195142/pexels-photo-6195142.jpeg?auto=compress&cs=tinysrgb&w=500"
      ],
      category: "Clutch",
      description: "Cosmic-inspired bookmarks with glitter and stars",
      materials: ["Epoxy Resin", "Glitter", "Star Confetti"],
      customizable: true,
      rating: 4.7,
      reviews: 15
    },
    {
      id: 5,
      name: "Key Chains",
      price: 55,
      image: keychainThumbnail,
      images: [
        keychainThumbnail,
        "https://images.pexels.com/photos/6195143/pexels-photo-6195143.jpeg?auto=compress&cs=tinysrgb&w=500",
        "https://images.pexels.com/photos/6195144/pexels-photo-6195144.jpeg?auto=compress&cs=tinysrgb&w=500"
      ],
      category: "KeyChains",
      description: "Honor your beloved pet with a custom resin pendant",
      materials: ["Epoxy Resin", "Pet Hair/Ashes", "Silver Chain"],
      customizable: true,
      rating: 4.9,
      reviews: 27
    },
    {
      id: 6,
      name: "Name Plates",
      price: 120,
      image: namePlatesThumbnail,
      images: [
        namePlatesThumbnail,
        "https://images.pexels.com/photos/6195145/pexels-photo-6195145.jpeg?auto=compress&cs=tinysrgb&w=500",
        "https://images.pexels.com/photos/6195146/pexels-photo-6195146.jpeg?auto=compress&cs=tinysrgb&w=500"
      ],
      category: "NamePlates",
      description: "Large decorative panel with preserved flowers and artistic design",
      materials: ["Epoxy Resin", "Mixed Flowers", "Wood Frame"],
      customizable: true,
      rating: 4.8,
      reviews: 12
    }
  ];

  // Get unique categories
  const categories = ['All', ...new Set(products.map(product => product.category))];

  // Filter products by category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const reviews: Review[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely beautiful! The memorial coaster with my grandmother's roses is perfect. The craftsmanship is incredible and it brings me so much comfort.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
      product: "Memorial Rose Coaster Set"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment: "The wedding keepsake exceeded our expectations! Having our bouquet preserved forever is such a treasure. Highly recommend!",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
      product: "Custom Wedding Keepsake"
    },
    {
      id: 3,
      name: "Emma Davis",
      rating: 4,
      comment: "Love my ocean wave jewelry dish! It's so unique and adds a beautiful touch to my dresser. The colors are stunning.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
      product: "Ocean Wave Jewelry Dish"
    },
    {
      id: 4,
      name: "David Wilson",
      rating: 5,
      comment: "The pet memorial pendant is beautiful. It helps keep my dog's memory close to my heart. Thank you for such meaningful work.",
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100",
      product: "Pet Memorial Pendant"
    }
  ];

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Track that this product has been added to cart
    if (!addedToCart.includes(product.id)) {
      setAddedToCart(prev => [...prev, product.id]);
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== id));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const scrollToSection = (sectionId: string) => {
    // If we're on the product detail page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      // If we're already on the home page, scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Set the active section immediately
        setActiveSection(sectionId);
      }
    }
  };

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  const [customOrder, setCustomOrder] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Wedding Keepsake',
    size: '',
    colorPreferences: '',
    materialPreferences: '',
    specialInstructions: '',
    inspirationImages: ''
  });

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
    
Name: ${customOrder.name}
Email: ${customOrder.email}
Phone: ${customOrder.phone}
Project Type: ${customOrder.projectType}
Size: ${customOrder.size}
Color Preferences: ${customOrder.colorPreferences}
Material Preferences: ${customOrder.materialPreferences}
Special Instructions: ${customOrder.specialInstructions}
Inspiration Images: ${customOrder.inspirationImages}`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp with the message (replace with your actual WhatsApp number)
    window.open(`https://wa.me/1234567890?text=${encodedMessage}`, '_blank');

    // Reset form
    setCustomOrder({
      name: '',
      email: '',
      phone: '',
      projectType: 'Wedding Keepsake',
      size: '',
      colorPreferences: '',
      materialPreferences: '',
      specialInstructions: '',
      inspirationImages: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Header */}
      <Header
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        setIsCartOpen={setIsCartOpen}
        getTotalItems={getTotalItems}
      />

      {/* Main Content */}
      <Routes>
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Hero Section */}
            <Hero scrollToSection={scrollToSection} />

            {/* Features Section */}
            <Features />

            {/* Products Section */}
            <Products
              products={products}
              filteredProducts={filteredProducts}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              handleProductClick={handleProductClick}
              addToCart={addToCart}
              cart={cart}
            />

            {/* Reviews Section */}
            <Reviews reviews={reviews} />

            {/* About Section */}
            <About />

            {/* Contact Section */}
            <Contact
              handleCustomOrderSubmit={handleCustomOrderSubmit}
              customOrder={customOrder}
              handleCustomOrderChange={handleCustomOrderChange}
            />

            {/* Footer */}
            <Footer />
          </motion.div>
        } />
        <Route path="/product/:id" element={<ProductDetailPage cart={cart} setCart={setCart} setShowCheckout={setShowCheckout} />} />
      </Routes>

      {/* Cart */}
      <Cart
        cart={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        updateQuantity={updateQuantity}
        getTotalPrice={getTotalPrice}
        setShowCheckout={setShowCheckout}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;