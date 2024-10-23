import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddOrder from './AddOrder';
import { supabase } from '../supabaseClient';

const ProductPage = ({ customerId }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('product')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
  };


  if (!data || data.length === 0) {
    return <div className="text-center">No products available</div>;
  }

  // Slice to get the last 4 items
  const lastFourItems = data.slice(-4);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {lastFourItems.map((item) => (
          <Link to={`/product/${item.id}`} key={item.id} className="block">
            <div className="group">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 dark:bg-gray-800">
                {/* Image Container */}
                <div className="relative h-48 rounded-t-xl overflow-hidden">
                  <img
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                    <span className="font-semibold text-gray-800">${item.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 h-[50px]">
                    {item.description}
                  </p>

                  {/* Button */}
                  <button
                    className="w-full text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation
                      handleOrderClick(item); // Handle order click
                    }}
                  >
                    <span>Order Now</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

  
    </div>
  );
};

export default ProductPage;