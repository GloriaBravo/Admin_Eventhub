// src/context/AdminContext.jsx
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

const API_URL = import.meta.env.VITE_API_BASE_URL + "/api"; // Usa la variable de entorno

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (token && token.includes(".")) {
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }
  return { "Content-Type": "application/json" };
};

export const AdminProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 👇 Garantiza que los eventos siempre sean un array (fallback seguro)
  const safeEvents = Array.isArray(events) ? events : [];

  // 🔥 FUNCION PRINCIPAL PARA CAMBIAR ESTADO DE EVENTO (PATCH)
  const changeEventStatus = async (eventId, newStatus) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `${API_URL}/events/${eventId}/status`,
        { status: newStatus },
        { headers: getAuthHeaders() }
      );
      console.log("Estado cambiado exitosamente:", response.data);

      // Actualiza el evento en tu estado local
      setEvents((prevEvents) =>
        Array.isArray(prevEvents)
          ? prevEvents.map((e) =>
              e.id === eventId ? { ...e, status: { ...e.status, nameState: newStatus } } : e
            )
          : []
      );
    } catch (err) {
      console.error("Error cambiando estado:", err);
      setError("Error cambiando estado del evento");
    } finally {
      setLoading(false);
    }
  };

  // ⚡ FUNCIONES AUXILIARES (fetchEvents)
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/events`, {
        headers: getAuthHeaders(),
      });
      console.log("👉 Datos recibidos de la API:", response.data); // 🚀 Agrega este log
      const data = response.data;

      // ⚠️ Garantiza que la respuesta sea un array
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando eventos:", err);
      setError("Error cargando eventos");
      setEvents([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial de eventos
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        events: safeEvents, // ✅ siempre un array seguro
        fetchEvents,
        changeEventStatus,
        loading,
        error,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
