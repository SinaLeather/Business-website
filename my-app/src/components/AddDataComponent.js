import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const AddDataComponent = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('product') // Replace with your table name
      .insert([{ name }]); // Insert new data

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted:', data);
      setName(''); // Clear input
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddDataComponent;
