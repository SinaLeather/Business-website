import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Import Supabase client
import AddOrder from './AddOrder'; // Assuming AddOrder is your order handling component

const RegistrationAndOrderForm = ({ productId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [customerData, setCustomerData] = useState(null);

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === '' || email === '' || phone === '') {
      setError('All fields are required!');
      return;
    }

    // Insert customer into the 'customers' table
    const { data, error: insertError } = await supabase
      .from('customers')
      .insert([{ name, email, phone }])
      .single();

    if (insertError) {
      setError('Error submitting the form. Try again.');
    } else {
      setCustomerData(data); // Save the customer data after successful registration
      setSubmitted(true);
      setError('');
    }
  };

  return (
    <section className="container">
      <div className="justify-center text-center my-[100px]">
        <h1 className="font-bold uppercase text-gray-700 text-6xl">Hello!</h1>
        <h2 className="font-semibold text-gray-600 text-xl">You can place an order by registering first</h2>
      </div>

      {/* Customer Registration and Order Form */}
      <div className="my-[150px] dark:bg-gray-800 justify-center">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-5">
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

            {/* Error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Submit button */}
            <div className="flex items-start mb-5">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 hover:bg-white-800"
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p>Thank you for registering! You can now place an order.</p>

            {/* Place the Order */}
            <div className="mt-6">
              <h2 className="text-lg mb-2">Place your order for Product ID: {productId}</h2>
              
              {/* Pass the customer data and product ID to the AddOrder component */}
              <AddOrder
                productId={productId}
                customerData={customerData} // Pass the customer information here
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RegistrationAndOrderForm;
