import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm'; 

const App = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <Navbar/>
  );
};

export default App;
