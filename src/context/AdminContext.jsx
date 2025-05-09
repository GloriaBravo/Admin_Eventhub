import React, { createContext, useState, useEffect } from "react";

// Crear el contexto
export const AdminContext = createContext();

const API_URL = "http://localhost:3001/api";

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  // Cargar datos iniciales desde la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/users`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/events`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchUsers();
    fetchEvents();
  }, []);

  const addUser = async (user) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const newUser = await response.json();
      setUsers((prev) => [...prev, newUser]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const response = await fetch(`${API_URL}/users/${updatedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      const returnedUser = await response.json();
      setUsers((prev) => prev.map((u) => (u.id === returnedUser.id ? returnedUser : u)));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
      });
      setUsers((prev) => prev.filter((u) => u.id !== id));
      // La API ya se encarga de eliminar eventos asociados, pero actualizamos el estado local de eventos también
      setEvents((prev) => prev.filter((e) => e.ownerId !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const addEvent = async (event) => {
    try {
      const response = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      const newEvent = await response.json();
      setEvents((prev) => [...prev, newEvent]);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const updateEvent = async (updatedEvent) => {
    try {
      const response = await fetch(`${API_URL}/events/${updatedEvent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });
      const returnedEvent = await response.json();
      setEvents((prev) => prev.map((e) => (e.id === returnedEvent.id ? returnedEvent : e)));
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
      });
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
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

