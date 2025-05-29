// src/context/AdminContext.jsx actualizado
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Contexto global para compartir usuarios y eventos
export const AdminContext = createContext();

// URL de la API
const API_URL = "https://backendeventhub.onrender.com/api";

// Función helper para obtener headers con token - ACTUALIZADA
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  
  // El token ahora se guarda como string plano, no como JSON
  if (token && token.includes(".")) {
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  } else {
    console.warn("Token no válido o no encontrado");
    return {
      'Content-Type': 'application/json'
    };
  }
};

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token && token.includes(".");
};

// Función para manejar errores de autenticación
const handleAuthError = (err) => {
  if (err.response?.status === 401 || err.response?.status === 403) {
    console.warn("Token expirado o inválido, limpiando localStorage");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    // Opcional: redirigir al login
    window.location.href = '/login';
    return true;
  }
  return false;
};

// Componente proveedor del contexto
export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔄 Cargar usuarios y eventos al inicio (solo si está autenticado)
  useEffect(() => {
    if (isAuthenticated()) {
      fetchUsers();
      fetchEvents();
    } else {
      console.warn("Usuario no autenticado, no se cargarán datos");
    }
  }, []);

  // 🔄 Obtener todos los usuarios desde la API
  const fetchUsers = async () => {
    if (!isAuthenticated()) {
      setError("No está autenticado");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log("Cargando usuarios con headers:", getAuthHeaders());
      
      const res = await axios.get(`${API_URL}/users`, {
        headers: getAuthHeaders()
      });
      
      console.log("Usuarios cargados exitosamente:", res.data);
      setUsers(res.data);
      
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      
      if (!handleAuthError(err)) {
        setError(`Error al cargar usuarios: ${err.response?.data?.message || err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Obtener todos los eventos desde la API
  const fetchEvents = async () => {
    if (!isAuthenticated()) {
      setError("No está autenticado");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log("Cargando eventos con headers:", getAuthHeaders());
      
      const res = await axios.get(`${API_URL}/events`, {
        headers: getAuthHeaders()
      });
      
      console.log("Eventos cargados exitosamente:", res.data);
      setEvents(res.data);
      
    } catch (err) {
      console.error("Error cargando eventos:", err);
      
      if (!handleAuthError(err)) {
        setError(`Error al cargar eventos: ${err.response?.data?.message || err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Obtener un evento específico por ID
  const fetchEventById = async (eventId) => {
    if (!isAuthenticated()) {
      throw new Error("No está autenticado");
    }

    try {
      setError(null);
      
      console.log(`Cargando evento ${eventId} con headers:`, getAuthHeaders());
      
      const res = await axios.get(`${API_URL}/events/${eventId}`, {
        headers: getAuthHeaders()
      });
      
      console.log("Evento cargado exitosamente:", res.data);
      return res.data;
      
    } catch (err) {
      console.error(`Error cargando evento ${eventId}:`, err);
      
      if (handleAuthError(err)) {
        throw new Error("Sesión expirada");
      } else {
        throw new Error(`Error al cargar evento: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  // ✅ Crear un nuevo evento
  const createEvent = async (newEvent) => {
    if (!isAuthenticated()) {
      throw new Error("No está autenticado");
    }

    try {
      setError(null);
      
      console.log("Creando evento con headers:", getAuthHeaders());
      console.log("Datos del evento:", newEvent);
      
      const res = await axios.post(`${API_URL}/events`, newEvent, {
        headers: getAuthHeaders()
      });
      
      console.log("Evento creado exitosamente:", res.data);
      setEvents((prev) => [...prev, res.data]);
      return res.data;
      
    } catch (err) {
      console.error("Error creando evento:", err);
      
      if (handleAuthError(err)) {
        throw new Error("Sesión expirada");
      } else {
        setError(`Error al crear evento: ${err.response?.data?.message || err.message}`);
        throw err;
      }
    }
  };

  // ✅ Actualizar un evento en la API y estado local
  const updateEvent = async (updatedEvent) => {
    if (!isAuthenticated()) {
      throw new Error("No está autenticado");
    }

    try {
      setError(null);
      
      console.log(`Actualizando evento ${updatedEvent.id} con headers:`, getAuthHeaders());
      console.log("Datos actualizados:", updatedEvent);
      
      const res = await axios.put(`${API_URL}/events/${updatedEvent.id}`, updatedEvent, {
        headers: getAuthHeaders()
      });
      
      console.log("Evento actualizado exitosamente:", res.data);
      setEvents((prev) =>
        prev.map((e) => (e.id === updatedEvent.id ? res.data : e))
      );
      return res.data;
      
    } catch (err) {
      console.error("Error actualizando evento:", err);
      
      if (handleAuthError(err)) {
        throw new Error("Sesión expirada");
      } else {
        setError(`Error al actualizar evento: ${err.response?.data?.message || err.message}`);
        throw err;
      }
    }
  };

  // ✅ NUEVA FUNCIÓN: Cambiar estado de un evento (bloquear/activar)
  const changeEventStatus = async (eventId, newStatus) => {
    if (!isAuthenticated()) {
      throw new Error("No está autenticado");
    }

    try {
      setError(null);
      
      console.log(`Cambiando estado del evento ${eventId} a ${newStatus} con headers:`, getAuthHeaders());
      
      const res = await axios.patch(
        `${API_URL}/events/${eventId}/status`, 
        { status: newStatus },
        { headers: getAuthHeaders() }
      );
      
      console.log("Estado del evento actualizado exitosamente:", res.data);
      
      // Actualizar el evento en el estado local
      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, status: { ...e.status, nameState: newStatus } } : e))
      );
      
      return res.data;
      
    } catch (err) {
      console.error(`Error cambiando estado del evento ${eventId}:`, err);
      
      if (handleAuthError(err)) {
        throw new Error("Sesión expirada");
      } else {
        setError(`Error al cambiar estado del evento: ${err.response?.data?.message || err.message}`);
        throw err;
      }
    }
  };

  // ✅ Eliminar un evento
  const deleteEvent = async (id) => {
    if (!isAuthenticated()) {
      throw new Error("No está autenticado");
    }

    try {
      setError(null);
      
      console.log(`Eliminando evento ${id} con headers:`, getAuthHeaders());
      
      await axios.delete(`${API_URL}/events/${id}`, {
        headers: getAuthHeaders()
      });
      
      console.log("Evento eliminado exitosamente");
      setEvents((prev) => prev.filter((e) => e.id !== id));
      
    } catch (err) {
      console.error("Error eliminando evento:", err);
      
      if (handleAuthError(err)) {
        throw new Error("Sesión expirada");
      } else {
        setError(`Error al eliminar evento: ${err.response?.data?.message || err.message}`);
        throw err;
      }
    }
  };

  // ✅ Crear un nuevo usuario
  const createUser = async (newUser) => {
    if (!isAuthenticated()) {
      throw new Error("No está autenticado");
    }

    try {
      setError(null);
      
      console.log("Creando usuario con headers:", getAuthHeaders());
      
      const res = await axios.post(`${API_URL}/users`, newUser, {
        headers: getAuthHeaders()
      });
      
      console.log("Usuario creado exitosamente:", res.data);
      setUsers((prev) => [...prev, res.data]);
      return res.data;
      
    } catch (err) {
      console.error("Error creando usuario:", err);
      
      if (handleAuthError(err)) {
        throw new Error("Sesión expirada");
      } else {
        setError(`Error al crear usuario: ${err.response?.data?.message || err.message}`);
        throw err;
      }
    }
  };

  // ✅ Actualizar un usuario (para bloquear/desbloquear, editar datos, etc.)
  const updateUser = async (updatedUser) => {
    if (!isAuthenticated()) {
      throw new Error("No está autenticado");
    }

    try {
      setError(null);
      
      console.log(`Actualizando usuario ${updatedUser.id} con headers:`, getAuthHeaders());
      
      const res = await axios.put(`${API_URL}/users/${updatedUser.id}`, updatedUser, {
        headers: getAuthHeaders()
      });
      
      console.log("Usuario actualizado exitosamente:", res.data);
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? res.data : u))
      );
      return res.data;
      
    } catch (err) {
      console.error("Error actualizando usuario:", err);
      
      if (handleAuthError(err)) {
        throw new Error("Sesión expirada");
      } else {
        setError(`Error al actualizar usuario: ${err.response?.data?.message || err.message}`);
        throw err;
      }
    }
  };

  // ✅ Eliminar un usuario
  const deleteUser = async (id) => {
    if (!isAuthenticated()) {
      throw new Error("No está autenticado");
    }

    try {
      setError(null);
      
      console.log(`Eliminando usuario ${id} con headers:`, getAuthHeaders());
      
      await axios.delete(`${API_URL}/users/${id}`, {
        headers: getAuthHeaders()
      });
      
      console.log("Usuario eliminado exitosamente");
      setUsers((prev) => prev.filter((u) => u.id !== id));
      
    } catch (err) {
      console.error("Error eliminando usuario:", err);
      
      if (handleAuthError(err)) {
        throw new Error("Sesión expirada");
      } else {
        setError(`Error al eliminar usuario: ${err.response?.data?.message || err.message}`);
        throw err;
      }
    }
  };

  // ✅ Función para limpiar errores
  const clearError = () => {
    setError(null);
  };

  // ✅ Función para refrescar datos manualmente
  const refreshData = async () => {
    if (isAuthenticated()) {
      await Promise.all([fetchUsers(), fetchEvents()]);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        // Estados
        users,
        events,
        loading,
        error,
        
        // Funciones de usuarios
        fetchUsers,
        createUser,
        updateUser,
        deleteUser,
        
        // Funciones de eventos
        fetchEvents,
        fetchEventById,
        createEvent,
        updateEvent,
        changeEventStatus, // Nueva función para cambiar estado
        deleteEvent,
        
        // Utilidades
        clearError,
        refreshData,
        isAuthenticated,
        setEvents, // Mantener por compatibilidad
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
