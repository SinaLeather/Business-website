import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm'; 

const App = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      {/* Conditionally render the button or the registration form */}
      {!showForm ? (
        <button onClick={handleButtonClick}>Contact for Product</button>
      ) : (
        <RegistrationForm />
      )}
    </div>
  );
};

export default App;
