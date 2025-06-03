// src/pages/DashboardAdmin.jsx
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../styles/DashboardAdmin.css";

const COLORS = ["#ff4d4f", "#faad14", "#1890ff", "#52c41a", "#722ed1"];

const DashboardAdmin = () => {
  const { events, loading, fetchEvents } = useContext(AdminContext);
  const [activeTab, setActiveTab] = useState("semanal"); // Ejemplo de filtro de tiempo

  useEffect(() => {
    fetchEvents(); // ✅ Traer los eventos desde la API real
  }, []);

  // ✅ Agrupa eventos por tipo (para el gráfico de pastel)
  const eventsByType = events.reduce((acc, event) => {
    const type = event.type || "Otro";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(eventsByType).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  // ✅ Contabiliza eventos por día de la semana (ejemplo: para el gráfico de línea)
  const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const eventsByDay = daysOfWeek.map((day) => ({
    name: day,
    eventos: Math.floor(Math.random() * 6), // Puedes reemplazarlo con datos reales si los tienes (por fecha)
  }));

  return (
    <div className="dashboard-container">
      <h2>Estadísticas</h2>

      {/* Tabs de tiempo */}
      <div className="tabs">
        <button className={activeTab === "semanal" ? "active" : ""} onClick={() => setActiveTab("semanal")}>Semanal</button>
        <button className={activeTab === "mensual" ? "active" : ""} onClick={() => setActiveTab("mensual")}>Mensual</button>
        <button className={activeTab === "anual" ? "active" : ""} onClick={() => setActiveTab("anual")}>Anual</button>
      </div>

      {/* Contenedor de las gráficas */}
      <div className="charts-container">
        <div className="chart-card">
          <h3>Eventos por Tipo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Eventos a lo Largo del Tiempo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={eventsByDay} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="eventos" stroke="#1890ff" strokeWidth={2} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Resumen general */}
      <div className="summary">
        <h4>Resumen General</h4>
        <p><strong>Total de eventos:</strong> {events.length}</p>
      </div>
    </div>
  );
};

export default DashboardAdmin;

