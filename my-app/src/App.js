import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import HeroSection from './components/hero';
import CategorySection from './components/CategorySection';
import Card from './components/card';
import Testimonial from './components/Testimonial';
import ProductDetail from './components/ProductDetail';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';
import AddProduct from './components/AddProduct';
import ProductPage from './components/product';

const Home = () => (
  <div>
    <HeroSection />
    <CategorySection />
    <Card />
    <Testimonial />
  </div>
);

const App = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Login successful, navigating to admin page');
    navigate('/admin');
  };


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/product" element={<ProductPage />} />
        
      </Routes>
    </>
  );
};

export default App;