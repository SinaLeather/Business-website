import React, { createContext, useEffect, useState, useContext } from 'react';
import { supabase } from './supabaseClient';

const AuthContext = createContext();

// Provider component that wraps your app and makes auth object available to any child component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for an existing session
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth user
export const useAuth = () => useContext(AuthContext);
