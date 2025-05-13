// src/assets/components/UserTable.jsx
import React from "react";

const UserTable = ({ users, onToggleBlock, onView }) => {
  return (
    <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ borderBottom: "1px solid #ccc" }}>Nombre</th>
          <th style={{ borderBottom: "1px solid #ccc" }}>Correo</th>
          <th style={{ borderBottom: "1px solid #ccc" }}>Teléfono</th>
          <th style={{ borderBottom: "1px solid #ccc" }}>Rol</th>
          <th style={{ borderBottom: "1px solid #ccc" }}>Estado</th>
          <th style={{ borderBottom: "1px solid #ccc" }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone || "No registrado"}</td>
            <td>{user.role}</td>
            <td>{user.blocked ? "Bloqueado" : "Activo"}</td>
            <td>
              {/* Botón para bloquear/desbloquear */}
              <button
                onClick={() => onToggleBlock(user.id)}
                style={{ backgroundColor: user.blocked ? "#4caf50" : "#f44336", color: "#fff", padding: "5px 10px", borderRadius: "6px", border: "none", marginRight: "8px" }}
              >
                {user.blocked ? "Desbloquear" : "Bloquear"}
              </button>

              {/* Ver Perfil */}
              <button onClick={() => onView(user)} style={{ marginLeft: "5px" }}>
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
