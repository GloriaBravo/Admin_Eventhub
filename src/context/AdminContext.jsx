// src/context/AdminContext.js
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AdminContext = createContext();

const API_URL = "http://localhost:3001/api"; // Asegúrate que la fake API esté corriendo

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  // 🔄 Carga inicial de datos desde la API
  useEffect(() => {
    fetchUsers();
    fetchEvents();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_URL}/events`);
      setEvents(res.data);
    } catch (err) {
      console.error("Error cargando eventos:", err);
    }
  };

  // ✅ Actualizar un evento localmente y en la API
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

  return (
    <AdminContext.Provider
      value={{ users, events, setEvents, updateEvent, deleteEvent }}
    >
      {children}
    </AdminContext.Provider>
  );
};
// ✅ Se ha añadido un contexto para manejar el estado de los usuarios y eventos
// ✅ Se han añadido funciones para cargar, actualizar y eliminar eventos
