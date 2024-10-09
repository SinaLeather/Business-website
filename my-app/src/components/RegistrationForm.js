import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Import Supabase client

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

<<<<<<< HEAD

  return (
    <div>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
=======
  return (
    <div  className=' '>


      {!submitted ? (
        <form onSubmit={handleSubmit}  class="max-w-sm mx-auto">
          <div class="mb-5" >
            <label class="block mb-2 text-sm font-medium text-gray-900 " >Name</label>
>>>>>>> f766bb314a1ed7b9d8ec187a64d2f877acfa40fd
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
<<<<<<< HEAD
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Your email</label>
=======
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Name"
              required
            />
          </div>
          <div class="mb-5">
            <label class="block mb-2 text-sm font-medium text-gray-900 " >Your email</label>
>>>>>>> f766bb314a1ed7b9d8ec187a64d2f877acfa40fd
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
<<<<<<< HEAD
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com"
            />
          </div>
          <div>
            <label>Phone</label>
=======
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com"
            />
          </div>
          <div class="mb-5" >
            <label class="block mb-2 text-sm font-medium text-gray-900 " > Phone  </label>
>>>>>>> f766bb314a1ed7b9d8ec187a64d2f877acfa40fd
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
<<<<<<< HEAD
              placeholder="Enter your phone number"
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" 
          
          >Register</button>
=======
              class="bg-whight border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  placeholder="Phone"

              required
            />
          </div>
          <div class="flex items-start mb-5">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </div>
>>>>>>> f766bb314a1ed7b9d8ec187a64d2f877acfa40fd
        </form>
      ) : (
        <p>Thank you for contacting us! We will get back to you soon.</p>
      )}
    </div>
  );
<<<<<<< HEAD


=======
};
>>>>>>> f766bb314a1ed7b9d8ec187a64d2f877acfa40fd

export default RegistrationForm;
