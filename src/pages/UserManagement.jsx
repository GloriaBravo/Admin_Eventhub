// src/assets/pages/UserManagement.jsx
import React, { useState } from "react";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";
import UserProfile from "../components/UserProfile";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Juan Pérez", email: "juan@email.com", role: "Administrador" },
    { id: 2, name: "Ana Gómez", email: "ana@email.com", role: "Creador de eventos" },
  ]);

  const [events, setEvents] = useState([
    { id: 101, title: "Feria de Tecnología", ownerId: 2 },
    { id: 102, title: "Congreso de Diseño", ownerId: 2 },
    { id: 103, title: "Seminario de Software", ownerId: 1 },
  ]);

  const [userToEdit, setUserToEdit] = useState(null);
  const [userToView, setUserToView] = useState(null);

  const addUser = (user) => {
    if (userToEdit) {
      setUsers(users.map((u) => (u.id === userToEdit.id ? { ...user, id: u.id } : u)));
      setUserToEdit(null);
    } else {
      const newUser = { ...user, id: Date.now() };
      setUsers([...users, newUser]);
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setEvents(events.filter((event) => event.ownerId !== id));
  };

  const editUser = (user) => {
    setUserToEdit(user);
  };

  const viewUser = (user) => {
    setUserToView(user);
  };

  const goBack = () => {
    setUserToView(null);
  };

  const getEventsByUser = (userId) => {
    return events.filter((event) => event.ownerId === userId);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Usuarios</h2>

      {userToView ? (
        <UserProfile
          user={userToView}
          onBack={goBack}
          events={getEventsByUser(userToView.id)}
        />
      ) : (
        <>
          <UserForm onAddUser={addUser} userToEdit={userToEdit} />
          <UserTable users={users} onDelete={deleteUser} onEdit={editUser} onView={viewUser} />
        </>
      )}
    </div>
  );
};

export default UserManagement;

