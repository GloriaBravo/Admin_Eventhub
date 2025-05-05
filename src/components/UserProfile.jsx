// src/assets/components/UserProfile.jsx
import React from "react";

const UserProfile = ({ user, events, onBack }) => {
  if (!user) return null;

  return (
    <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Perfil de Usuario</h3>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Correo:</strong> {user.email}</p>
      <p><strong>Rol:</strong> {user.role}</p>

      <h4 style={{ marginTop: "20px" }}>Eventos Asignados</h4>
      {events.length > 0 ? (
        <table style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc" }}>ID</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Título</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tiene eventos asignados.</p>
      )}

      <button onClick={onBack} style={{ marginTop: "20px" }}>Volver</button>
    </div>
  );
};

export default UserProfile;

