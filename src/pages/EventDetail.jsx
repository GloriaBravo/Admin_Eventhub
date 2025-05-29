import React, { useEffect, useState } from "react";

const EventDetail = ({ eventId }) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`https://tu-api.com/events/${eventId}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) return <p>Cargando evento...</p>;

  return (
    <div className="event-detail">
      <h1>{event.title}</h1>
      <p>{event.description}</p>

      <section>
        <strong>Tipo:</strong> {event.type} | <strong>Privacidad:</strong> {event.privacy}
      </section>

      <section>
        <strong>Ubicación:</strong> {event.location.address} ({event.location.type})<br />
        <strong>Fechas:</strong> {new Date(event.start).toLocaleString()} - {new Date(event.end).toLocaleString()}
      </section>

      <section>
        <strong>Entradas:</strong> {event.ticketType === "free" ? "Gratis" : `$${event.price}`}<br />
        <strong>Categorías:</strong> {event.categories.join(", ")}<br />
        <strong>Aforo máximo:</strong> {event.maxAttendees}
      </section>

      <section>
        <h3>Imágenes principales</h3>
        {event.mainImages.map((img, idx) => (
          <img key={idx} src={img.url} alt={img.description} width={300} />
        ))}
      </section>

      <section>
        <h3>Galería</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {event.galleryImages.map((img, idx) => (
            <img key={idx} src={img.url} alt={img.description} width={150} />
          ))}
        </div>
      </section>

      <section>
        <h3>Organizador</h3>
        <p><strong>Nombre:</strong> {event.otherData.organizer}</p>
        <p><strong>Contacto:</strong> {event.otherData.contact}</p>
        <p><strong>Notas:</strong> {event.otherData.notes}</p>
      </section>
    </div>
  );
};

export default EventDetail;
