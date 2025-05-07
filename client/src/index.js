import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// Prevent ResizeObserver error in development
if (typeof window !== 'undefined') {
  const observer = new ResizeObserver(() => {});
  observer.observe(document.body);
}

// 🔧 Workaround for warning ResizeObserver loop (khusus development)
if (process.env.NODE_ENV === 'development') {
  const origError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('ResizeObserver loop completed')
    ) {
      return;
    }
    origError(...args);
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
