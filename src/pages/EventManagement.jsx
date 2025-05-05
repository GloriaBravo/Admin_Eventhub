import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";

const EventManagement = () => {
  const { events, users, addEvent, updateEvent, deleteEvent } = useContext(AdminContext);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    ownerId: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.ownerId) return alert("Todos los campos son obligatorios.");

    const event = {
      ...formData,
      ownerId: parseInt(formData.ownerId),
    };

    if (editingEvent) {
      updateEvent({ ...event, id: editingEvent.id });
      setEditingEvent(null);
    } else {
      addEvent(event);
    }

    setFormData({ title: "", ownerId: "" });
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({ title: event.title, ownerId: event.ownerId.toString() });
  };

  const handleDelete = (id) => {
    deleteEvent(id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Eventos</h2>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px", display: "flex", gap: "1rem" }}>
        <input
          type="text"
          name="title"
          placeholder="Título del evento"
          value={formData.title}
          onChange={handleChange}
        />
        <select name="ownerId" value={formData.ownerId} onChange={handleChange}>
          <option value="">Asignar a usuario</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.role})
            </option>
          ))}
        </select>
        <button type="submit">{editingEvent ? "Actualizar" : "Agregar"}</button>
      </form>

      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc" }}>Título</th>
            <th style={{ borderBottom: "1px solid #ccc" }}>Responsable</th>
            <th style={{ borderBottom: "1px solid #ccc" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            const owner = users.find((u) => u.id === event.ownerId);
            return (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{owner ? owner.name : "Usuario eliminado"}</td>
                <td>
                  <button onClick={() => handleEdit(event)}>Editar</button>
                  <button onClick={() => handleDelete(event.id)} style={{ marginLeft: "10px" }}>Eliminar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EventManagement;
