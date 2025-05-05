import React, { createContext, useState, useEffect } from "react";

// Crear el contexto
export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [
      { id: 1, name: "Juan Pérez", email: "juan@email.com", password: "admin123", role: "Administrador" },
      { id: 2, name: "Ana Gómez", email: "ana@email.com", password: "creador123", role: "Creador de eventos" },
    ];
  });

  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : [
      { id: 101, title: "Feria de Tecnología", ownerId: 2 },
      { id: 102, title: "Congreso de Diseño", ownerId: 2 },
      { id: 103, title: "Seminario de Software", ownerId: 1 },
    ];
  });

  // Guardar en localStorage cuando haya cambios
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addUser = (user) => {
    const newUser = { ...user, id: Date.now() };
    setUsers((prev) => [...prev, newUser]);
  };

  const updateUser = (updatedUser) => {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setEvents((prev) => prev.filter((e) => e.ownerId !== id));
  };

  const addEvent = (event) => {
    const newEvent = { ...event, id: Date.now() };
    setEvents((prev) => [...prev, newEvent]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents((prev) => prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        users,
        events,
        addUser,
        updateUser,
        deleteUser,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
