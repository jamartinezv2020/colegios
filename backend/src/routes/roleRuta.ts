// rutas/roleRuta.ts
import { Router } from 'express';
import { crearRole, obtenerRoles, actualizarRole, eliminarRole } from './../controllers/roleControlador';

const router = Router();

router.post('/roles', crearRole);
router.get('/roles/:id?', obtenerRoles);
router.put('/roles/:id', actualizarRole);
router.delete('/roles/:id', eliminarRole);

export default router;
