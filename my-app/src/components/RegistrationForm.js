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

  return (
    <div>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Register</button>
        </form>
      ) : (
        <p>Thank you for contacting us! We will get back to you soon.</p>
      )}
    </div>
  );
};

export default RegistrationForm;
