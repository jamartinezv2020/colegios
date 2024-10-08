// src/routes/students.ts
import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import Student from '../models/Student';
import { Router } from 'express';
import { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } from '../controllers/studentController';
import { updateStudentLearningStyle } from '../controllers/studentControllerFelderSilverman';


const router = Router();

// Ruta para actualizar el estilo de aprendizaje
router.put('/updateStudentLearningStyle', updateStudentLearningStyle);


router.put('/updateLearningStyle', async (req: Request, res: Response) => {
  const { studentId, learningStyle } = req.body;

  if (!studentId || !learningStyle) {
    return res.status(400).send({ message: "Student ID and learning style are required" });
  }

  if (!Types.ObjectId.isValid(studentId)) {
    return res.status(400).send({ message: "Invalid student ID" });
  }

  try {
    const student = await Student.findByIdAndUpdate(studentId, { learningStyle }, { new: true });
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.send(student);
  } catch (error: any) {
    res.status(500).send({ message: "Server Error", error: error.message });
  }
});


// Rutas CRUD para los estudiantes
router.get('/', getStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;














