import Student, { IStudent } from '../models/studentModel';

// Obtener todos los estudiantes
export const getAllStudents = async (): Promise<IStudent[]> => {
  try {
    const students = await Student.find();
    return students;
  } catch (error) {
    throw new Error(`Error fetching students: ${error.message}`);
  }
};

// Obtener un estudiante por ID
export const getStudentById = async (id: string): Promise<IStudent | null> => {
  try {
    const student = await Student.findById(id);
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  } catch (error) {
    throw new Error(`Error fetching student: ${error.message}`);
  }
};

// Crear un nuevo estudiante
export const createStudent = async (studentData: Partial<IStudent>): Promise<IStudent> => {
  try {
    const newStudent = new Student(studentData);
    await newStudent.save();
    return newStudent;
  } catch (error) {
    throw new Error(`Error creating student: ${error.message}`);
  }
};

// Actualizar un estudiante por ID
export const updateStudent = async (id: string, studentData: Partial<IStudent>): Promise<IStudent | null> => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, studentData, { new: true });
    if (!updatedStudent) {
      throw new Error('Student not found');
    }
    return updatedStudent;
  } catch (error) {
    throw new Error(`Error updating student: ${error.message}`);
  }
};

// Eliminar un estudiante por ID
export const deleteStudent = async (id: string): Promise<IStudent | null> => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      throw new Error('Student not found');
    }
    return deletedStudent;
  } catch (error) {
    throw new Error(`Error deleting student: ${error.message}`);
  }
};

// Clasificar el estilo de aprendizaje de un estudiante
export const classifyLearningStyle = (responses: number[]): string[] => {
  if (responses.length !== 44) {
    throw new Error("Invalid number of responses. Expected 44.");
  }

  let active = 0, reflective = 0;
  let sensing = 0, intuitive = 0;
  let visual = 0, verbal = 0;
  let sequential = 0, global = 0;

  for (let i = 0; i < 44; i++) {
    const response = responses[i];

    switch (i % 4) {
      case 0: // Active/Reflective
        if (response === 1) active++;
        else reflective++;
        break;
      case 1: // Sensing/Intuitive
        if (response === 1) sensing++;
        else intuitive++;
        break;
      case 2: // Visual/Verbal
        if (response === 1) visual++;
        else verbal++;
        break;
      case 3: // Sequential/Global
        if (response === 1) sequential++;
        else global++;
        break;
      default:
        break;
    }
  }

  const learningStyle: string[] = [
    active >= reflective ? 'Active' : 'Reflective',
    sensing >= intuitive ? 'Sensing' : 'Intuitive',
    visual >= verbal ? 'Visual' : 'Verbal',
    sequential >= global ? 'Sequential' : 'Global',
  ];

  return learningStyle;
};
