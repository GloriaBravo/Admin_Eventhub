// src/assets/components/UserTable.jsx
import React from "react";

const UserTable = ({ users, onDelete, onEdit, onView }) => {
  const safeUsers = Array.isArray(users) ? users : []; // 👈 Garantiza un array

  return (
    <table
      style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}
    >
      <thead>
        <tr>
          <th style={{ borderBottom: "1px solid #ccc" }}>Nombre</th>
          <th style={{ borderBottom: "1px solid #ccc" }}>Correo</th>
          <th style={{ borderBottom: "1px solid #ccc" }}>Rol</th>
          <th style={{ borderBottom: "1px solid #ccc" }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {safeUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button onClick={() => onEdit(user)}>Editar</button>
              <button
                onClick={() => onDelete(user.id)}
                style={{ marginLeft: "10px" }}
              >
                Bloquear
              </button>
              <button
                onClick={() => onView(user)}
                style={{ marginLeft: "10px" }}
              >
                Ver Perfil
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
