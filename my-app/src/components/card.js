import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; 

const Card = () => {
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

  return (
    
    <div className="flex flex-wrap gap-6 p-6">
    {data.map((item) => (
      <div
        key={item.id}
        className="w-[340px] bg-blue-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out dark:bg-gray-900"
      >
        {/* Card Image */}
        <div className="relative h-48">
          <img
            className="w-full h-full object-cover"
            src={item.image}
            alt={item.name}
          />
        </div>
  
        {/* Card Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">{item.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 dark:text-gray-300">{item.description}</p>
          
          <div className="flex justify-end">
          <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Order</button>

          </div>
        </div>
      </div>
    ))}
  </div>
  

   
  );
};



export default Card;
