import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminForm from "../components/AdminForm";

const AdminFormPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    address: "",
    birthdate: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Administrador"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("Las contraseñas no coinciden");
    }

    // Aquí iría la lógica de guardar al backend o localStorage
    alert("Administrador registrado correctamente");
    navigate("/admin/lista");
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>Registrar Administrador</h2>
      <AdminForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <button onClick={() => navigate("/admin/lista")} style={{ marginTop: "16px" }}>
        Ver Administradores
      </button>
    </div>
  );
};

export default AdminFormPage;
// Este componente es la página que contiene el formulario para registrar un nuevo administrador. Al enviar el formulario, se valida que las contraseñas coincidan y se redirige a la página de lista de administradores.
// También se muestra un botón para ver la lista de administradores registrados.