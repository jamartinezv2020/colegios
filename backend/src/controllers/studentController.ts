import { Request, Response } from 'express';
import Student from '../models/Student';
import { classifyLearningStyle } from '../utils/learningStyleClassifier';





// @desc    Get all students
// @route   GET /api/students
// @access  Public
export const getStudents = async (req: Request, res: Response): Promise<Response> => {
  try {
    const students = await Student.find();
    return res.status(200).json(students);
  } catch (error: any) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Public
export const getStudentById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    } else {
      return res.status(200).json(student);
    }
  } catch (error: any) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new student
// @route   POST /api/students
// @access  Public
export const createStudent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, learningStyle } = req.body;

    const newStudent = new Student({
      name,
      email,
      learningStyle,
    });

    const student = await newStudent.save();
    return res.status(201).json(student);
  } catch (error: any) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update student by ID
// @route   PUT /api/students/:id
// @access  Public
export const updateStudent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, learningStyle } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, learningStyle },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    } else {
      return res.status(200).json(student);
    }
  } catch (error: any) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete student by ID
// @route   DELETE /api/students/:id
// @access  Public
export const deleteStudent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    } else {
      return res.status(200).json({ message: 'Student removed' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update learning style
// @route   PUT /api/students/updateLearningStyle
// @access  Public
export const updateLearningStyle = async (req: Request, res: Response): Promise<Response> => {
  const { responses, studentId } = req.body;

  try {
    // Validar el formato de respuestas
    if (!Array.isArray(responses) || responses.length !== 44) {
      return res.status(400).send('Invalid number of responses. Expected 44.');
    }

    // Clasificar el estilo de aprendizaje
    const learningStyle = classifyLearningStyle(responses);

    // Buscar al estudiante por ID y actualizar su estilo de aprendizaje
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send('Student not found.');
    }

    // Actualizar el estilo de aprendizaje
    student.learningStyle = learningStyle;
    await student.save();

    return res.send('Learning style updated successfully.');
  } catch (error: any) {
    console.error('Error updating learning style:', error);
    return res.status(500).send('Internal Server Error');
  }
};


