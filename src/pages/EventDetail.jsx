import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import "../styles/EventDetail.css";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, updateEvent } = useContext(AdminContext);

  const event = events.find((e) => e.id.toString() === id);
  const [status, setStatus] = useState(event?.status || "Draft");

  useEffect(() => {
    if (!event) navigate("/panel");
  }, [event, navigate]);

  const toggleBlock = () => {
    const newStatus = status === "Blocked" ? "Published" : "Blocked";
    setStatus(newStatus);
    updateEvent({ ...event, status: newStatus });
  };

  if (!event) return <p>Cargando evento...</p>;

  return (
    <div className="event-detail-container">
      <h2>Detalles del Evento</h2>

      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt="Evento"
          className="event-image"
        />
      )}

      <div className="event-info">
        <p><strong>Título:</strong> {event.title}</p>
        <p><strong>Fecha:</strong> {event.date}</p>
        <p><strong>Tipo:</strong> {event.type}</p>
        <p><strong>Estado:</strong> {status}</p>
        <p><strong>Descripción:</strong> {event.description || "Sin descripción"}</p>
      </div>

      {event.videoUrl && (
        <div className="video-container">
          <iframe
            src={event.videoUrl}
            title="Video del evento"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="registered-users">
        <h4>Usuarios registrados</h4>
        <ul>
          {event.users?.length > 0 ? (
            event.users.map((u, idx) => <li key={idx}>{u}</li>)
          ) : (
            <li>No hay usuarios inscritos</li>
          )}
        </ul>
      </div>

      <p><strong>Rating promedio:</strong> {event.rating}</p>

      <div className="event-actions">
        <button className="block-btn" onClick={toggleBlock}>
          {status === "Blocked" ? "🔓 Desbloquear" : "🔒 Bloquear"}
        </button>
        <button className="back-btn" onClick={() => navigate("/panel")}>⬅️ Volver</button>
      </div>
    </div>
  );
};

export default EventDetail;


