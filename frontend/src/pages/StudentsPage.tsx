import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Paper, CircularProgress } from '@mui/material';
import StudentList from '../components/StudentList';
import StudentForm from '../components/StudentForm';
import { Student } from '../models/Student';
import { getStudents, createStudent, deleteStudent } from '../services/studentService';

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsData = await getStudents();
        setStudents(studentsData);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddStudent = async (student: { name: string; email: string; learningStyle: string[] }) => {
    try {
      const newStudent = await createStudent(student);
      setStudents([...students, newStudent]);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    try {
      await deleteStudent(studentId);
      setStudents(students.filter(student => student._id !== studentId));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Gestión de Estudiantes
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Añadir Nuevo Estudiante
              </Typography>
              <StudentForm onSubmit={handleAddStudent} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Lista de Estudiantes
              </Typography>
              <StudentList students={students} onDelete={handleDeleteStudent} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default StudentsPage;







