// src/utils/auth.js

// Waktu expire 5 menit
const fiveMinutesInMs = 5 * 60 * 1000;

export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  const loginTime = localStorage.getItem('loginTime');

  if (!token || !loginTime) {
    return false; // Kalau token atau loginTime gak ada, artinya belum login
  }

  const now = new Date().getTime();
  const elapsed = now - parseInt(loginTime, 10);

  if (elapsed > fiveMinutesInMs) {
    logout();
    return false; // Token expired
  }

  return true; // Masih login
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('loginTime');
  localStorage.removeItem('user'); // optional: kalau kamu save user data di localStorage
  window.location.href = '/login'; // Redirect ke login page
};
