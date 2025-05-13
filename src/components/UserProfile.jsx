// src/assets/components/UserProfile.jsx
import React from "react";

const UserProfile = ({ user, events, onBack }) => {
  if (!user) return null;

  return (
    <div style={{
      marginTop: "20px",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9"
    }}>
      <h3>Perfil de Usuario</h3>

      {/* Información principal del usuario */}
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Correo:</strong> {user.email}</p>
      <p><strong>Teléfono:</strong> {user.phone || "No registrado"}</p>
      <p><strong>Rol:</strong> {user.role}</p>
      <p>
        <strong>Estado:</strong>{" "}
        <span style={{
          color: user.blocked ? "red" : "green",
          fontWeight: "bold"
        }}>
          {user.blocked ? "Bloqueado" : "Activo"}
        </span>
      </p>

      {/* Eventos asociados al usuario */}
      <h4 style={{ marginTop: "20px" }}>Eventos Asignados</h4>

      {events.length > 0 ? (
        <table style={{
          width: "100%",
          marginTop: "10px",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
          borderRadius: "6px",
          overflow: "hidden"
        }}>
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>ID</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Título</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{event.id}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{event.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: "10px", color: "#555" }}>No tiene eventos asignados.</p>
      )}

      <button
        onClick={onBack}
        style={{
          marginTop: "20px",
          padding: "10px 16px",
          border: "none",
          backgroundColor: "#1A7DE5",
          color: "#fff",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        ⬅️ Volver
      </button>
    </div>
  );
};

export default UserProfile;
// src/assets/components/UserProfile.jsx
// src/assets/components/UserProfile.jsx

