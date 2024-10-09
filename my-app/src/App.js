import React, { useState } from 'react';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';


const App = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
   <>
     
    <Router>
    <Routes>
     
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/" element={<Navbar />} />
    </Routes>
  </Router>
  
   </>
  );
};

export default App;
