import React from "react";

const AdminList = ({ admins, toggleStatus }) => {
  return (
    <div className="admin-table-card">
      <h3>Administradores Registrados</h3>
      <div className="table-responsive">
        <table className="admin-table">
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
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.role}</td>
                <td>{admin.status === "active" ? "Activo" : "Bloqueado"}</td>
                <td>
                  <button
                    className={admin.status === "active" ? "block-btn" : "unblock-btn"}
                    onClick={() => toggleStatus(admin.id)}
                  >
                    {admin.status === "active" ? "Bloquear" : "Desbloquear"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;
