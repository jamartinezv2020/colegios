// src/components/RoleList.tsx

import React from 'react';
import { IRole } from '../models/Role';
import { List, ListItem, ListItemText } from '@mui/material';

interface RoleListProps {
  roles: IRole[];
  onEdit: (role: IRole) => void;
  onDelete: (roleId: string) => Promise<void>;
  renderIcons: (role: IRole) => React.ReactNode; // Asegúrate de que el tipo sea correcto
}

const RoleList: React.FC<RoleListProps> = ({ roles, onEdit, onDelete, renderIcons }) => {
  return (
    <List>
      {roles.map((role) => (
        <ListItem key={role._id}>
          <ListItemText primary={role.nombreRol} />
          {renderIcons(role)}
        </ListItem>
      ))}
    </List>
  );
};

export default RoleList;


