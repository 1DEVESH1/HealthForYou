// client/src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Use an effect to set the user state if a token is in localStorage
  useEffect(() => {
    if (token) {
      // In a real app, you'd verify the token with the backend here
      // and get fresh user data. For this MVP, we'll parse it.
      // For simplicity, we'll just store the user object from login.
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [token]);

  // Login function
  const login = (userData, authToken) => {
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = !!token;
  // Check user role
  const isPatient = isAuthenticated && user?.role === 'patient';
  const isProvider = isAuthenticated && user?.role === 'provider';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isPatient,
        isProvider,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};