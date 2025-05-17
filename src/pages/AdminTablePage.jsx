import React from "react";
import AdminList from "../components/AdminList";
import { useNavigate } from "react-router-dom";

const AdminTablePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "24px" }}>
      <h2>Administradores Registrados</h2>
      <AdminList />
      <button onClick={() => navigate("/admin/registrar")} style={{ marginTop: "16px" }}>
        ← Volver a Registrar Administrador
      </button>
    </div>
  );
};

export default AdminTablePage;
// Este componente es la página que muestra la lista de administradores registrados. Al hacer clic en el botón, se redirige a la página de registro de administradores. 