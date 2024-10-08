import React from 'react';
import { Student } from '../models/Student'; // Asegúrate de importar la interfaz Student desde la ubicación correcta
import { Box, Typography, Button, Divider } from '@mui/material';

interface StudentListProps {
  students: Student[];
  onDelete: (studentId: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onDelete }) => {
  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        Lista de Estudiantes
      </Typography>
      {students.map((student) => (
        <Box key={student._id} mb={2} p={2} bgcolor="background.paper" boxShadow={2}>
          <Typography variant="h5">{student.name}</Typography>
          <Typography variant="body1" color="text.secondary">
            Email: {student.email}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Estilo de Aprendizaje: {student.learningStyle.join(', ')}
          </Typography>
          <Button variant="contained" color="error" onClick={() => onDelete(student._id)}>
            Eliminar
          </Button>
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default StudentList;

