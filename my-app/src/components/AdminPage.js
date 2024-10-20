import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
// import { useHistory } from 'react-router-dom';



const AdminPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = supabase.auth.user(); 
  // const history = useHistory();


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
        setError('Failed to fetch orders. Please try again later.');
      } else {
        setData(data);
      }
      setLoading(false);
    };

    // Fetch data only if the user is authenticated
    if (user) {
      fetchData();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('Order')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting order:', error);
      } else {
        setData(data.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  // Loading state for data
  if (loading) return <p>Loading orders...</p>;

  // Redirect if not authenticated
  if (!user) {
    return (
      <div>
        <p>Please log in to access this page.</p>
        {/* <button 
          className="m-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          onClick={() => history.push('/login')}  
        >
          Login
        </button> */}
      </div>
    );
  }

  // Display error message if there is an error
  if (error) {
    return <div>{error}</div>;
  }

  // Display message if there are no orders
  if (!data || data.length === 0) {
    return <div>No orders available</div>;
  }

  return (
    <div className="flex flex-wrap gap-6 p-6">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Quantity</th>
              <th scope="col" className="px-6 py-3">Address</th>
              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-3">{item.name}</td>
                <td className="px-6 py-3">{item.phone}</td>
                <td className="px-6 py-3">{item.email}</td>
                <td className="px-6 py-3">{item.quantity}</td>
                <td className="px-6 py-3">{item.address}</td>
                <td className="px-6 py-3">
                  {item.product_id && item.product_id.image ? (
                    <img src={item.product_id.image} alt={item.product_id.name || 'Product Image'} />
                  ) : (
                    <span>No Image Available</span>
                  )}
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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

export default AdminPage;
