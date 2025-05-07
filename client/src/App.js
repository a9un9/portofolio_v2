// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';  // Import AuthProvider
import Home from './pages/Home';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Profil from './pages/admin/Profil';
import TentangKami from './pages/admin/TentangKami';
import Pendidikan from './pages/admin/Pendidikan';
import Pengalaman from './pages/admin/Pengalaman';
import Teknis from './pages/admin/Teknis';
import NonTeknis from './pages/admin/NonTeknis';
import Kontak from './pages/admin/Kontak';


function App() {
  return (
    <AuthProvider>  {/* Membungkus aplikasi dengan AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/tentang-kami" element={<TentangKami />} />
          <Route path="/pendidikan" element={<Pendidikan />} />
          <Route path="/pengalaman" element={<Pengalaman />} />
          <Route path="/teknis" element={<Teknis />} />
          <Route path="/non-teknis" element={<NonTeknis />} />
          <Route path="/kontak" element={<Kontak />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
