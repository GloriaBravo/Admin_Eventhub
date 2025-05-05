// src/assets/components/Sidebar.jsx
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/Sidebar.css";

const Sidebar = ({ onLogout }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const location = useLocation();

  // ✅ Al iniciar, extrae el nombre del usuario desde localStorage
  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem("session"));
    if (sessionData?.name) {
      setUserName(sessionData.name);
    }
  }, []);

  // ✅ Cierra el menú automáticamente cuando cambias de ruta
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // ✅ Al cerrar sesión, borra la sesión y actualiza estado superior
  const handleLogout = () => {
    localStorage.removeItem("session");
    if (onLogout) onLogout();
  };

  return (
    <>
      {/* Botón hamburguesa para pantallas pequeñas */}
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      {/* Sidebar lateral */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Botón de cerrar (solo visible en móvil) */}
        <button className="close-btn" onClick={closeMenu}>✖</button>

        {/* Opciones de navegación */}
        <ul>
          <li><NavLink to="/dashboard">📊 Dashboard</NavLink></li>
          <li><NavLink to="/panel">📋 Panel de Eventos</NavLink></li>
          <li><NavLink to="/eventos">📅 Gestión de Eventos</NavLink></li>
          <li><NavLink to="/usuarios">👥 Gestión de Usuarios</NavLink></li>
        </ul>

        {/* Tema claro/oscuro */}
        <div style={{ marginTop: "2rem" }}>
          <button onClick={toggleTheme}>
            {theme === "light" ? "🌙 Oscuro" : "☀️ Claro"}
          </button>
        </div>

        {/* Mostrar nombre del usuario actual */}
        <div style={{ marginTop: "2rem", fontWeight: "bold" }}>
          👋 Bienvenido, {userName || "Administrador"}
        </div>

        {/* Botón de cerrar sesión */}
        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={handleLogout}
            style={{ backgroundColor: "#ef4444" }}
          >
            🔒 Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;





