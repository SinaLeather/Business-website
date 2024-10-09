import React from 'react';
import RegistrationForm from './RegistrationForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';





const Navbar = () => {
<<<<<<< HEAD


  
=======
    const RegistrationForm = () => {
        // Example of what you can do when the button is clicked
        console.log('Subscribe button clicked!');
        alert('Registration form will open here!');
        // You can also trigger form modal opening logic here
      };
      
>>>>>>> f766bb314a1ed7b9d8ec187a64d2f877acfa40fd
  return (
    <nav className=" bg-white p-4 shadow">
      <div className="container mx-auto flex justify-between items-center ">
        {/* Logo Section */}
        <div className="text-dark text-2xl font-bold flex mx-5 ">
          <a href="#">Sina</a>
          <img className='m-2' src='#'/>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mx-5">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="text-dark text-x hover:text-blue-500" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTelegram} className="text-dark text-x hover:text-blue-400" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} className="text-dark text-x hover:text-pink-500" />
          </a>

            <button type="button" class=" p-1 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"  onClick={RegistrationForm}> subscribe </button>
//kk
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
