import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext'; 
import Navbar from './components/NavBar';
import RegistrationForm from './components/RegistrationForm';
import HeroSection from './components/hero';
import CategorySection from './components/CategorySection';
import Card from './components/card';
import Testimonial from './components/Testimonial';
import ProductDetail from './components/ProductDetail';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';

const App = () => {
  return (
    

    <Router>
      {/* Navbar is typically displayed on all pages */}
      <Navbar />

      {/* Define your routes */}
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* Home route renders the Home component */}
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" component={LoginPage} />
      </Routes>
  

    </Router>
  );
};

// Home component for the root path
const Home = () => (
  <div>
    <HeroSection />
    <CategorySection />
    <Card />
    <Testimonial />
   
   
  </div>
);



export default App;
