import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('product')
        .select('*')
        .eq('id', id)
        .single(); // Use .single() to get a single object

      if (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
        return;
      }

      if (!data) {
        setLoading(false);
        return; // Handle case where product is not found
      }

      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name === '' || email === '' || phone === '') {
      setError('All fields are required!');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('Order')
        .insert({
          name,
          phone,
          quantity,
          product_id: product.id,
          email,
          address,
        });

      if (error) {
        setError('Error submitting the form. Try again. ' + error.message);
      } else {
        setSubmitted(true);
        setError('');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setError('Error submitting the form. Try again.');
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!product) return <p>Product not found</p>;    

  return (
    <section className="container mx-auto p-6">
  <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg rounded-lg p-8">
    {!submitted ? (
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-5">
            <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300" />
          </div>
        </div>
        <div>
          <div className="text-center mb-8">
            <h1 className="font-extrabofld uppercase text-teal-400 text-2xl">{product.name}</h1>
            <h2 className="font-medium text-gray-300">{product.description}</h2>
          </div>
          <div className="space-y-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 w-full p-2.5 text-white"
                aria-label="Name"
                placeholder="Name"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 w-full p-2.5 text-white"
                aria-label="Email"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 w-full p-2.5 text-white"
                aria-label="Phone"
                placeholder="Phone"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 w-full p-2.5 text-white"
                aria-label="Quantity"
                placeholder="Quantity"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 w-full p-2.5 text-white"
                aria-label="Address"
                placeholder="Address"
                required
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex items-center mt-5">
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center text-white transition-transform transform hover:scale-105"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    ) : (
      <div className="text-center">
        <p class ="text-gray-300">Thank you for placing your order!</p>
        <button 
        className=" m-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 hover:bg-white-800"
        onClick={handleClick}>
        Go to Home
      </button>
      </div>
       
    )}
  </div>
</section>
  );
};

export default ProductDetail;