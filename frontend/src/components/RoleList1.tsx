import React from 'react';
import { IRole } from '../models/Role';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface RoleListProps {
  roles: IRole[];
  onEdit: (role: IRole) => void;
  onDelete: (roleId: string) => void; // Si deseas implementar la eliminación
}

const RoleList: React.FC<RoleListProps> = ({ roles, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role._id}>
              <TableCell>{role.nombreRol}</TableCell>
              <TableCell>{role.estadoRol}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onEdit(role)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(role._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoleList;
