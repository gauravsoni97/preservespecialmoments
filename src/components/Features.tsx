import React from 'react';
import { Palette, Shield, Clock, Award } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Palette className="w-8 h-8 text-white" />,
      title: "Custom Designs",
      description: "Personalized pieces tailored to your memories and preferences"
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Premium Quality",
      description: "High-grade epoxy resin ensures lasting beauty and durability"
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "Fast Turnaround",
      description: "Most orders completed within 7-10 business days"
    },
    {
      icon: <Award className="w-8 h-8 text-white" />,
      title: "Satisfaction Guaranteed",
      description: "100% satisfaction guarantee on all custom orders"
    }
  ];

  return (
    <section className="py-20 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;