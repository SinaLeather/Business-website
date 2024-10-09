import React, { useState } from 'react';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import HeroSecition from './components/hero';
import CategorySection from './components/category.';
import Card from './components/card';


const App = () => {
  return (
   <>
     
    <Router>
    <Routes>
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/" element={<Navbar />} />
    </Routes>
  </Router>
  ,
  <HeroSecition />,
  <CategorySection />,
  <Card />,

  
   </>
  );
};

export default App;