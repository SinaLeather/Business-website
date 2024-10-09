import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm'; 
import Navbar from './components/NavBar';

const App = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
    //jj
  };

  return (
    <Navbar/>
  );
};

export default App;
