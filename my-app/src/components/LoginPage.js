import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signIn({ email, password });
    if (error) {
      setError(error.message);
    } else {
      onLogin(); // Call the onLogin function passed as a prop to update the state
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginPage;