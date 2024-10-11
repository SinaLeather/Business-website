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
      .from('customers')
      .insert([{ name, email, phone }]);

    if (error) {
      setError('Error submitting the form. Try again.');
    } else {
      setSubmitted(true);
      setError('');
    }
  };

  return (
    <section className='container '>
      <div className='  justify-center text-center my-[100px] '>
        <h1 className='font-bold uppercase text-gray-700 text-6xl'>Hello!</h1>
        <h2 className='font-semibold  text-gray-600 text-xl'> You Can find Our news By only register </h2>
      </div>
    <div  className=' my-[150px] dark:bg-gray-800 justify-center '>

      {!submitted ? (
        <form onSubmit={handleSubmit}  class="max-w-sm mx-auto p-5">
          <div class="mb-5" >
            <label class="block mb-2 text-sm font-medium text-white " >Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              class="bg-gray-50 border border-gray-300 text-white  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 a w-full p-2.5 " placeholder="Name"
              required
            />
          </div>
          <div class="mb-5">
            <label class="block mb-2 text-sm font-medium text-white  " >Your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              class="bg-gray-50 border border-gray-300 text-white  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com"
            />
          </div>
          <div class="mb-5" >
            <label class="block mb-2 text-sm font-medium text-white  " > Phone  </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              class="bg-whight border border-gray-300 text-white   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  placeholder="Phone"

              required
            />
          </div>
          <div class="flex items-start mb-5">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 hover:bg-white-800 ">Submit</button>
          </div>
        </form>
        
      ) : (
        <p>Thank you for contacting us! We will get back to you soon.</p>
      )}
    </div>
    </section>
  );
};

export default RegistrationForm;
