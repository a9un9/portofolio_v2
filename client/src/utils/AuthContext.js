// src/utils/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { isLoggedIn } from './auth'; // Import fungsi isLoggedIn untuk pengecekan login

// Membuat AuthContext
export const AuthContext = createContext();

// AuthProvider untuk menyediakan context ke seluruh aplikasi
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoggedIn()) {
      // Jika sudah login, set user dari localStorage
      const userData = {
        username: localStorage.getItem('username'),
      };
      setUser(userData);
    }
  }, []);

  const login = (userData) => {
    // Simpan token dan username ke localStorage dan update state
    localStorage.setItem('token', 'your-jwt-token');
    localStorage.setItem('username', userData.username);
    setUser(userData);
  };

  const logout = () => {
    // Hapus token dan username dari localStorage, set user menjadi null
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
