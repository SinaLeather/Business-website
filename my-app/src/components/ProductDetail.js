import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

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
        .eq('id', id);

      if (error) {
        console.error('Error fetching product:', error);
      } else {
        setProduct(data[0]);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

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
        })
        .select('*');

      if (error) {
        setError('Error submitting the form. Try again.');
      } else {
        setSubmitted(true);
        setError('');
      }
    } catch (error) {
      setError('Error submitting the form. Try again.');
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!product) return <p>Product not found</p>;

  return (
    <section className="container">
      <div className="justify-center text-center my-[100px]">
        <h1 className="font-bold uppercase text-gray-700 text-6xl">{product.name}</h1>
        <h2 className="font-semibold text-gray-600 text-xl">{product.description}</h2>
      </div>

      {/* Product Details and Order Form */}
      <div className="my-[150px] dark:bg-gray-800 justify-center">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-5">
            {/* Product Details */}
            <div className="mb-5">
              <img src={product.image} alt={product.name} className="w-full mb-4 rounded-lg" />
            </div>

            {/* Customer Details */}
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-white">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-white">Your email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name@flowbite.com"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-white">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Phone"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-white">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-white border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Quantity"
                required
              />
            </div >
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-white">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-white border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Address"
                required
              />
            </div>

            {/* Error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Submit button */}
            <div className="flex items-start mb-5">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 hover:bg-white-800"
              >
                Place Order
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p>Thank you for placing your order!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;