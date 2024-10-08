// src/pages/admin/UserManagementPage.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../../models/User';
import UserList from '../../components/UserList';
import {
  Container,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Pagination,
  IconButton,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(5);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado');
      }
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sortedUsers = response.data.sort(
        (a: User, b: User) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setUsers(sortedUsers);
      setError(null);
    } catch (error: any) {
      setError('Error al obtener usuarios: ' + (error.message || error));
      toast.error('Error al obtener usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado');
      }
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
      toast.success('Usuario eliminado con éxito');
    } catch (error: any) {
      toast.error('Error al eliminar usuario: ' + error.message);
    }
  };

  const handleUpdateUser = async (user: User) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado');
      }
      await axios.put(`http://localhost:5000/api/users/${user._id}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === user._id ? user : u))
      );
      toast.success('Usuario actualizado con éxito');
      handleCloseDialog();
    } catch (error: any) {
      toast.error('Error al actualizar usuario: ' + error.message);
    }
  };

  const handleOpenDialog = (user?: User | null) => {
    setSelectedUser(user || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleSaveChanges = () => {
    if (selectedUser) {
      handleUpdateUser(selectedUser);
    }
  };

  const paginatedUsers = users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <Container maxWidth="lg" style={{ marginTop: 20 }}>
      <Typography variant="h3" gutterBottom>
        Administración de Usuarios
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <UserList
            users={paginatedUsers}
            onDelete={handleDeleteUser}
            onEdit={handleOpenDialog}
            onView={handleOpenDialog}
            renderIcons={(user) => (
              <>
                <IconButton color="primary" onClick={() => handleOpenDialog(user)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDeleteUser(user._id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleOpenDialog(user)}>
                  <VisibilityIcon />
                </IconButton>
              </>
            )}
          />
          <Pagination
            count={Math.ceil(users.length / usersPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{ mt: 2 }}
          />
        </>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedUser ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <TextField
                margin="dense"
                label="Nombre de Usuario"
                type="text"
                fullWidth
                value={selectedUser.username}
                onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveChanges} color="secondary">
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Container>
  );
};

export default UserManagementPage;




