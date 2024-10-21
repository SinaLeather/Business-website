import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPhone, faEnvelope, faHome, faBoxes, faShoppingCart, faCheckCircle ,faHomeUser } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [color, setColor] = useState('');
    const [colors, setColors] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    // Fetch product and colors on component mount
    useEffect(() => {
        const fetchProduct = async () => {
            const { data, error } = await supabase
                .from('product')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
                return;
            }

            if (!data) {
                setLoading(false);
                return;
            }

            setProduct(data);
            setLoading(false);
        };

        const fetchColors = async () => {
          const { data, error } = await supabase
              .from('colors')
              .select('*');
      
          if (error) {
              console.error('Error fetching colors:', error);
              return;
          }
      
          console.log('Fetched colors:', data); // Add this line to check the fetched colors
          setColors(data);
      };

        fetchProduct();
        fetchColors();
    }, [id]);

    const handleClick = () => {
        navigate('/');
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      setError('');
  
      if (!name || !email || !phone || !address || !color) {
          setError('All fields are required!');
          return;
      }
  
      // Log the data being sent to Supabase
      console.log({
          name,
          phone,
          quantity,
          product_id: product.id,
          email,
          address,
          color,
      });
  
      try {
          const { data, error } = await supabase
              .from('Order') // Ensure this is the correct table name
              .insert({
                  name,
                  phone,
                  quantity,
                  product_id: product.id,
                  email,
                  address,
                  color,
              })
              .select();
  
          if (error) {
              throw error;
          }
  
          console.log('Order submitted successfully:', data);
          setSubmitted(true);
      } catch (error) {
          console.error('Submission error:', error);
          setError('Error submitting the form. Please try again. ' + error.message);
      }
  };

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;


    return (
      <section className="container mx-auto p-6 font-sans">
        <div className="bg-white shadow-lg rounded-3xl p-8 max-w-2xl mx-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-64 h-64 object-cover rounded-full shadow-md mx-auto mb-4 border-4 border-gray-200" 
                />
                <h1 className="font-bold text-black text-3xl">{product.name}</h1>
                <h2 className="font-medium text-gray-600 text-xl">${product.price}</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-gray-700" htmlFor="name">
                    <FontAwesomeIcon icon={faHomeUser} className="mr-2 text-gray-500" />
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Enter your name"
                    required
                  />
                </div>
    
                <div>
                  <label className="block mb-2 text-gray-700" htmlFor="phone">
                    <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-500" />
                    Phone:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
    
                <div>
                  <label className="block mb-2 text-gray-700" htmlFor="email">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-500" />
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>
    
                <div>
                  <label className="block mb-2 text-gray-700" htmlFor="address">
                    <FontAwesomeIcon icon={faHome} className="mr-2 text-gray-500" />
                    Address:
                  </label>
                  <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 text-gray-700 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Enter your address"
                    required
                  />
                </div>
    
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="color">Select Color</label>
                  <select
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 w-full p-2.5 text-white"
                    aria-label="Color"
                    required
                >
                    <option value="">Select a color</option>
                    {colors.map((color) => (
                        <option key={color.id} value={color.name}>
                            {color.name}
                        </option>
                    ))}
                </select>
                </div>
    
                <div>
                  <label className="block mb-2 text-gray-700" htmlFor="quantity">
                    <FontAwesomeIcon icon={faBoxes} className="mr-2 text-gray-500" />
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-3 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Enter the quantity"
                    required
                  />
                </div>
    
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                    Buy Now
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <section className="container mx-auto p-6 font-sans">
            <div className="bg-white rounded-3xl p-8 max-w-2xl mx-auto">
                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Form contents... */}
                    </form>
                ) : (
                    <div className="text-center">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-teal-500 text-4xl mb-4" />
                        <h1 className="font-bold text-black text-3xl">Thank you for your order!</h1>
                        <p className="text-gray-600 text-lg">Your order has been successfully placed.</p>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleClick}
                                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                Go Back Home
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
          )}
        </div>
      </section>
    );
  
};

export default ProductDetail;