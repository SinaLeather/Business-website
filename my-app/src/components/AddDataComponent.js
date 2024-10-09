import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const AddDataComponent = () => {
  const [name, setName] = useState('');
  const [image, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('product') // Replace with your table name
      .insert([{ name,image,description }]); // Insert new data

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted:', data);
      setName(''); // Clear input
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter name"
      required
      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
    />
    <input
      type="text"
      value={image}
      onChange={(e) => setImageUrl(e.target.value)}
      placeholder="Enter image URL"
      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
    />
    <input
      type="text"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Enter description"
      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
    />
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
    >
      Add
    </button>
  </form>
  );
};

export default AddDataComponent;
