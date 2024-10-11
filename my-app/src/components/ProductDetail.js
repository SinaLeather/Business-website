import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetail = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductAndOrder = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `https://your-supabase-instance.supabase.co/api/v1/products/${id}`,
          {}
        );
        setProduct(response.data.product);
        setOrder(response.data.order);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductAndOrder();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product || !order) {
    return <div>Product or order not found</div>;
  }

  const handleUpdateOrder = async () => {
    // Update order logic goes here
    // For example, you can update the quantity or total
    const updatedOrder = { ...order, quantity: order.quantity + 1 };
    try {
      const response = await axios.post(
        `https://your-supabase-instance.supabase.co/api/v1/orders/${order.id}`,
        updatedOrder
      );
      setOrder(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <img src={product.image} alt={product.name} />
      <h2>Order Details</h2>
      <p>Quantity: {order.quantity}</p>
      <p>Total: {order.total}</p>
      <button onClick={handleUpdateOrder}>Update Order</button>
    </div>
  );
};

export default ProductDetail;