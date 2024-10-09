import React, { useState } from 'react';
import Navbar from './components/NavBar';


const App = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };
//heloo
  return (
    <Navbar/>
  );
};

export default App;
