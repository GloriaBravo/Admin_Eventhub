// src/components/NotificationModal.jsx
import React, { useEffect, useState } from "react";
import "../styles/NotificationModal.css";

const NotificationModal = ({ show, text, type = "info", duration = 3000, onClose }) => {
  const [animationState, setAnimationState] = useState("entering");
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setAnimationState("entering");
      
      // Efecto adicional según el tipo de notificación
      setTimeout(() => {
        if (type === "success") {
          setAnimationState("pulse");
        } else if (type === "error") {
          setAnimationState("shake");
        }
      }, 500);
    } else {
      if (visible) {
        setAnimationState("exiting");
        const timer = setTimeout(() => {
          setVisible(false);
        }, 500); // Duración de la animación de salida
        return () => clearTimeout(timer);
      }
    }
  }, [show, type]);

  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        if (onClose) {
          setAnimationState("exiting");
          setTimeout(() => {
            onClose();
          }, 500); // Esperar a que termine la animación de salida
        }
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!visible && !show) return null;

  const getTypeClass = () => {
    switch (type) {
      case "success":
        return "modal-success";
      case "error":
        return "modal-error";
      case "warning":
        return "modal-warning";
      default:
        return "modal-info";
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      default:
        return "ℹ";
    }
  };

  return (
    <div className="modal-overlay">
      <div className={`modal-notification ${getTypeClass()} ${animationState}`}>
        <div className="notification-content">
          <div className="notification-icon">{getTypeIcon()}</div>
          <p>{text}</p>
        </div>
        {onClose && (
          <button className="close-button" onClick={() => {
            setAnimationState("exiting");
            setTimeout(() => {
              onClose();
            }, 500);
          }}>
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
