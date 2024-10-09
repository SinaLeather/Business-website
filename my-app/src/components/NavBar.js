import React from 'react';
import RegistrationForm from './RegistrationForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';




const Navbar = () => {
    const RegistrationForm = () => {
       
        const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === '' || email === '' || phone === '') {
      setError('All fields are required!');
      return;
    }

    const {  error } = await supabase
      .from('customers') // actual table name
      .insert([{ name, email, phone }]);

    if (error) {
      setError('Error submitting the form. Try again.');
    } else {
      setSubmitted(true);
      setError('');
    }
  };

  return (
    <div  className=' '>


      {!submitted ? (
        <form onSubmit={handleSubmit}  class="max-w-sm mx-auto">
          <div class="mb-5" >
            <label class="block mb-2 text-sm font-medium text-gray-900 " >Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Name"
              required
            />
          </div>
          <div class="mb-5">
            <label class="block mb-2 text-sm font-medium text-gray-900 " >Your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com"
            />
          </div>
          <div class="mb-5" >
            <label class="block mb-2 text-sm font-medium text-gray-900 " > Phone  </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              class="bg-whight border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  placeholder="Phone"

              required
            />
          </div>
          <div class="flex items-start mb-5">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </div>
        </form>
      ) : (
        <p>Thank you for contacting us! We will get back to you soon.</p>
      )}
    </div>
  );

       
      };

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

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
