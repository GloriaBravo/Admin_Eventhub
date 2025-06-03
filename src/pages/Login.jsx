// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Login.css";
import logo from "../assets/logo-eventhub.png";
import LoadingModal from "../components/LoadingModal";
import { useNotification } from "../context/NotificationContext";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Credenciales incorrectas");

      const token = await res.text();
      localStorage.setItem("token", token);

      const decoded = parseJwt(token);
      const username = decoded.sub;
      const roleString = decoded.roles?.[0] || "";
      const match = roleString.match(/nombreRol=(ROLE_[A-Z]+)/);
      const userRole = match ? match[1] : "";

      localStorage.setItem("userName", username);
      localStorage.setItem("role", userRole);

      onLogin?.({ token, userName: username, role: userRole });
      showSuccess("Inicio de sesión exitoso", { flow: "login" });
      navigate("/dashboard");

    } catch (error) {
      showError(error.message, { flow: "login" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {loading && <LoadingModal show={true} text="Iniciando sesión..." />}
      <div className="login-card">
        <img src={logo} alt="EventHub Logo" className="logo" />
        <h2>Iniciar sesión como Administrador</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            placeholder="Nombre de usuario"
            value={formData.userName}
            onChange={handleChange}
            required
          />
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="toggle-password" onClick={togglePassword}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
