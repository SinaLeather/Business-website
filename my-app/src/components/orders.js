import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Order = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('Order')
        .select(`
          *,
          product_id (
            image
          )
        `);

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('Order')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting order:', error);
      } else {
        // Update the data state to reflect the deleted order
        setData(data.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!data || data.length === 0) {
    return <div>No Order available</div>;
  }

  return (
    <div className="flex flex-wrap gap-6 p-6">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">email</th>
              <th scope="col" className="px-6 py-3">Quantity</th>
              <th scope="col" className="px-6 py-3">Address</th>

              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.name}
                </th>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">{item.address}</td>


                <td className="px-6 py-4">
                  <img src={item.product_id.image} alt={item.name} className="w-16 h-16 object-cover" />
                </td>
                <td className="px-6 py-4">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;