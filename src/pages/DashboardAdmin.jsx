import React, { useContext, useRef, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  LineChart, Line,
  AreaChart, Area,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from "recharts";
import html2canvas from "html2canvas";
import "../styles/DashboardAdmin.css"; // ✅ estilos actualizados

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00C49F"];

const DashboardAdmin = () => {
  const { users, events } = useContext(AdminContext);
  const chartRef = useRef();
  const [activeChart, setActiveChart] = useState("pie");

  // Usuarios por rol
  const rolesCount = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});
  const usersByRole = Object.entries(rolesCount).map(([role, count]) => ({
    name: role,
    value: count
  }));

  // Eventos por usuario (top 3)
  const eventsByUser = users.map((user) => {
    const userEvents = events.filter((e) => e.ownerId === user.id);
    return { name: user.name, events: userEvents.length };
  }).sort((a, b) => b.events - a.events).slice(0, 3);

  // Eventos por tipo
  const eventTypesCount = events.reduce((acc, event) => {
    const type = event.type || "Otro";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  const eventsByType = Object.entries(eventTypesCount).map(([type, count]) => ({
    name: type,
    cantidad: count
  }));

  // Exportar como imagen
  const downloadChart = () => {
    html2canvas(chartRef.current).then(canvas => {
      const link = document.createElement("a");
      link.download = `${activeChart}-grafica.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  // Componente dinámico
  const renderChart = () => {
    switch (activeChart) {
      case "pie":
        return (
          <PieChart width={400} height={300}>
            <Pie data={usersByRole} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label isAnimationActive>
              {usersByRole.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      case "bar":
        return (
          <BarChart width={500} height={300} data={eventsByUser} isAnimationActive>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="events" fill="#82ca9d" />
          </BarChart>
        );
      case "bar2":
        return (
          <BarChart width={500} height={300} data={eventsByType} isAnimationActive>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad" fill="#8884d8" />
          </BarChart>
        );
      case "line":
        return (
          <LineChart width={500} height={300} data={eventsByUser}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="events" stroke="#ff7f50" strokeWidth={2} />
          </LineChart>
        );
      case "area":
        return (
          <AreaChart width={500} height={300} data={eventsByUser}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="events" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Dashboard del Administrador</h2>

      <div className="chart-controls">
        <button onClick={() => setActiveChart("pie")}>🥧</button>
        <button onClick={() => setActiveChart("bar")}>📊</button>
        <button onClick={() => setActiveChart("bar2")}>📈</button>
        <button onClick={() => setActiveChart("line")}>📉</button>
        <button onClick={() => setActiveChart("area")}>🗺️ Area</button>
      </div>

      <div className="chart-wrapper">
        <div className="chart-display" ref={chartRef}>
          {renderChart()}
        </div>

        <div className="data-list">
          <h4>Eventos creados</h4>
          <ul>
            {events.map((e, i) => {
              const user = users.find(u => u.id === e.ownerId);
              return (
                <li key={i}>
                  <strong>{user?.name || "Desconocido"}</strong> — <em>{e.type}</em> — {new Date(e.date).toLocaleDateString()}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <button className="download-btn" onClick={downloadChart}>📥 Descargar gráfica</button>

      <div className="resumen-general">
        <h4>Resumen general</h4>
        <p><strong>Total de usuarios:</strong> {users.length}</p>
        <p><strong>Total de eventos:</strong> {events.length}</p>
      </div>
    </div>
  );
};

export default DashboardAdmin;
