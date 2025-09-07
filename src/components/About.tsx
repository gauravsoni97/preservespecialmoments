import React from 'react';
import { Users, Award, Heart, Shield, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  return (
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
  );
};

export default About;