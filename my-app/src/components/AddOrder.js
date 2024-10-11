import { useState } from 'react';
import { supabase } from '../supabaseClient';

const AddOrder = ({ product }) => {
  const [message, setMessage] = useState('');
  const [customer, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState(null);

  const handleAddOrder = async () => {
    if (!message || !customer || !phone) {
      setResponseMessage('Please fill in all fields.');
      return;
    }

    try {
      const { error } = await supabase
      .from('Order')
      .insert([
        {
          product: product,
          customer: customer,
          phone: phone,
          message: message,
        },
      ]);

      if (error) {
        throw error;
      }

      setResponseMessage('Order placed successfully!');
      setMessage('');
      setName('');
      setPhone('');
    } catch (error) {
      setError(error);
      setResponseMessage('Error inserting data: ' + error.message);
    }
  };

  return (
    <div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium ">Name</label>
        <input
          type="text"
          value={customer}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus: ring-blue-500 focus:border-blue-500 w-full p-2.5"
          placeholder="Name"
          required
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium ">Phone Number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          placeholder="+251-978"
          required
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium ">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here"
          className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
        />
      </div>

      <button
        onClick={handleAddOrder}
        className="bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit Order
      </button>

      {responseMessage && <p className="mt-2 ">{responseMessage}</p>}
      {error && <p className="mt-2 text-red-500">{error.message}</p>}
    </div>
  );
};

export default AddOrder;