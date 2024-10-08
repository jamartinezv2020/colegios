// KuderQuestionnaire.tsx
import React, { useState } from 'react';
import {
  Container, Box, Typography, Card, CardContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button,
  Accordion, AccordionSummary, AccordionDetails, LinearProgress, Grid, Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { questions } from './questionsKuder4';
import { KuderResponse, KuderClassifier } from './kuderClassifier';

const QUESTIONS_PER_PAGE = 5;

const KuderQuestionnaire: React.FC = () => {
  const [responses, setResponses] = useState<KuderResponse[]>(Array(questions.length).fill({ questionIndex: 0, selectedOptionIndex: -1 }));
  const [result, setResult] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleOptionChange = (questionIndex: number, selectedOptionIndex: number) => {
    const updatedResponses = [...responses];
    updatedResponses[questionIndex] = { questionIndex, selectedOptionIndex };
    setResponses(updatedResponses);
  };

  const handleSubmit = () => {
    if (responses.some((r) => r.selectedOptionIndex === -1)) {
      setError('Por favor responde todas las preguntas antes de enviar.');
      return;
    }

    const classifier = new KuderClassifier(responses);
    const vocationalOrientation = classifier.classify();
    setResult(vocationalOrientation);
    setError(null);
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
    return questions.slice(start, end).map((q, index) => (
      <Card key={index} sx={{ marginBottom: 2 }}>
        <CardContent sx={{ textAlign: 'left' }}>
          <Typography variant="body1">{`${start + index + 1}. ${q.question}`}</Typography>
          {q.helpText && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body2">Ayuda</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {q.helpText}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend" sx={{ textAlign: 'left' }}>Selecciona una opción:</FormLabel>
            <RadioGroup
              aria-label={`question-${start + index}`}
              name={`question-${start + index}`}
              value={responses[start + index]?.selectedOptionIndex}
              onChange={(e) => handleOptionChange(start + index, parseInt(e.target.value))}
              sx={{ textAlign: 'left' }}
            >
              {q.options.map((option, idx) => (
                <FormControlLabel
                  key={idx}
                  value={idx}
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
      {result ? (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Orientación Vocacional
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Tu orientación vocacional según el modelo de Kuder es:
          </Typography>
          <Typography variant="body1">
            {result}
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setResult(null)} sx={{ mt: 2 }}>
            Volver al Cuestionario
          </Button>
        </Box>
      ) : (
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} sx={{ mt: 4, textAlign: 'left' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'left' }}>
            Cuestionario de Kuder
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Instrucciones para completar el cuestionario</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box component="div" sx={{ textAlign: 'left' }}>
                <Typography>
                  Este cuestionario está diseñado para ayudar a identificar tu orientación vocacional según el modelo de Kuder.
                </Typography>
                <ul>
                  <li>Para cada pregunta, selecciona la opción que mejor describa tu preferencia.</li>
                  <li>Las preguntas están distribuidas en varias páginas, puedes avanzar y retroceder usando los botones correspondientes.</li>
                  <li>Tu progreso se mostrará en una barra de progreso en la parte superior del cuestionario.</li>
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

export default KuderQuestionnaire;
