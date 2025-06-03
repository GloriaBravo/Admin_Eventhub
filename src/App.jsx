import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Páginas
import DashboardAdmin from "./pages/DashboardAdmin";
import UserManagement from "./pages/UserManagement";
import EventManagement from "./pages/EventManagement";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import EventDetail from "./pages/EventDetail";
import AdminGestion from "./pages/AdminGestion";
import AdminFormPage from "./pages/AdminFormPage";
import AdminTablePage from "./pages/AdminTablePage";
// Componentes compartidos
import Sidebar from "./components/Sidebar";

function App() {
  const [session, setSession] = useState(() => {
    return JSON.parse(localStorage.getItem("session"));
  });

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
      {session ? (
        <div style={{ display: "flex" }}>
          <Sidebar onLogout={() => setSession(null)} />
          <div style={{ flexGrow: 1, padding: "20px", minHeight: "100vh" }}>
            <Routes>
              <Route path="/dashboard" element={<DashboardAdmin />} />
              <Route path="/usuarios" element={<UserManagement />} />
              <Route path="/eventos" element={<EventManagement />} />
              <Route path="/panel" element={<AdminPanel />} />
              <Route path="/eventos/:id" element={<EventDetail />} />
              <Route path="/admin/registrar" element={<AdminFormPage />} />
              <Route path="/admin/lista" element={<AdminTablePage />} />
              <Route
                path="/gestionar-administradores"
                element={<AdminGestion />}
              />
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={setSession} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;

