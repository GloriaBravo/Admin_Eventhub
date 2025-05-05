import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Legend
} from "recharts";

// Paleta de colores para las gráficas
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00C49F"];

const DashboardAdmin = () => {
  const { users, events } = useContext(AdminContext);

  // ✅ 1. Usuarios por rol (para gráfico de torta)
  const rolesCount = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});
  const usersByRole = Object.entries(rolesCount).map(([role, count]) => ({
    name: role,
    value: count
  }));

  // ✅ 2. Eventos por usuario (top 3 para gráfico de barras)
  const eventsByUser = users
    .map((user) => {
      const userEvents = events.filter((e) => e.ownerId === user.id);
      return { name: user.name, events: userEvents.length };
    })
    .sort((a, b) => b.events - a.events)
    .slice(0, 3);

  // ✅ 3. Historial de eventos por tipo (para gráfico de barras)
  const eventTypesCount = events.reduce((acc, event) => {
    const type = event.type || "Otro"; // usa "Otro" si no hay tipo definido
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  const eventsByType = Object.entries(eventTypesCount).map(([type, count]) => ({
    name: type,
    cantidad: count
  }));

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard del Administrador</h2>

      <div style={{ marginTop: "20px", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {/* Gráfico de torta - usuarios por rol */}
        <div>
          <h4>Usuarios por rol</h4>
          <PieChart width={300} height={250}>
            <Pie
              data={usersByRole}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {usersByRole.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Gráfico de barras - Top 3 usuarios con más eventos */}
        <div>
          <h4>Top 3 usuarios con más eventos</h4>
          <BarChart width={400} height={250} data={eventsByUser}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="events" fill="#8884d8" name="Eventos" />
          </BarChart>
        </div>

        {/* NUEVO: Gráfico de barras - Actividad por tipo de evento */}
        <div>
          <h4>Historial de eventos por tipo</h4>
          <BarChart width={500} height={250} data={eventsByType}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad" fill="#00C49F" name="Eventos" />
          </BarChart>
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h4>Resumen general</h4>
        <p><strong>Total de usuarios:</strong> {users.length}</p>
        <p><strong>Total de eventos:</strong> {events.length}</p>
      </div>
    </div>
  );
};

export default DashboardAdmin;
