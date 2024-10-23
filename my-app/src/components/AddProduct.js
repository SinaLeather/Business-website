import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Adjust the path as necessary

const AddProduct = () => {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message
  
    // Ensure a file is selected
    if (!imageFile) {
      setErrorMessage('Please select an image file.');
      return;
    }
  
    // Upload the image file to Supabase Storage
    const fileName = `${Date.now()}-${imageFile.name}`; // Generate a unique file name
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('images') // Ensure this is the correct bucket name
      .upload(`images/${fileName}`, imageFile);
  
    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      setErrorMessage('Error uploading file. Please try again.');
      return;
    }
  
    // Get the public URL of the uploaded image
    const { data: publicData, error: urlError } = supabase
      .storage
      .from('images') // Ensure this matches the upload bucket name
      .getPublicUrl(uploadData.path); // Check if uploadData.path contains the correct path
  
    if (urlError) {
      console.error('Error getting public URL:', urlError);
      setErrorMessage('Error getting image URL. Please try again.');
      return;
    }
  
    const publicURL = publicData.publicUrl; // Correctly assign the public URL
  
    // Check if publicURL is null or undefined
    if (!publicURL) {
      console.error('Public URL is null or undefined:', uploadData.path);
      setErrorMessage('Failed to retrieve image URL. Please try again.');
      return;
    }
  
    // Insert data into the product table
    const { data, error } = await supabase
      .from('product') // Ensure this is the correct table name
      .insert([{ name, image: publicURL, description }]);
  
    if (error) {
      console.error('Error inserting data:', error);
      setErrorMessage('Error inserting data. Please try again.');
    } else {
      console.log('Data inserted successfully:', data);
      // Reset the form fields
      setName('');
      setImageFile(null);
      setDescription('');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter product name"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Image:</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter product description"
        />
      </div >
      <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default AddProduct;