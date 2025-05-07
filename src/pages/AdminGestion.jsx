// src/pages/AdminGestion.jsx
import React, { useState } from "react";
import AdminForm from "../components/AdminForm";
import AdminList from "../components/AdminList";
import { useNavigate } from "react-router-dom";
import "../styles/AdminGestion.css";

const AdminGestion = () => {
  const [admins, setAdmins] = useState([]);
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
    role: "Administrador",
    status: "active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    const newAdmin = { ...formData, id: Date.now(), status: "active" };
    setAdmins((prev) => [...prev, newAdmin]);
    setFormData({
      name: "",
      id: "",
      address: "",
      birthdate: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Administrador",
      status: "active",
    });
  };

  const toggleStatus = (id) => {
    setAdmins((prev) =>
      prev.map((admin) =>
        admin.id === id
          ? { ...admin, status: admin.status === "active" ? "blocked" : "active" }
          : admin
      )
    );
  };

  return (
    <div className="admin-gestion-wrapper horizontal-layout">
      <div className="top-header">
        <h1>Gestión de Administradores</h1>
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          ⬅ Volver al Dashboard
        </button>
      </div>
      <div className="admin-layout">
        <AdminForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <AdminList admins={admins} toggleStatus={toggleStatus} />
      </div>
    </div>
  );
};

export default AdminGestion;
