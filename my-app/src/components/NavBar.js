import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleSubscribe = () => {
        navigate('/');
    };

    return (
        <nav className="bg-white shadow">
            <div className="items-center bg-black p-2">
                <div className="flex space-x-4 mx-5 items-center justify-center">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} className="text-white text-x hover:text-blue-500" />
                    </a>
                    <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTelegram} className="text-white text-x hover:text-blue-400" />
                    </a>
                    <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faWhatsapp} className="text-white text-x hover:text-pink-500" />
                    </a>
                </div>
            </div>

            <div className="container mx-auto flex justify-between items-center py-2">
                <div className="text-dark text-2xl font-bold flex mx-5">
                    <a href="#" onClick={handleSubscribe} className="cursor-pointer">Sina</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
