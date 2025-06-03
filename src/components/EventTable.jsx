import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

const EventTable = () => {
  const { events, changeEventStatus } = useContext(AdminContext);

  const handleToggleStatus = (eventId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "CANCELLED" : "Active";
    changeEventStatus(eventId, newStatus);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id}>
            <td>{event.title}</td>
            <td>{event.status?.nameState}</td>
            <td>
              <button
                onClick={() =>
                  handleToggleStatus(event.id, event.status?.nameState)
                }
              >
                {event.status?.nameState === "CANCELLED" ? "Activar" : "Cancelar"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventTable;
