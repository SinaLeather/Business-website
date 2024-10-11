import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading...</p>;

  if (!product) return <p>Product not found</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
    <img src={product.image} alt={product.name} className="w-full mb-4 rounded-lg" />
    <p className="text-lg text-gray-600">{product.description}</p>
    {/* Add more product details as needed */}
  </div>
  );
};

export default ProductDetail;