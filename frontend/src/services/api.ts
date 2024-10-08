// src/services/api.ts
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getStudents = async () => {
  const response = await axios.get(`${API_URL}/students`);
  return response.data;
};

export const createStudent = async (studentData: any) => {
  const response = await axios.post(`${API_URL}/students`, studentData);
  return response.data;
};

export const deleteStudent = async (studentId: string) => {
  const response = await axios.delete(`${API_URL}/students/${studentId}`);
  return response.data;
};

export const classifyLearningStyle = async (responses: number[]) => {
  const response = await axios.post(`${API_URL}/classify`, { responses });
  return response.data;
};
// frontend/src/utils/api.ts

export const getUserEmail = async (): Promise<string> => {
  try {
    const response = await fetch('http://localhost:5000/api/user/email');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.email;
  } catch (error) {
    console.error('Failed to fetch user email', error);
    throw error;
  }
};
