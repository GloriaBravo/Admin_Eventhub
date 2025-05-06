// src/assets/components/Sidebar.jsx
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faClipboardList,
  faCalendarAlt,
  faUsers,
  faSun,
  faMoon,
  faUserShield,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Sidebar.css";

const Sidebar = ({ onLogout }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const location = useLocation();

  // Leer nombre del usuario desde localStorage
  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem("session"));
    if (sessionData?.name) {
      setUserName(sessionData.name);
    }
  }, []);

  // Cerrar menú cuando cambia de ruta
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("session");
    if (onLogout) onLogout();
  };

  return (
    <>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={closeMenu}>✖</button>

        {/* Encabezado con logo y nombre */}
        <div className="sidebar-header">
          <img src="/logo.svg" alt="EventHub Logo" className="logo" />
          <span className="app-name">EventHub</span>
        </div>

        {/* Navegación */}
        <ul className="nav-links">
          <li>
            <NavLink to="/dashboard">
              <FontAwesomeIcon icon={faChartBar} /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/panel">
              <FontAwesomeIcon icon={faClipboardList} /> Panel de Eventos
            </NavLink>
          </li>
          <li>
            <NavLink to="/eventos">
              <FontAwesomeIcon icon={faCalendarAlt} /> Gestión de Eventos
            </NavLink>
          </li>
          <li>
            <NavLink to="/usuarios">
              <FontAwesomeIcon icon={faUsers} /> Gestión de Usuarios
            </NavLink>
          </li>
        </ul>

        {/* Footer del Sidebar */}
        <div className="sidebar-footer">
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />{" "}
            {theme === "light" ? "Oscuro" : "Claro"}
          </button>

          <p className="user-name">👋 Bienvenido, <strong>{userName || "Administrador"}</strong></p>

          <button className="logout-btn" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
          </button>

          <button className="admin-button">
            <FontAwesomeIcon icon={faUserShield} /> Gestionar Administradores
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
