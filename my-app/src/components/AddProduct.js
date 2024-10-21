import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    if (!name || !description || !image) {
      toast.error('Please fill all fields and select an image.');
      return;
    }
  
    setLoading(true);
  
    try {
      console.log('Uploading file:', image);
  
      const fileExt = image.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `images/${fileName}`;
  
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, image);
  
      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }
  
      console.log('File uploaded successfully');
  
      const { publicURL, error: urlError } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
  
      if (urlError) {
        console.error('URL error:', urlError);
        throw urlError;
      }
  
      console.log('Public URL:', publicURL);
  
      const { data, error } = await supabase
        .from('products')
        .insert([{ name, description, image_url: publicURL }])
        .select();
  
      if (error) {
        console.error('Insert error:', error);
        throw error;
      }
  
      console.log('Product added:', data);
  
      toast.success('Product added successfully!');
      setName('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  
    return (
        <div className="max-w-md mx-auto mt-10">
          <form onSubmit={handleAddProduct} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Product Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
    
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
    
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                Image
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
    
            <div className="flex items-center justify-between">
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      );
};

export default AddProduct;