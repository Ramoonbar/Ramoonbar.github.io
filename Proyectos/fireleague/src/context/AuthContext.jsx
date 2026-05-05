import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const login = (email, password) => {
    // Simulación de login
    setUser({
      name: 'Usuario Demo',
      email: email,
      level: 'Free', // Free, Gold, Premium
      avatar: 'U'
    });
    setIsLoginOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoginOpen, setIsLoginOpen }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
