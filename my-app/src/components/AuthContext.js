// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser (session?.user || null);
    setLoading(false);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser (session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser  }}>
    {children}
    </AuthContext.Provider> 
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};