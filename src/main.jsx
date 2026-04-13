// Isi file src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);