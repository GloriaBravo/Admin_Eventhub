// src/assets/components/AdminList.jsx
import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

const AdminList = ({ admins, onBack }) => {
  const { updateUser } = useContext(AdminContext);

  // ✅ Función para bloquear o desbloquear un admin
  const handleToggleStatus = async (admin) => {
    try {
      await updateUser({ ...admin, active: !admin.active });
    } catch (err) {
      alert("Error actualizando estado del administrador");
      console.error(err);
    }
  };

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
                  <button
                    onClick={() => handleToggleStatus(admin)}
                    style={{
                      backgroundColor: admin.active ? "#e53935" : "#4CAF50",
                      color: "#fff",
                      padding: "6px 10px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    {admin.active ? "Activar" : "Desactivar"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No hay administradores registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button style={{ marginTop: "20px" }} onClick={onBack}>
        ⬅ Volver a Registrar Administrador
      </button>
    </div>
  );
};

export default AdminList;


