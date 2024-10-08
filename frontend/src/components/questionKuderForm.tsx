import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Button, Container, Typography, Alert, Grid, LinearProgress, FormControl, FormLabel,
  RadioGroup, FormControlLabel, Radio, Card, CardContent, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { questions } from '../components/Data/questionsKuder'; // Importa las preguntas del test de Kuder desde un archivo separado
import { classifyKuder } from '../utils/calculatePreferences';

const QUESTIONS_PER_PAGE = 5; // Número de preguntas por página

interface StudentData {
  name: string;
  id: string;
  email: string;
  // Agrega otros campos según tus necesidades
}

const KuderForm: React.FC = () => {
  const [responses, setResponses] = useState<number[]>(Array(questions.length).fill(0));
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  useEffect(() => {
    const studentInfo = localStorage.getItem('studentData');
    if (studentInfo) {
      setStudentData(JSON.parse(studentInfo));
    }
  }, []);

  const handleChange = (index: number, value: number) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (responses.includes(0)) {
      setError('Por favor responde todas las preguntas antes de enviar.');
      return;
    }

    try {
      const calculatedResult = classifyKuder(responses); // Aquí se clasifica según las respuestas
      
      // Transforma el resultado a un array de strings para evitar el error de tipos
      const stringResults = calculatedResult.map(
        (result) => `${result.category}: ${result.score}`
      );

      setResult(stringResults); // Usa el array transformado
      setShowResult(true);

      if (!studentData || !studentData.id) {
        setError('Faltan datos del estudiante');
        return;
      }

      await axios.put('http://localhost:5000/api/students/updateKuderResult', {
        studentId: studentData.id,
        responses,
      });

      setError(null);
    } catch (error) {
      setError('Error al enviar el formulario');
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const renderQuestions = () => {
    const start = currentPage * QUESTIONS_PER_PAGE;
    const end = start + QUESTIONS_PER_PAGE;
    return questions.slice(start, end).map((question, index) => (
      <Card key={index} sx={{ marginBottom: 2 }}>
        <CardContent sx={{ textAlign: 'left' }}>
          <Typography variant="body1">{`${start + index + 1}. ${question.question}`}</Typography>
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend" sx={{ textAlign: 'left' }}>Selecciona una opción:</FormLabel>
            <RadioGroup
              aria-label={`question-${start + index}`}
              name={`question-${start + index}`}
              value={responses[start + index]}
              onChange={(e) => handleChange(start + index, parseInt(e.target.value))}
              sx={{ textAlign: 'left' }}
            >
              {question.options.map((option, idx) => (
                <FormControlLabel
                  key={idx}
                  value={idx + 1}
                  control={<Radio />}
                  label={`${String.fromCharCode(65 + idx)}. ${option}`}
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', textAlign: 'left' }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    ));
  };

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const progress = (currentPage + 1) / totalPages * 100;

  return (
    <Container maxWidth="md">
      {showResult ? (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Resultado del Test Vocacional
          </Typography>
          {studentData && (
            <Box sx={{ textAlign: 'left', mt: 2 }}>
              <Typography variant="h6">Datos del Alumno:</Typography>
              <Typography variant="body1">{`Nombre: ${studentData.name}`}</Typography>
              <Typography variant="body1">{`ID: ${studentData.id}`}</Typography>
              <Typography variant="body1">{`Email: ${studentData.email}`}</Typography>
              {/* Agrega otros campos según tus necesidades */}
            </Box>
          )}
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Tu perfil vocacional es:
          </Typography>
          <Typography variant="body1">
            {result.join(', ')}
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setShowResult(false)} sx={{ mt: 2 }}>
            Volver al Cuestionario
          </Button>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, textAlign: 'left' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'left' }}>
            Test Vocacional de Kuder
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Instrucciones para completar el formulario</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box component="div" sx={{ textAlign: 'left' }}>
                <Typography>
                  Este formulario está diseñado para identificar su perfil vocacional según el test de Kuder.
                </Typography>
                <ul>
                  <li>Para cada pregunta, seleccione la opción que mejor describa su interés.</li>
                  <li>Las preguntas están distribuidas en varias páginas, puede avanzar y retroceder usando los botones correspondientes.</li>
                  <li>Su progreso se mostrará en una barra de progreso en la parte superior del formulario.</li>
                </ul>
              </Box>
            </AccordionDetails>
          </Accordion>
          {error && <Alert severity="error">{error}</Alert>}
          {renderQuestions()}
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
              >
                Anterior
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
              >
                Siguiente
              </Button>
            </Grid>
          </Grid>
          {currentPage === totalPages - 1 && (
            <Box textAlign="center" mt={2}>
              <Button type="submit" variant="contained" color="primary">
                Enviar
              </Button>
            </Box>
          )}
          <Box mt={2}>
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="body2" color="textSecondary" align="center">
              {Math.round(progress)}% Completado
            </Typography>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default KuderForm;

