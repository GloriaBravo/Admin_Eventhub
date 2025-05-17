// src/assets/components/AdminList.jsx
import React from "react";

const AdminList = ({ admins, onBack }) => {
  return (
    <div className="admin-list-card">
      <h2>Administradores Registrados</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {admins.length > 0 ? (
            admins.map((admin, idx) => (
              <tr key={idx}>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.role}</td>
                <td>{admin.active ? "Activo" : "Bloqueado"}</td>
                <td>
                  {/* Puedes agregar botones de bloquear, ver más, etc. */}
                  <button style={{ backgroundColor: admin.active ? "#e53935" : "#4CAF50", color: "#fff" }}>
                    {admin.active ? "Bloquear" : "Desbloquear"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No hay administradores registrados.</td>
            </tr>
          )}
        </tbody>
      </table>

      <button style={{ marginTop: "20px" }} onClick={onBack}>⬅ Volver a Registrar Administrador</button>
    </div>
  );
};

export default AdminList;

