import React, { useEffect, useState } from "react";

const UserForm = ({ onAddUser, userToEdit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Usuario",
  });

  useEffect(() => {
    if (userToEdit) setFormData(userToEdit);
  }, [userToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return alert("Completa todos los campos.");
    onAddUser(formData);
    setFormData({ name: "", email: "", role: "Usuario" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px", display: "flex", gap: "1rem" }}>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={formData.email}
        onChange={handleChange}
      />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option>Administrador</option>
        <option>Subadministrador</option>
        <option>Creador de eventos</option>
        <option>Subcreador</option>
        <option>Usuario</option>
      </select>
      <button type="submit">{userToEdit ? "Actualizar" : "Agregar"}</button>
    </form>
  );
};

export default UserForm;

