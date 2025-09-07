import React from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  image: string;
  product: string;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
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
  );
};

export default Reviews;