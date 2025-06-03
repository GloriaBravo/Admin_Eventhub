import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { AdminProvider } from './context/AdminContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationProvider>
      <AdminProvider>
        <App />
      </AdminProvider>
    </NotificationProvider>
  </React.StrictMode>
);
