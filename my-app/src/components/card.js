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
    <div>
      <ul>
        {data.map((item) => (
          
        
      <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {/* Card Image */}
      <img class="p-8 rounded-t-lg" src={item.imageSrc} />
      
      {/* Card Content */}
      <div className="px-6 py-4">
        <a href="#">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.name} </h5>
        </a>
      </div>
      <div className="px-6 py-4">
        <a href="#">
            <h5 class="text-x font-semibold tracking-tight text-gray-900 dark:text-white">{item.description} </h5>
        </a>
      </div>

      {/* Card Footer (Button) */}
      <div className="px-6 pt-4 pb-2 m-4">
        <button>
          <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
        </button>
      </div>
    </div>
    ))}
      </ul>
    </div>
  );
};



export default Card;
