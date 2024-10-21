import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser ] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser  = async () => {
      const { data: { user } } = await supabase.auth.getUser ();
      setUser (user);
      setAuthChecked(true);
      if (!user) {
        navigate('/login');
      }
    };

    checkUser ();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser (session?.user ?? null);
      if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      setLoading(true);
      try {
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
          toast.error('Failed to fetch orders. Please try again later.');
          setError('Failed to fetch orders');
        } else {
          setData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('An unexpected error occurred.');
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('Order')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting order:', error);
        toast.error('Failed to delete the order.');
      } else {
        setData(data.filter((item) => item.id !== id));
        toast.success('Order deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('An unexpected error occurred.');
    }
  };

  const handleAddProduct = () => {
    // Navigate to the add product page
    navigate('/addproduct');
  };

  if (!authChecked) {
    return <div className="flex justify-center items-center h-screen">Checking authentication...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleAddProduct}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </button>
      </div>
      {loading ? (
        <div className="text-center">Loading orders...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : !data || data.length === 0 ? (
        <div className="text-center">No orders available</div>
      ) : (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
                <tr key={item.id} className="bg-white border-b">
                  <td className="px-6 py-3">{item.name}</td>
                  <td className="px-6 py-3">{item.phone}</td>
                  <td className="px-6 py-3">{item.email}</td>
                  <td className="px-6 py-3">{item.quantity}</td>
                  <td className="px-6 py-3">{item.address}</td>
                  <td className="px-6 py-3">
                    <img
                      className="h-10 object-cover rounded"
                      src={item.product_id.image}
                      alt={item.product_id.name}
                    />
                  </td>
                  <td className="px-6 py-3">
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
      )}
    </div>
  );
};

export default AdminPage;