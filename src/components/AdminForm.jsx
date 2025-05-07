import React from "react";

const AdminForm = ({ formData, onChange, onSubmit }) => {
  return (
    <div className="admin-form-card">
      <h2>Registrar Administrador</h2>
      <form onSubmit={onSubmit} className="admin-form">
        <div className="form-row">
          <input name="name" value={formData.name} onChange={onChange} placeholder="Nombre completo" required />
          <input name="id" value={formData.id} onChange={onChange} placeholder="Identificación" required />
        </div>
        <div className="form-row">
          <input name="address" value={formData.address} onChange={onChange} placeholder="Dirección" required />
          <input type="date" name="birthdate" value={formData.birthdate} onChange={onChange} required />
        </div>
        <div className="form-row">
          <input name="phone" value={formData.phone} onChange={onChange} placeholder="Teléfono" required />
          <input type="email" name="email" value={formData.email} onChange={onChange} placeholder="Email" required />
        </div>
        <div className="form-row">
          <input type="password" name="password" value={formData.password} onChange={onChange} placeholder="Contraseña" required />
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={onChange} placeholder="Confirmar contraseña" required />
        </div>
        <div className="form-row">
          <select name="role" value={formData.role} onChange={onChange} required>
            <option value="Administrador">Administrador</option>
            <option value="Subadministrador">Subadministrador</option>
          </select>
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default AdminForm;

