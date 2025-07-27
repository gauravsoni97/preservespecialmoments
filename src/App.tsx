import React, { useState } from 'react';
import {
  ShoppingCart,
  Heart,
  Star,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  MessageCircle,
  Palette,
  Sparkles,
  Gift,
  Clock,
  Shield,
  Award,
  Users,
  Camera,
  Droplets,
  Gem,
  Flower,
  X,
  Plus,
  Minus
} from 'lucide-react';

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

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  image: string;
  product: string;
}

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: "Memorial Rose Coaster Set",
      price: 45,
      image: "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "Memorial",
      description: "Preserve precious memories with dried flowers in crystal-clear resin",
      materials: ["Epoxy Resin", "Dried Roses", "Gold Flakes"],
      customizable: true,
      rating: 4.9,
      reviews: 23
    },
    {
      id: 2,
      name: "Ocean Wave Jewelry Dish",
      price: 35,
      image: "https://images.pexels.com/photos/6195126/pexels-photo-6195126.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "Home Decor",
      description: "Beautiful ocean-inspired resin dish perfect for jewelry storage",
      materials: ["Epoxy Resin", "Blue Pigments", "Pearl Powder"],
      customizable: false,
      rating: 4.8,
      reviews: 18
    },
    {
      id: 3,
      name: "Custom Wedding Keepsake",
      price: 85,
      image: "https://images.pexels.com/photos/6195127/pexels-photo-6195127.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "Wedding",
      description: "Preserve your wedding flowers and memories in a stunning resin piece",
      materials: ["Epoxy Resin", "Wedding Flowers", "Gold Leaf"],
      customizable: true,
      rating: 5.0,
      reviews: 31
    },
    {
      id: 4,
      name: "Galaxy Bookmark Set",
      price: 25,
      image: "https://images.pexels.com/photos/6195128/pexels-photo-6195128.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "Accessories",
      description: "Cosmic-inspired bookmarks with glitter and stars",
      materials: ["Epoxy Resin", "Glitter", "Star Confetti"],
      customizable: false,
      rating: 4.7,
      reviews: 15
    },
    {
      id: 5,
      name: "Pet Memorial Pendant",
      price: 55,
      image: "https://images.pexels.com/photos/6195129/pexels-photo-6195129.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "Memorial",
      description: "Honor your beloved pet with a custom resin pendant",
      materials: ["Epoxy Resin", "Pet Hair/Ashes", "Silver Chain"],
      customizable: true,
      rating: 4.9,
      reviews: 27
    },
    {
      id: 6,
      name: "Floral Wall Art Panel",
      price: 120,
      image: "https://images.pexels.com/photos/6195130/pexels-photo-6195130.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "Wall Art",
      description: "Large decorative panel with preserved flowers and artistic design",
      materials: ["Epoxy Resin", "Mixed Flowers", "Wood Frame"],
      customizable: true,
      rating: 4.8,
      reviews: 12
    }
  ];

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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-lg z-50 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-pink-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                Preserve Special Moments
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-pink-600 transition-colors">Home</button>
              <button onClick={() => scrollToSection('products')} className="text-gray-700 hover:text-pink-600 transition-colors">Products</button>
              <button onClick={() => scrollToSection('reviews')} className="text-gray-700 hover:text-pink-600 transition-colors">Reviews</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-pink-600 transition-colors">About</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-pink-600 transition-colors">Contact</button>
            </div>

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
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 bg-clip-text text-transparent">
                    Preserve Your
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
                  Learn More
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">500+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">1000+</div>
                  <div className="text-sm text-gray-600">Pieces Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">4.9★</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-3xl transform rotate-6 opacity-20"></div>
              <img
                src="https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=600"
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

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Custom Designs</h3>
              <p className="text-gray-600 text-sm">Personalized pieces tailored to your memories and preferences</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">High-grade epoxy resin ensures lasting beauty and durability</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Fast Turnaround</h3>
              <p className="text-gray-600 text-sm">Most orders completed within 7-10 business days</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Satisfaction Guaranteed</h3>
              <p className="text-gray-600 text-sm">100% satisfaction guarantee on all custom orders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {product.category}
                    </span>
                  </div>
                  {product.customizable && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-yellow-400 text-pink-800 px-3 py-1 rounded-full text-xs font-semibold">
                        Customizable
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>

                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Materials:</div>
                    <div className="flex flex-wrap gap-1">
                      {product.materials.map((material, index) => (
                        <span key={index} className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs">
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-pink-600">${product.price}</div>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-pink-300 text-pink-600 rounded-full font-semibold hover:bg-pink-50 transition-all duration-300"
            >
              Request Custom Order
            </button>
          </div>
        </div>
      </section>



      {/* Reviews Section */}
      <section id="reviews" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              What Our <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">Customers</span> Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Read testimonials from our happy customers who have preserved their special moments with us
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{review.name}</h4>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed italic">"{review.comment}"</p>
                <div className="text-sm text-pink-600 font-medium">Product: {review.product}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 p-8 bg-gradient-to-r from-pink-50 to-rose-50 rounded-3xl">
            <div className="flex items-center justify-center space-x-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">4.9/5</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">150+</div>
                <div className="text-sm text-gray-600">Happy Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">98%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
            <p className="text-gray-600">Join hundreds of satisfied customers who have preserved their special moments with us!</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                About <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">Our Story</span>
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Welcome to Preserve Special Moments, where memories become timeless art. Founded with a passion for
                  helping people cherish their most precious moments, we specialize in creating beautiful resin art pieces
                  that capture the essence of your special occasions.
                </p>
                <p>
                  Our journey began when we realized how fleeting beautiful moments can be - wedding bouquets wilt,
                  memorial flowers fade, and precious keepsakes can deteriorate over time. We wanted to create a way
                  to preserve these treasures forever, maintaining their beauty and emotional significance.
                </p>
                <p>
                  Every piece we create is handcrafted with meticulous attention to detail, using only the highest
                  quality materials. We believe that your memories deserve nothing less than perfection, which is
                  why we pour our heart and soul into every creation.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white rounded-2xl shadow-md">
                  <Users className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-pink-600">500+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center p-4 bg-white rounded-2xl shadow-md">
                  <Award className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-pink-600">3+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-3xl transform -rotate-6 opacity-20"></div>
              <img
                src="https://images.pexels.com/photos/6195131/pexels-photo-6195131.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Artisan working on resin art"
                className="relative rounded-3xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Made with Love</h3>
              <p className="text-gray-600 text-sm">Every piece is crafted with care and attention to detail</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <Shield className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Quality Guaranteed</h3>
              <p className="text-gray-600 text-sm">We use only premium materials and proven techniques</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <Sparkles className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Uniquely Yours</h3>
              <p className="text-gray-600 text-sm">Each piece is personalized to your specific memories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Get In <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to preserve your special moments? Contact us for custom orders or any questions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM EST</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-600">hello@preservespecialmoments.com</p>
                  <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Studio Location</h3>
                  <p className="text-gray-600">123 Art Street, Creative District</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white hover:from-pink-600 hover:to-rose-600 transition-all duration-300">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white hover:from-pink-600 hover:to-rose-600 transition-all duration-300">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white hover:from-pink-600 hover:to-rose-600 transition-all duration-300">
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Request Custom Order</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300">
                    <option>Wedding Keepsake</option>
                    <option>Memorial Piece</option>
                    <option>Home Decor</option>
                    <option>Jewelry</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Details</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="Tell us about your vision, materials you'd like to include, size preferences, etc."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Send Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-pink-400 transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('products')} className="hover:text-pink-400 transition-colors">Products</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-pink-400 transition-colors">About</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+1 (555) 123-4567</li>
                <li>hello@preservespecialmoments.com</li>
                <li>123 Art Street, NY 10001</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Preserve Special Moments. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Shopping Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                          <p className="text-pink-600 font-semibold">${item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-800">Total:</span>
                    <span className="text-2xl font-bold text-pink-600">${getTotalPrice()}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setShowCheckout(true);
                    }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCheckout(false)}></div>
            <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Order</h2>
                <p className="text-gray-600">Scan the QR code below to make payment</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 mb-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-pink-600">${getTotalPrice()}</div>
                  <div className="text-sm text-gray-600">Total Amount</div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-inner mb-4">
                  <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-pink-200 to-rose-200 rounded-lg mb-2 flex items-center justify-center">
                        <span className="text-xs text-gray-600">QR Code</span>
                      </div>
                      <p className="text-xs text-gray-500">Payment QR Code</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <span className="text-sm text-gray-700">Scan QR code with your payment app</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <span className="text-sm text-gray-700">Complete payment of ${getTotalPrice()}</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <span className="text-sm text-gray-700">Send screenshot to WhatsApp</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <a
                  href="https://wa.me/1234567890?text=Payment%20completed%20for%20order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 text-center flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;