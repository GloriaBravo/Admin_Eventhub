// src/assets/components/UserForm.jsx
import React, { useEffect, useState } from "react";

const UserForm = ({ onAddUser, userToEdit }) => {
  // 👉 Estado local con los campos del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // ✅ Campo nuevo agregado
    role: "Usuario",
  });

  // 👉 Si se está editando un usuario, cargar sus datos en el formulario
  useEffect(() => {
    if (userToEdit) setFormData(userToEdit);
  }, [userToEdit]);

  // 👉 Actualizar estado al escribir en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 👉 Validar y enviar datos al hacer submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone } = formData;

    if (!name || !email || !phone) {
      return alert("Completa todos los campos.");
    }

    onAddUser(formData); // 🔁 Enviar los datos al componente padre
    setFormData({ name: "", email: "", phone: "", role: "Usuario" }); // 🧹 Limpiar formulario
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", gap: "1rem" }}
    >
      {/* ✅ Campo nombre */}
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
      />

      {/* ✅ Campo correo */}
      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={formData.email}
        onChange={handleChange}
      />

      {/* ✅ Campo teléfono agregado */}
      <input
        type="text"
        name="phone"
        placeholder="Teléfono"
        value={formData.phone}
        onChange={handleChange}
      />

      {/* ✅ Selector de rol */}
      <select name="role" value={formData.role} onChange={handleChange}>
        <option>Administrador</option>
        <option>Subadministrador</option>
        <option>Creador de eventos</option>
        <option>Subcreador</option>
        <option>Usuario</option>
      </select>

      {/* ✅ Botón de acción (agregar o actualizar) */}
      <button type="submit">
        {userToEdit ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
};

export default UserForm;

