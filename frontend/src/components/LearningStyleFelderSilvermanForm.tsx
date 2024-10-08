// src/components/LearningStyleFelderSilvermanForm.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { classifyLearningStyleFelderSilverman } from '../utils/learningStyleClassifierFelderSilveraman';
import {
  Box, Button, Container, Typography, Alert, Grid, LinearProgress, FormControl, FormLabel,
  RadioGroup, FormControlLabel, Radio, Card, CardContent, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { questions } from '../components/Data/questions';

const QUESTIONS_PER_PAGE = 5;

interface StudentData {
  name: string;
  id: string;
  email: string;
  // Agrega otros campos según tus necesidades
}

const LearningStyleFelderSilvermanForm: React.FC = () => {
  const [responses, setResponses] = useState<number[]>(Array(questions.length).fill(0));
  const [learningStyle, setLearningStyle] = useState<string[]>([]);
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
      const calculatedLearningStyle = classifyLearningStyleFelderSilverman(responses);
      setLearningStyle(calculatedLearningStyle);
      setShowResult(true);

      if (!studentData || !studentData.id) {
        setError('Faltan datos del estudiante');
        return;
      }

      await axios.put('http://localhost:5000/api/students/updateLearningStyle', {
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
          {question.helpText && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body2">Ayuda</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {question.helpText}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
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
            Resultado del Estilo de Aprendizaje
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
            Tu estilo de aprendizaje según el modelo de Felder-Silverman es:
          </Typography>
          <Typography variant="body1">
            {learningStyle.join(', ')}
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setShowResult(false)} sx={{ mt: 2 }}>
            Volver al Cuestionario
          </Button>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, textAlign: 'left' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'left' }}>
            Inventario de Estilos de Aprendizaje: Felder - Silverman
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Instrucciones para completar el formulario</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box component="div" sx={{ textAlign: 'left' }}>
                <Typography>
                  Este formulario está diseñado para identificar su estilo de aprendizaje según el modelo de Felder-Silverman.
                </Typography>
                <ul>
                  <li>Para cada pregunta, seleccione la opción que mejor describa su preferencia.</li>
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

export default LearningStyleFelderSilvermanForm;




