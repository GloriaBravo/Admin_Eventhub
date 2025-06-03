// src/context/NotificationContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
import NotificationModal from "../components/NotificationModal";

// Definición de tiempos de duración por tipo de notificación
const DEFAULT_DURATIONS = {
  success: 3000,
  error: 5000,
  warning: 4000,
  info: 3000,
};

// Definición de tiempos por flujo específico
const FLOW_DURATIONS = {
  login: {
    success: 2000,
    error: 4000,
  },
  crud: {
    success: 2500,
    error: 4500,
  },
  form: {
    success: 2000,
    error: 5000,
    warning: 3500,
  },
};

// Creación del contexto
export const NotificationContext = createContext();

// Hook personalizado para usar el contexto
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification debe ser usado dentro de NotificationProvider");
  }
  return context;
};

// Proveedor del contexto
export const NotificationProvider = ({ children }) => {
  // Estado para las notificaciones
  const [notification, setNotification] = useState({
    show: false,
    text: "",
    type: "info",
    duration: DEFAULT_DURATIONS.info,
    flow: null,
  });

  // Función para cerrar la notificación
  const closeNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, show: false }));
  }, []);

  // Función para mostrar una notificación
  const showNotification = useCallback(
    ({ text, type = "info", flow = null, duration = null }) => {
      // Determinar la duración basada en el tipo, flujo o duración personalizada
      let finalDuration;
      
      if (duration) {
        // Si se proporciona una duración específica, usarla
        finalDuration = duration;
      } else if (flow && FLOW_DURATIONS[flow] && FLOW_DURATIONS[flow][type]) {
        // Si hay una duración específica para este flujo y tipo, usarla
        finalDuration = FLOW_DURATIONS[flow][type];
      } else {
        // De lo contrario, usar la duración predeterminada para este tipo
        finalDuration = DEFAULT_DURATIONS[type] || DEFAULT_DURATIONS.info;
      }

      setNotification({
        show: true,
        text,
        type,
        duration: finalDuration,
        flow,
      });
    },
    []
  );

  // Funciones de conveniencia para diferentes tipos de notificaciones
  const showSuccess = useCallback(
    (text, options = {}) => {
      showNotification({ text, type: "success", ...options });
    },
    [showNotification]
  );

  const showError = useCallback(
    (text, options = {}) => {
      showNotification({ text, type: "error", ...options });
    },
    [showNotification]
  );

  const showWarning = useCallback(
    (text, options = {}) => {
      showNotification({ text, type: "warning", ...options });
    },
    [showNotification]
  );

  const showInfo = useCallback(
    (text, options = {}) => {
      showNotification({ text, type: "info", ...options });
    },
    [showNotification]
  );

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
        closeNotification,
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}
      <NotificationModal
        show={notification.show}
        text={notification.text}
        type={notification.type}
        duration={notification.duration}
        onClose={closeNotification}
      />
    </NotificationContext.Provider>
  );
};
