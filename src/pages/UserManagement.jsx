import React, { useState, useContext } from "react";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";
import UserProfile from "../components/UserProfile";
import { AdminContext } from "../context/AdminContext";

const UserManagement = () => {
  const { users, events, addUser, updateUser, deleteUser } = useContext(AdminContext);

  const [userToEdit, setUserToEdit] = useState(null);
  const [userToView, setUserToView] = useState(null);

  const handleSaveUser = (user) => {
    if (userToEdit) {
      updateUser({ ...user, id: userToEdit.id });
      setUserToEdit(null);
    } else {
      addUser(user);
    }
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
        <UserProfile user={userToView} onBack={goBack} events={getEventsByUser(userToView.id)} />
      ) : (
        <>
          <UserForm onAddUser={handleSaveUser} userToEdit={userToEdit} />
          <UserTable users={users} onDelete={deleteUser} onEdit={setUserToEdit} onView={setUserToView} />
        </>
      )}
    </div>
  );
};

export default UserManagement;
