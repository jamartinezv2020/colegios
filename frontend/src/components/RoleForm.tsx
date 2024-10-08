// src/components/RoleForm.tsx

import React, { useState } from 'react';
import { IRole } from '../models/Role';
import { useRoles } from '../context/RoleContext';

const RoleForm: React.FC<{ role?: IRole }> = ({ role }) => {
  const [nombreRol, setNombreRol] = useState(role?.nombreRol || '');
  const [estadoRol, setEstadoRol] = useState(role?.estadoRol || 1);
  const { addRole, updateRole } = useRoles();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRole = { _id: role?._id || '', nombreRol, estadoRol };
    if (role) {
      await updateRole(role._id, newRole);
    } else {
      await addRole(newRole);
    }
    setNombreRol('');
    setEstadoRol(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre del Rol:</label>
        <input
          type="text"
          value={nombreRol}
          onChange={e => setNombreRol(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Estado del Rol:</label>
        <select value={estadoRol} onChange={e => setEstadoRol(parseInt(e.target.value))}>
          <option value={1}>Activo</option>
          <option value={2}>Inactivo</option>
        </select>
      </div>
      <button type="submit">{role ? 'Actualizar Rol' : 'Crear Rol'}</button>
    </form>
  );
};

export default RoleForm;
