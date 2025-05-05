import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

// El componente Login ahora recibe onLogin como prop (viene desde App.jsx)
const Login = ({ onLogin }) => {
  const { users } = useContext(AdminContext); // Accede a la lista de usuarios desde el contexto

  // Estado local para manejar los campos del formulario
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Estado para alternar visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Estado para mostrar mensaje de error
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Manejador para actualizar el estado de email y password en tiempo real
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Alternar visibilidad de la contraseña
  const togglePassword = () => setShowPassword((prev) => !prev);

  // Manejador cuando se envía el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Buscar un usuario con email, contraseña y rol de Administrador válidos
    const foundUser = users.find(
      (u) =>
        u.email.trim() === formData.email.trim() &&
        u.password === formData.password &&
        u.role === "Administrador"
    );

    if (foundUser) {
      // Guardar sesión en localStorage
      localStorage.setItem("session", JSON.stringify(foundUser));

      // ✅ Actualizar el estado de sesión en App.jsx (reacción inmediata)
      if (onLogin) onLogin(foundUser);

      // Redirigir al dashboard
      navigate("/dashboard");
    } else {
      // Mostrar error si no coincide
      setError("Correo o contraseña inválidos, o no tiene permisos de administrador.");
    }
  };

  return (
    <div style={{ padding: "3rem", maxWidth: "400px", margin: "auto" }}>
      <h2 style={{ color: "var(--text-color)" }}>Iniciar sesión como Administrador</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
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
            style={{ width: "100%", paddingRight: "2.5rem" }}
          />
          {/* Botón para mostrar u ocultar contraseña */}
          <span
            onClick={togglePassword}
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "1.1rem",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit">Ingresar</button>
      </form>

      {/* Mostrar mensaje de error si lo hay */}
      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>
      )}
    </div>
  );
};

export default Login;
