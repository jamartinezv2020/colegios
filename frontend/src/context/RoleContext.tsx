// src/context/RoleContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { IRole } from '../models/Role';
import { getRoles, createRole, updateRole, deleteRole } from '../services/roleService';

// Definir el tipo para el contexto de roles
interface RoleContextProps {
  roles: IRole[];
  addRole: (role: IRole) => Promise<void>;
  updateRole: (id: string, role: IRole) => Promise<void>;
  removeRole: (id: string) => Promise<void>;
}

// Crear el contexto de roles
const RoleContext = createContext<RoleContextProps | undefined>(undefined);

// Especificar el tipo de las propiedades del RoleProvider
export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roles, setRoles] = useState<IRole[]>([]);

  // Cargar los roles al inicializar el componente
  useEffect(() => {
    const fetchRoles = async () => {
      const roles = await getRoles();
      setRoles(roles);
    };
    fetchRoles();
  }, []);

  // Añadir un nuevo rol
  const addRole = async (role: IRole) => {
    const newRole = await createRole(role);
    setRoles([...roles, newRole]);
  };

  // Actualizar un rol existente
  const updateRoleHandler = async (id: string, updatedRole: IRole) => {
    const updated = await updateRole(id, updatedRole);
    setRoles(roles.map(role => (role._id === id ? updated : role)));
  };

  // Eliminar un rol
  const removeRole = async (id: string) => {
    await deleteRole(id);
    setRoles(roles.filter(role => role._id !== id));
  };

  return (
    <RoleContext.Provider value={{ roles, addRole, updateRole: updateRoleHandler, removeRole }}>
      {children}
    </RoleContext.Provider>
  );
};

// Hook para usar el contexto de roles
export const useRoles = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRoles debe ser usado dentro de RoleProvider');
  }
  return context;
};
