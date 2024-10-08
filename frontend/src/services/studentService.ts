// src/services/studentService.ts

import axios from '../api/axios';
import { Student } from '../models/Student';


// Función para actualizar el estilo de aprendizaje de un estudiante
export const updateLearningStyle = async (responses: number[]): Promise<void> => {
  try {
    const studentId = "ID_DEL_ESTUDIANTE"; // Reemplaza con el ID correcto o con una variable que lo contenga
    const response = await axios.put('http://localhost:5000/api/students/updateLearningStyle', { responses, studentId });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};


export const createStudent = async (student: { name: string; email: string; learningStyle: string[] }) => {
  const response = await axios.post('/api/students', student);
  return response.data as Student;
};

export const getStudents = async () => {
  const response = await axios.get('/students');
  return response.data;
};

export const getStudentById = async (id: string) => {
  const response = await axios.get(`/students/${id}`);
  return response.data;
};



export const updateStudent = async (id: string, student: { name: string; email: string; learningStyle?: string[] }) => {
  const response = await axios.put(`/students/${id}`, student);
  return response.data;
};

export const deleteStudent = async (id: string) => {
  const response = await axios.delete(`/students/${id}`);
  return response.data;
};

export const classifyLearningStyle = async (responses: number[]) => {
  const response = await axios.post('/students/classify', { responses });
  return response.data;
};
