// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Importación de vistas o páginas
import DashboardAdmin from "./pages/DashboardAdmin";
import UserManagement from "./pages/UserManagement";
import EventManagement from "./pages/EventManagement";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import EventDetail from "./pages/EventDetail";


// Componentes compartidos
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // Estado que controla si hay un usuario autenticado
  const [session, setSession] = useState(() => {
    return JSON.parse(localStorage.getItem("session"));
  });

  // Escucha cambios en otras pestañas (opcional, útil si abres múltiples ventanas)
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedSession = JSON.parse(localStorage.getItem("session"));
      setSession(updatedSession);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      {/* Si hay sesión activa, renderizamos el panel administrativo */}
      {session ? (
        <div style={{ display: "flex" }}>
          {/* Sidebar recibe una función para cerrar sesión */}
          <Sidebar onLogout={() => setSession(null)} />

          <div style={{ flexGrow: 1, padding: "20px", minHeight: "100vh" }}>
            <Routes>
              <Route path="/dashboard" element={<DashboardAdmin />} />
              <Route path="/usuarios" element={<UserManagement />} />
              <Route path="/eventos" element={<EventManagement />} />
              <Route path="/panel" element={<AdminPanel />} />
              {/* Si el usuario accede a raíz "/", lo mandamos al dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
              {/* Cualquier ruta no válida también lo mandamos al dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
              <Route path="/eventos/:id" element={<EventDetail />} />
            </Routes>
          </div>
        </div>
      ) : (
        // Si no hay sesión, solo puede ver el login
        <Routes>
          {/* Login recibe onLogin para actualizar la sesión al autenticarse */}
          <Route path="/login" element={<Login onLogin={setSession} />} />
          {/* Si intenta ir a otra ruta sin estar logueado, lo mandamos al login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;

