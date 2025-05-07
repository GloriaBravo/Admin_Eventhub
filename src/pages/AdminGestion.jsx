import React, { useState } from "react";
import "../styles/AdminGestion.css";

const AdminGestion = () => {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    address: "",
    birthdate: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    status: "active"
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
      status: "active"
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
    <div className="admin-form-container">
      <h2>Registrar Administrador</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre completo" required />
        <input name="id" value={formData.id} onChange={handleChange} placeholder="Identificación" required />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Dirección" required />
        <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Teléfono" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" required />
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirmar contraseña" required />
        <button type="submit">Registrar</button>
      </form>

      <h3>Administradores Registrados</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.status}</td>
              <td>
                <button onClick={() => toggleStatus(admin.id)}>
                  {admin.status === "active" ? "Bloquear" : "Desbloquear"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminGestion;
