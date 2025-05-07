// src/services/api.js
import axios from 'axios';

// Membuat instance Axios
const API = axios.create({
  baseURL: 'http://localhost:5000/api',  // Base URL untuk API
});

// Menambahkan base URL untuk gambar
export const baseImageURL = 'http://localhost:5000';  // URL server gambar

// Menambahkan interceptor untuk permintaan (request) dan menangani Authorization header
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Menambahkan token pada header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);  // Jika ada error, kembalikan error tersebut
  }
);

// Menambahkan interceptor untuk menangani respon (response) dan error
API.interceptors.response.use(
  (response) => {
    return response;  // Jika respon berhasil, langsung kembalikan data
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Misalnya token sudah kedaluwarsa, lakukan logout atau tampilkan pesan
      console.log('Token sudah kadaluarsa, silakan login lagi');
      localStorage.removeItem('token');
      // Redirect ke halaman login
      window.location.href = '/login';
    }
    return Promise.reject(error);  // Kembalikan error jika bukan status 401
  }
);

export default API;
