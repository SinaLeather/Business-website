import React, { useState } from 'react';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import HeroSecition from './components/hero';
import CategorySection from './components/category.';
import Card from './components/card';
import Testimonial from './components/Testimonial';
import AddOrder from './components/AddOrder';
const App = () => {
  return (
    <>
      <Router>
        <Navbar>
          <Link to="/register">Register</Link>
        </Navbar>
        <Routes>
          <Route path="/" element={
            <>
              <HeroSecition />
              <CategorySection />
              <Card />
                <Testimonial />
  <AddOrder />
            </>
          } />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/" element={<Navbar />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
