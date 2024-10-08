import { Router } from 'express';
import { getStudents, getStudentById, createStudent, updateStudent, deleteStudent, updateLearningStyle } from '../controllers/studentController';
import Student from '../models/Student'; // Asegúrate de tener un modelo Student en esta ruta
const router = Router();
// Ruta para obtener métricas de estudiantes
router.get('/metrics', async (req, res) => {
  try {
    // Lógica para obtener métricas de estudiantes
    const students = await Student.aggregate([
      {
        $group: {
          _id: "$category", // Agrupamos por categoría
          count: { $sum: 1 } // Contamos el número de estudiantes por categoría
        }
      }
    ]);

    const categories = students.map((student: { _id: string }) => student._id);
    const values = students.map((student: { count: number }) => student.count);

    res.json({ categories, values });
  } catch (error) {
    console.error('Error al obtener métricas de estudiantes', error);
    res.status(500).json({ message: 'Error al obtener métricas de estudiantes' });
  }
});
// Ruta para actualizar el estilo de aprendizaje
router.put('/updateLearningStyle', updateLearningStyle);

// Rutas CRUD para los estudiantes
router.get('/', getStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;
