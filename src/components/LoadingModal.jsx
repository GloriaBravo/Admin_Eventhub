// src/components/LoadingModal.jsx
import React from "react";
import "../styles/LoadingModal.css";

const LoadingModal = () => (
  <div className="loading-modal">
    <div className="spinner"></div>
    <p>Cargando...</p>
  </div>
);

export default LoadingModal; // 👈 export default agregado
