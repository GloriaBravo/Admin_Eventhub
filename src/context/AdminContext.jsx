// src/context/AdminContext.js
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Contexto global para compartir usuarios y eventos
export const AdminContext = createContext();

// URL de la API (fake API en este caso)
const API_URL = "http://localhost:3001/api";

// Componente proveedor del contexto
export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  // 🔄 Cargar usuarios y eventos al inicio
  useEffect(() => {
    fetchUsers();
    fetchEvents();
  }, []);

  // 🔄 Obtener todos los usuarios desde la API
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    }
  };

  // 🔄 Obtener todos los eventos desde la API
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_URL}/events`);
      setEvents(res.data);
    } catch (err) {
      console.error("Error cargando eventos:", err);
    }
  };

  // ✅ Actualizar un evento en la API y estado local
  const updateEvent = async (updatedEvent) => {
    try {
      const res = await axios.put(`${API_URL}/events/${updatedEvent.id}`, updatedEvent);
      setEvents((prev) =>
        prev.map((e) => (e.id === updatedEvent.id ? res.data : e))
      );
    } catch (err) {
      console.error("Error actualizando evento:", err);
    }
  };

  // ✅ Eliminar un evento
  const deleteEvent = async (id) => {
    try {
      await axios.delete(`${API_URL}/events/${id}`);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Error eliminando evento:", err);
    }
  };

  // ✅ Actualizar un usuario (para bloquear/desbloquear, editar datos, etc.)
  const updateUser = async (updatedUser) => {
    try {
      const res = await axios.put(`${API_URL}/users/${updatedUser.id}`, updatedUser);
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? res.data : u))
      );
    } catch (err) {
      console.error("Error actualizando usuario:", err);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        users,
        events,
        setEvents,
        fetchUsers,
        fetchEvents,
        updateEvent,
        deleteEvent,
        updateUser, // ✅ ahora disponible globalmente
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
