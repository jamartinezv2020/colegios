import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Pagination,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Grid,
} from '@mui/material';
import { IRole } from '../../models/Role';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const RoleManagementPage = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [selectedRole, setSelectedRole] = useState<IRole | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rolesPerPage] = useState<number>(5);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRoles();
  }, [currentPage]);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/roles');
      setRoles(response.data);
      setError(null);
    } catch (error: any) {
      setError('Error al obtener roles: ' + error.message);
      toast.error('Error al obtener roles');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (role?: IRole | null) => {
    setSelectedRole(role || { _id: '', nombreRol: '', estadoRol: 1 });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRole(null);
  };

  const handleSaveRole = async () => {
    if (selectedRole) {
      try {
        if (selectedRole._id) {
          const response = await axios.put(`http://localhost:5000/api/roles/${selectedRole._id}`, selectedRole);
          setRoles((prev) => prev.map((role) => (role._id === selectedRole._id ? response.data : role)));
          toast.success('Rol actualizado con éxito');
        } else {
          const newRole = { nombreRol: selectedRole.nombreRol, estadoRol: selectedRole.estadoRol };
          const response = await axios.post('http://localhost:5000/api/roles', newRole);
          setRoles((prev) => [...prev, response.data]);
          toast.success('Rol creado con éxito');
        }
      } catch (error: any) {
        toast.error('Error al guardar rol: ' + error.message);
      }
    }
    handleCloseDialog();
  };

  const handleDeleteRole = async (roleId: string) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este rol?');
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/roles/${roleId}`);
      setRoles((prev) => prev.filter((role) => role._id !== roleId));
      toast.success('Rol eliminado con éxito');
    } catch (error: any) {
      toast.error('Error al eliminar rol: ' + error.message);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const paginatedRoles = roles.slice((currentPage - 1) * rolesPerPage, currentPage * rolesPerPage);

  return (
    <Container maxWidth="lg" style={{ marginTop: 20 }}>
      <Typography variant="h3" gutterBottom>
        Administración de Roles
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Button variant="contained" color="primary" onClick={() => handleOpenDialog(null)} sx={{ mb: 2 }}>
            Crear Rol
          </Button>
          <Grid container spacing={3}>
            {paginatedRoles.map((role) => (
              <Grid item xs={12} sm={6} md={4} key={role._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {role.nombreRol}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      Estado: {role.estadoRol === 1 ? 'Activo' : 'Inactivo'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton color="primary" onClick={() => handleOpenDialog(role)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteRole(role._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={Math.ceil(roles.length / rolesPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{ mt: 2 }}
          />
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{selectedRole && selectedRole._id ? 'Editar Rol' : 'Crear Rol'}</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Nombre"
                type="text"
                fullWidth
                value={selectedRole?.nombreRol || ''}
                onChange={(e) => setSelectedRole({ ...selectedRole!, nombreRol: e.target.value })}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel>Estado</InputLabel>
                <Select
                  value={selectedRole?.estadoRol || 1}
                  onChange={(e) => setSelectedRole({ ...selectedRole!, estadoRol: e.target.value as number })}
                >
                  <MenuItem value={1}>Activo</MenuItem>
                  <MenuItem value={2}>Inactivo</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleSaveRole} color="secondary">
                Guardar Cambios
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      <ToastContainer />
    </Container>
  );
};

export default RoleManagementPage;



