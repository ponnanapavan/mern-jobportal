import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from './socket-context/SocketJobNotification.jsx';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './socket-context/authContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <SocketProvider>
        <ToastContainer />
        <App />
      </SocketProvider>
      </AuthProvider>
      
    </BrowserRouter>
  </StrictMode>,
);
