import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Navbar = () => {
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
