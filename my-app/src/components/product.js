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

  if (loading) return <p>Loading...</p>;

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (!data || data.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className="flex flex-wrap gap-6 p-6">
      {data.map((item) => (
        <Link to={`/product/${item.id}`}>
        <div className="flex justify-end">
        <div
          key={item.id}
          className="w-[340px] bg-blue-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out dark:bg-gray-900"
        >
          <div className="relative h-48">
            <img
              className="w-full h-full object-cover"
              src={item.image}
              alt={item.name}
            />
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
              {item.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 dark:text-gray-300">
              {item.description}
            </p>

            
                <h1
                  type="button"
                  className=" text-white"
                >
                  Order
                </h1>
            </div>
          </div>
        </div>
        </Link>

      ))}

      {selectedProduct && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-xl mb-4">
              Place Order for {selectedProduct.name}
            </h3>

            <AddOrder product={selectedProduct.id}/>

            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;