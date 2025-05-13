// src/pages/UserManagement.jsx
import React, { useState, useContext } from "react";
import UserTable from "../components/UserTable";
import UserProfile from "../components/UserProfile";
import { AdminContext } from "../context/AdminContext";

const UserManagement = () => {
  // Obtenemos usuarios y eventos desde el contexto global
  const { users, events, updateUser } = useContext(AdminContext);

  // Estado local para visualizar detalles del usuario
  const [userToView, setUserToView] = useState(null);

  // ✅ Volver de la vista de perfil
  const goBack = () => {
    setUserToView(null);
  };

  // ✅ Obtener eventos asociados a un usuario
  const getEventsByUser = (userId) => {
    return events.filter((event) => {
      if (Array.isArray(event.ownerIds)) return event.ownerIds.includes(userId);
      return event.ownerId === userId;
    });
  };

  // ✅ Cambiar estado bloqueado del usuario
  const handleToggleBlock = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      updateUser({ ...user, blocked: !user.blocked });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Usuarios</h2>

      {userToView ? (
        // ✅ Vista de perfil de usuario
        <UserProfile
          user={userToView}
          onBack={goBack}
          events={getEventsByUser(userToView.id)}
        />
      ) : (
        // ✅ Tabla de usuarios sin formulario
        <UserTable
          users={users}
          onToggleBlock={handleToggleBlock}
          onView={setUserToView}
        />
      )}
    </div>
  );
};

export default UserManagement;
