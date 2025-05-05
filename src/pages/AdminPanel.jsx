import React, { useState } from "react";
import EventTable from "../components/EventTable";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
  // ✅ Estado para manejar el filtro de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <h2>Panel de Administración de Eventos</h2>

      {/* ✅ Campo de búsqueda de eventos por título */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Buscar evento por nombre, tipo, estado..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "100%", maxWidth: "400px" }}
        />
      </div>

      {/* ✅ Tabla de eventos con filtro aplicado */}
      <EventTable searchTerm={searchTerm} />
    </div>
  );
};

export default AdminPanel;


